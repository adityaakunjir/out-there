"""Render original small-edition sculpture plates for the studio opening."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "dist/assets/hero"
W,H = 480,720
palettes = [
 ("a4bfca","de302c","SHUTTER"), ("493e38","ded1bc","FOLD"), ("c75f44","27273d","ORBIT"),
 ("939c96","f3e3d7","SPINDLE"), ("bea581","303e63","RIBBON"), ("2a3946","a8c5c7","PHASE"),
 ("958099","e8ceaf","FLUTE"), ("d5bb9e","ab3931","HELIX"), ("434d6b","eadbbf","KNOT"),
 ("95a69b","28323a","COLUMN"), ("a95e46","daced2","SPOOL")]
def rgb(s): return np.array(tuple(bytes.fromhex(s)),dtype=float)
def render(i, back, pigment, label):
 rng=np.random.default_rng(i+37)
 y,x=np.mgrid[:H,:W]
 light=1.14-.28*y/H-.14*x/W+.07*np.cos(x/W*2.4+y/H)
 contact=np.exp(-((x-W*.48)/(W*.28))**2-((y-H*.79)/(H*.057))**2)
 bg=rgb(back)*light[:,:,None]*(1-.48*contact[:,:,None])+rng.normal(0,.8,(H,W,1))
 img=Image.fromarray(np.uint8(bg.clip(0,255))); painter=ImageDraw.Draw(img)
 u,v=np.meshgrid(np.linspace(0,2*np.pi,133),np.linspace(0,2*np.pi,53))
 if i in (0,3,6,9,10):
  h=(v/np.pi-1); taper=(np.maximum(0,1-abs(h)**(1.3+i%3))**.25)
  rad=(.64+(.065+.035*(i%3))*np.cos((9+i)*u+h*(2+i%5)))*taper
  rad*=1+.30*np.sin(h*(i+1)*.5)
  X=rad*np.cos(u);Y=1.18*h;Z=rad*np.sin(u)
 else:
  twists=[0,1,2,0,1,3,0,2,3,0,0][i]
  ring=.65+.16*np.sin(twists*u)
  cx=ring*np.cos(u);cy=ring*np.sin(u);cz=.31*np.sin((twists+1)*u)
  width=.19+.09*np.cos(twists*u)
  if i in (1,4): width=width*(.12+abs(np.cos(v))**.30)
  X=cx+width*np.cos(u)*np.cos(v);Y=1.25*(cy+width*np.sin(u)*np.cos(v));Z=cz+width*np.sin(v)
 a=.19*(i%4-1.5);b=-.30+.06*(i%3)
 A=X*np.cos(a)-Y*np.sin(a);B=X*np.sin(a)+Y*np.cos(a)
 B,Z=B*np.cos(b)-Z*np.sin(b), B*np.sin(b)+Z*np.cos(b)
 V=np.stack([A,B,Z],axis=-1)
 faces=np.stack((V[:-1,:-1],V[:-1,1:],V[1:,1:],V[1:,:-1]),axis=2).reshape(-1,4,3)
 normals=np.cross(faces[:,1]-faces[:,0],faces[:,3]-faces[:,0])
 normals/=np.maximum(.00001,np.linalg.norm(normals,axis=1,keepdims=True))
 normals*=np.where(normals[:,2:3]<0,-1,1)
 key=np.maximum(0,normals@[-.50,.61,.61]);spec=np.maximum(0,normals@[-.27,.33,.90])**17
 color=rgb(pigment)[None,:]*(.31+.77*key[:,None])+spec[:,None]*117
 colors=np.uint8(np.clip(color,0,255))
 unit=min(W*.84/np.ptp(A),H*.70/np.ptp(B))
 uv=faces[:,:,:2].copy();uv[:,:,0]=W*.5+(uv[:,:,0]-(A.min()+A.max())/2)*unit
 uv[:,:,1]=H*.46-(uv[:,:,1]-(B.min()+B.max())/2)*unit
 for k in np.argsort(faces[:,:,2].mean(axis=1)):
  painter.polygon([tuple(q) for q in uv[k]],fill=tuple(colors[k]))
 # Fine print is part of a single edition, consistent across the artwork.
 fg=(238,232,218) if rgb(back).mean()<120 else (36,34,37)
 painter.line((25,H-62,W-25,H-62),fill=fg,width=1)
 mono=ImageFont.truetype("C:/Windows/Fonts/consola.ttf",17)
 painter.text((25,H-47),label,fill=fg,font=mono)
 painter.text((W-25,H-47),f"OT / {i+1:02d}",fill=fg,font=mono,anchor="ra")
 img.resize((320,480),Image.Resampling.LANCZOS).save(OUT/f"study-{i+1:02d}.webp",quality=88,method=5)
for i,palette in enumerate(palettes): render(i,*palette)
