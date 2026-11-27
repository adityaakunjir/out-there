from PIL import Image, ImageFilter
import numpy as np
from pathlib import Path

src = Path(r"D:\GodReach\personal\out-there\Portfolio\assets\Out There Brand Identity Board.png")
out = Path(r"D:\GodReach\personal\out-there\Portfolio\dist\assets")
out.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGBA")
arr = np.array(im, dtype=np.float32)

# Helper: extract dark-ink + blue-dot artwork from warm-paper background (#F2F0E9) and recolor ink to #F2F0E9
def extract_from_paper(region_arr):
    # Paper background color sampled from top-left corner of board
    bg = np.array([242.0, 240.0, 233.0])
    rgb = region_arr[:, :, :3]
    diff = np.linalg.norm(rgb - bg, axis=2)

    # Anti-aliased alpha from background distance
    alpha = np.clip((diff - 10.0) / 55.0, 0.0, 1.0)

    # Detect electric blue dot (#354AF5 -> genuinely blue pixels only, never subpixel grey)
    blue_score = rgb[:, :, 2] - np.maximum(rgb[:, :, 0], rgb[:, :, 1])
    is_blue = np.where((rgb[:, :, 2] > 150.0) & (blue_score > 55.0), 1.0, 0.0)

    # Ink becomes warm paper #F2F0E9; blue dot becomes #354AF5
    out_rgb = np.zeros_like(rgb)
    ink_col = np.array([242.0, 240.0, 233.0])
    blue_col = np.array([53.0, 74.0, 245.0])
    for c in range(3):
        out_rgb[:, :, c] = ink_col[c] * (1.0 - is_blue) + blue_col[c] * is_blue

    res = np.dstack([out_rgb, alpha * 255.0]).clip(0, 255).astype(np.uint8)
    return Image.fromarray(res, mode="RGBA")

def upscale_4k(pil_img, target_w=3840):
    w, h = pil_img.size
    target_h = max(1, round(h * (target_w / w)))
    up = pil_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
    # Slightly tighten alpha edges after Lanczos so 4K edges look vector-sharp
    r, g, b, a = up.split()
    a = a.point(lambda p: 0 if p < 24 else (255 if p > 230 else int((p - 24) * 255 / 206)))
    return Image.merge("RGBA", (r, g, b, a))

# 1. Measure top-left lockup (x: 60..1150, y: 120..560)
top_left = arr[120:560, 60:1150]
bg = np.array([242.0, 240.0, 233.0])
fg = np.linalg.norm(top_left[:, :, :3] - bg, axis=2) > 22
ys, xs = np.where(fg)
x0, x1 = xs.min() + 60, xs.max() + 60 + 1
y0, y1 = ys.min() + 120, ys.max() + 120 + 1
print("Top-left full lockup:", x0, y0, x1, y1)

# Find horizontal gap between "out there." and "Not here to blend in."
row_has_fg = fg[ys.min():ys.max()+1, :].any(axis=1)
gap_rows = np.where(~row_has_fg)[0] + ys.min() + 120
# Pick middle of largest gap
splits = np.where(np.diff(gap_rows) > 1)[0]
split_y = int(np.median(gap_rows))
print("Split Y between wordmark and tagline:", split_y)

# Wordmark only (with small padding)
wm_crop = arr[max(0, y0-8):split_y-4, max(0, x0-8):x1+8]
wm_img = upscale_4k(extract_from_paper(wm_crop), 3840)
wm_img.save(out / "logo-wordmark-4k.png")
print("Saved logo-wordmark-4k.png:", wm_img.size)

# Wordmark + Tagline lockup
full_crop = arr[max(0, y0-8):y1+8, max(0, x0-8):x1+8]
full_img = upscale_4k(extract_from_paper(full_crop), 3840)
full_img.save(out / "logo-tagline-4k.png")
print("Saved logo-tagline-4k.png:", full_img.size)

# 2. Extract top-right rounded-square icon (scan y: 110..450, x: 1240..1600)
icon_scan = arr[110:450, 1240:1600]
icon_fg = np.linalg.norm(icon_scan[:, :, :3] - bg, axis=2) > 25
iys, ixs = np.where(icon_fg)
ix0, ix1 = ixs.min() + 1240, ixs.max() + 1240 + 1
iy0, iy1 = iys.min() + 110, iys.max() + 110 + 1
# Force square bounding box
side = max(ix1 - ix0, iy1 - iy0)
cx, cy = (ix0 + ix1) // 2, (iy0 + iy1) // 2
half = side // 2
icon_crop = arr[cy - half:cy - half + side, cx - half:cx - half + side].copy()
# Key out outer #F2F0E9 corners around the rounded square (only near edges where bg matches)
dist_bg = np.linalg.norm(icon_crop[:, :, :3] - bg, axis=2)
# Flood-fill from 4 corners on dist_bg < 45
from collections import deque
H, W = icon_crop.shape[:2]
outside = np.zeros((H, W), dtype=bool)
q = deque([(0,0), (0,W-1), (H-1,0), (H-1,W-1)])
while q:
    r, c = q.popleft()
    if 0 <= r < H and 0 <= c < W and not outside[r, c] and dist_bg[r, c] < 45:
        outside[r, c] = True
        q.extend([(r-1,c),(r+1,c),(r,c-1),(r,c+1)])
alpha_icon = np.where(outside, 0.0, np.where(dist_bg < 55, np.clip((dist_bg - 15.0) / 40.0, 0.0, 1.0) * 255.0, 255.0))
# Keep inner white 'o' opaque! (Only feather pixels adjacent to `outside`)
from scipy.ndimage import binary_dilation
border_zone = binary_dilation(outside, iterations=2)
alpha_icon = np.where(outside, 0.0, np.where(border_zone, np.clip((dist_bg - 12.0) / 40.0, 0.0, 1.0) * 255.0, 255.0))
icon_crop[:, :, 3] = alpha_icon
icon_pil = Image.fromarray(icon_crop.clip(0,255).astype(np.uint8), mode="RGBA")
icon_4k = icon_pil.resize((2160, 2160), Image.Resampling.LANCZOS)
icon_4k.save(out / "favicon-4k.png")
icon_512 = icon_pil.resize((512, 512), Image.Resampling.LANCZOS)
icon_512.save(out / "favicon.png")
print("Saved favicon-4k.png:", icon_4k.size, "and favicon.png:", icon_512.size)
