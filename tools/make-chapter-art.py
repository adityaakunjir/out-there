"""Render the six original portfolio cover studies. Requires Pillow and numpy."""
from pathlib import Path
import math
import numpy as np
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / "dist/assets/chapters"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 800, 820
Y, X = np.mgrid[:H, :W]
PALETTES = [
    ([22, 48, 51], [184, 215, 170]),
    ([54, 63, 134], [179, 199, 244]),
    ([31, 18, 16], [229, 85, 49]),
    ([33, 44, 42], [131, 162, 139]),
    ([103, 56, 36], [238, 179, 117]),
    ([31, 37, 76], [140, 146, 226]),
]


def rotate(points, yaw, tilt):
    x, y, z = np.moveaxis(np.asarray(points), -1, 0)
    a, b = np.cos(yaw), np.sin(yaw)
    c, d = np.cos(tilt), np.sin(tilt)
    return np.stack((x*a-z*b, y*c-(z*a+x*b)*d, y*d+(z*a+x*b)*c), axis=-1)


def mesh(grid, color, faces, yaw=-.55, tilt=.36, ink=None):
    grid = rotate(grid, yaw, tilt)
    v0, v1 = grid[:-1, :-1], grid[:-1, 1:]
    v2, v3 = grid[1:, 1:], grid[1:, :-1]
    normals = np.cross(v1-v0, v3-v0)
    normals /= np.maximum(np.linalg.norm(normals, axis=-1, keepdims=True), 1e-9)
    light = np.clip(abs(normals @ np.array([-.44, .7, .52])), 0, 1)
    spec = 68 * np.maximum(normals @ np.array([-.4, .42, .81]), 0) ** 10
    shades = np.clip(np.asarray(color)*(.43+.62*light[..., None])+spec[..., None], 0, 255)
    for r, c in np.ndindex(light.shape):
        quad = np.array([v[r,c] for v in (v0,v1,v2,v3)])
        faces.append((quad[:,2].mean(), [(400+x*235,387-y*235) for x,y,_ in quad],
                      tuple(shades[r,c].astype(int)), ink))


def box(center, size, color, faces, yaw=-.55, tilt=.36):
    midpoint=np.asarray(center)
    half=np.asarray(size)/2
    for normal in range(3):
        u,v=[i for i in range(3) if i!=normal]
        for sign in [-1,1]:
            grid=np.zeros((2,2,3))
            grid[:,:,normal]=sign*half[normal]
            grid[:,:,u]=[[-half[u],half[u]],[-half[u],half[u]]]
            grid[:,:,v]=[[-half[v],-half[v]],[half[v],half[v]]]
            mesh(grid+midpoint,color,faces,yaw,tilt)


def ribbon(faces,kind):
    t,v=np.meshgrid(np.linspace(0,2*np.pi,210), np.linspace(-1,1,13))
    twist = (3*t/2 if kind==4 else t)
    radius = 1.0+.23*v*np.cos(twist)
    grid=np.stack([radius*np.cos(t),.65*radius*np.sin(t),.40*np.sin(2*t)+.29*v*np.sin(twist)],axis=-1)
    for i in range(len(v)-1):
        color = ([235,202,151] if i%4 else [76,56,49])
        mesh(grid[i:i+2],color,faces,-.12,.18)


def objects(k):
    faces=[]
    if k==0:
        x,z=np.meshgrid(np.linspace(-.95,.95,67),np.linspace(-.70,.70,44))
        h=.10+.98*np.exp(-((x+.16*z)**2/.33+(z+.10)**2/.37))*(.75+.25*np.cos(11*x+6*z))
        h+=.16*np.sin(9*z+2*x)*np.exp(-1.5*(x*x+z*z))
        for i in range(len(z)-1):
            band=h[i:i+2]
            grid=np.stack((x[i:i+2],band-.39,z[i:i+2]),axis=-1)
            mesh(grid,[174,213,151] if i%4 else [66,106,83],faces,-.61,-.48)
        box([0,-.49,0],[1.94,.18,1.45],[90,124,97],faces,-.61,-.48)
    elif k==1:
        for n,(px,pz,turn) in enumerate([(-.46,.05,-.47),(.51,-.16,.42)]):
            phi,theta=np.meshgrid(np.linspace(0,2*np.pi,76),np.linspace(-np.pi/2,np.pi/2,69))
            profile=np.cos(theta)*.36
            grid=np.stack([profile*np.cos(phi),np.sin(theta)*.34+.43*np.tanh(6*theta),profile*np.sin(phi)],axis=-1)
            grid=rotate(grid,0,.17)
            x,y=grid[:,:,0].copy(),grid[:,:,1].copy()
            grid[:,:,0]=x*math.cos(turn)-y*math.sin(turn)+px
            grid[:,:,1]=x*math.sin(turn)+y*math.cos(turn)
            grid[:,:,2]+=pz
            for i in range(len(grid)-1):
                color=([197,222,240] if n==0 else [192,218,193]) if i<34 else ([108,127,225] if n==0 else [46,71,108])
                if i==34: color=[31,45,72]
                mesh(grid[i:i+2],color,faces,-.08,.11)
    elif k==2:
        for j in range(5):
            z=-1.08+j*.48
            for x in [-.65,.65]:
                box([x,-.18,z],[.115,1.55,.15],[193,56,33],faces,-.58,-.20)
            box([0,.55,z],[1.67,.14,.20],[228,80,39],faces,-.58,-.20)
            box([0,.32,z],[1.47,.075,.12],[210,64,33],faces,-.58,-.20)
    elif k==3:
        for r in range(5):
            for c in range(5):
                h=.22+.56*(.5+.5*np.sin(r*.95-c*.65))
                col=([195,217,164] if (r+c)%3 else [76,131,106])
                box([(c-2)*.35,h/2-.36,(r-2)*.35],[.31,h,.31],col,faces,-.59,-.49)
    elif k==4:
        ribbon(faces,k)
    else:
        # Six folded ribbons form one sculptural, offset printing specimen.
        for j in range(8):
            t,s=np.meshgrid(np.linspace(-1,1,70),np.array([-.074,.074]))
            z=.34*np.cos(t*3+j*.31)
            x=(j-3.5)*.177+s+.22*np.sin(t*3+j*.25)
            grid=np.stack((x,t*.85,z),axis=-1)
            mesh(grid,[156+j*8,173+j*6,245],faces,-.34,.17)
    return faces


for k,(base,highlight) in enumerate(PALETTES):
    base,highlight=np.array(base),np.array(highlight)
    ramp=np.exp(-((X-W*.42)**2/(W*.66)**2+(Y-H*.24)**2/(H*.7)**2))
    bg=base+(.46*ramp[...,None])*(highlight-base)
    shadow=np.exp(-((X-W*.55)**2/(W*.25)**2+(Y-H*.71)**2/(H*.047)**2))
    bg*=1-.36*shadow[...,None]
    img=Image.fromarray(bg.clip(0,255).astype("uint8"))
    drawing=ImageDraw.Draw(img)
    for _,points,fill,outline in sorted(objects(k),key=lambda f:f[0]):
        drawing.polygon(points,fill=fill,outline=outline)
    rgb=np.asarray(img).astype(float)
    rgb+=np.random.default_rng(k+8).normal(0,1.40,(H,W,1))
    Image.fromarray(rgb.clip(0,255).astype("uint8")).save(OUT/f"study-{k+1}.webp",quality=86,method=6)
