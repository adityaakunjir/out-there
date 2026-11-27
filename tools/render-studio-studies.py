"""Render the studio's original dimensional material studies using NumPy and Pillow."""
from pathlib import Path
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parents[1] / 'dist/assets/studies'
OUT.mkdir(exist_ok=True, parents=True)
# Each study pairs a physical gesture with the corresponding studio discipline.
STUDIES = [
    ('direction', 'fold', '#cdc6b4', '#a43e2f', 1),
    ('product', 'ring', '#a4afaf', '#28434f', 2),
    ('development', 'ribbon', '#16241f', '#9ebc79', 3),
    ('orbit', 'ring', '#25302e', '#c8daaa', 4),
    ('pleat', 'fold', '#b9bab1', '#566572', 5),
    ('signal', 'ribbon', '#bab0a0', '#9d3a25', 6),
    ('contour', 'ring', '#26283b', '#b6b9d5', 7),
    ('interval', 'fold', '#35262c', '#d19487', 8),
]

def rgb(color):
    return np.array([int(color[i:i+2], 16) for i in (1,3,5)])

def render(stem, shape, ground, ink, seed):
    width, height = 720, 900
    y, x = np.ogrid[:height, :width]
    rng = np.random.default_rng(seed)
    vignette = 1.04 - .24*((x-240)/790)**2 - .29*((y-310)/980)**2
    pixels = rgb(ground) * vignette[:,:,None] + rng.normal(0,1.3,(height,width,1))
    image = Image.fromarray(np.uint8(pixels.clip(0,255)))
    shadow = Image.new('L',image.size)
    ImageDraw.Draw(shadow).ellipse((125,621,599,714),fill=135)
    image.paste(Image.new('RGB',image.size,tuple((rgb(ground)*.41).astype(int))),mask=shadow.filter(ImageFilter.GaussianBlur(29)))
    faces = []
    def surface(points, color):
        # Rotate the model into studio light. Face normals determine tone.
        angle = -.51 if seed%2 else .54
        tilt = -.42
        a, b, c = np.moveaxis(points,-1,0)
        xx, zz = a*np.cos(angle)+c*np.sin(angle), -a*np.sin(angle)+c*np.cos(angle)
        yy, zz = b*np.cos(tilt)-zz*np.sin(tilt), b*np.sin(tilt)+zz*np.cos(tilt)
        pp = np.stack((xx,yy,zz),axis=-1)
        verts = np.stack((pp[:-1,:-1], pp[1:,:-1], pp[1:,1:], pp[:-1,1:]),axis=2)
        normals = np.cross(verts[:,:,1]-verts[:,:,0], verts[:,:,3]-verts[:,:,0])
        normals /= np.maximum(1e-8,np.linalg.norm(normals,axis=2,keepdims=True))
        normals = np.where(normals[:,:,2:3]<0,-normals,normals)
        light = np.maximum(0,normals @ [-.40,.68,.60])
        spec = np.maximum(0,normals @ [-.22,.38,.90])**19
        colors = np.clip(color*(.35+.72*light[:,:,None])+66*spec[:,:,None],0,255).astype(int)
        for pts, col in zip(verts.reshape(-1,4,3),colors.reshape(-1,3)):
            project = 226/(1-pts[:,2]*.09)
            polygon = list(zip((360+pts[:,0]*project).astype(int),(458-pts[:,1]*project).astype(int)))
            faces.append((pts[:,2].mean(),polygon,tuple(col)))
    ink = rgb(ink)
    if shape=='ring':
        u,v=np.meshgrid(np.linspace(0,2*np.pi,166),np.linspace(0,2*np.pi,38),indexing='ij')
        turns = 3 if seed!=7 else 5
        outer=.88+.12*np.cos(turns*u)
        r=.28+.045*np.sin(u*48)
        points=np.stack(((outer+r*np.cos(v))*np.cos(u),(outer+r*np.cos(v))*np.sin(u),.50*np.sin(turns*u)+r*np.sin(v)),axis=-1)
        surface(points,ink)
    elif shape=='fold':
        u,v=np.meshgrid(np.linspace(-1,1,49),np.linspace(-1,1,32),indexing='ij')
        accordion=np.abs(((u+1)*6)%2-1)
        points=np.stack((u*1.13+v*.15,v*1.03+.18*np.sin(u*2),accordion*.55+.39*np.sin(v*2.3+u*2)),axis=-1)
        surface(points,ink)
    else:
        u,v=np.meshgrid(np.linspace(-2.5,2.5,146),np.linspace(-.5,.5,20),indexing='ij')
        points=np.stack((.75*np.sin(u*1.5)+v*np.cos(u*1.4),u*.48,.65*np.cos(u*1.5)+v*np.sin(u*1.4)),axis=-1)
        surface(points,ink)
    draw=ImageDraw.Draw(image)
    for _,poly,col in sorted(faces,key=lambda f:f[0]):
        draw.polygon(poly,fill=col)
    image.resize((576,720),Image.Resampling.LANCZOS).save(OUT/(stem+'.webp'),quality=88,method=6)

for study in STUDIES:
    render(*study)
