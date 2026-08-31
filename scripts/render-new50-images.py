"""Deterministic text-only edits of COPIES of the 1254px master (never AI).

Outside the explicit text rectangles every decoded pixel must be identical.
Text removal interpolates the existing background across each rectangle; it
does not introduce a new background design. The original PNG is read-only.
"""
from pathlib import Path
import json
import hashlib
import subprocess
import tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / 'public/thumbnails/studyhigh-official-template.png'
# Reuse the Korean variable font already present in this project's Git history.
# It has a true heavy weight, avoiding artificial rounded stroke expansion.
FONT = Path(tempfile.gettempdir()) / 'studyhigh-new50-NotoSansKR.ttf'
if not FONT.exists():
    FONT.write_bytes(subprocess.check_output(['git','show','f7be124:public/fonts/NotoSansKR-VF.ttf'],cwd=ROOT))
EXPECTED = 'fbd599fe2121cf5eef8138316b5bf1e44718cfe72a5f83366986c4adf639f4c6'
assert hashlib.sha256(MASTER.read_bytes()).hexdigest() == EXPECTED
original = Image.open(MASTER).convert('RGB')
assert original.size == (1254, 1254)
source = np.asarray(original).copy()
# Existing glyph bounds, not whole banners. Bottom branding is never touched.
REGION = (517, 108, 735, 180)
SUBJECT = (154, 237, 649, 476)
BOTTOM = (229, 938, 336, 972)
SUBTITLE = (823, 496, 928, 550)
ICON_SUBJECT = (687, 788, 742, 815)

def erase(im, box):
    x0,y0,x1,y1 = box
    pixels = np.asarray(im).copy()
    # Vertical interpolation from adjacent original background; keep each
    # column's hue. Avoid covering icons, borders, or unchanging text.
    top = source[y0-2, x0:x1].astype(float)
    bottom = source[y1+2, x0:x1].astype(float)
    weight = np.linspace(0,1,y1-y0)[:,None,None]
    patch=Image.fromarray(np.round(top[None,:,:]*(1-weight)+bottom[None,:,:]*weight).astype('uint8')).filter(ImageFilter.GaussianBlur(4))
    pixels[y0:y1,x0:x1] = np.asarray(patch)
    return Image.fromarray(pixels)

def text(im, label, box, size, fill=None, gradient=False, stroke=0):
    font = ImageFont.truetype(str(FONT), size)
    font.set_variation_by_axes([900 if gradient else 700])
    bounds = font.getbbox(label, stroke_width=stroke)
    mask = Image.new('L', (bounds[2]-bounds[0]+4,bounds[3]-bounds[1]+4))
    ImageDraw.Draw(mask).text((2-bounds[0],2-bounds[1]), label, font=font, fill=255, stroke_width=stroke)
    x0,y0,x1,y1 = box
    mask = mask.resize((x1-x0,y1-y0), Image.Resampling.LANCZOS)
    if gradient:
        # Sample the original purple glyph colour from solid internal pixels.
        a = np.zeros((y1-y0,x1-x0,3), dtype='uint8')
        for y in range(y1-y0):
            t=y/max(1,y1-y0-1)
            a[y,:,:]=np.array([103,44,197])*(1-t)+np.array([79,31,169])*t
        color=Image.fromarray(a)
    else:
        color=Image.new('RGB',mask.size,fill or (255,255,255))
    im.paste(color,(x0,y0),mask)

records=json.loads((ROOT/'data/manifests/daejeon/additional-50-20260901.json').read_text(encoding='utf-8'))['records']
report=[]
for r in records:
    im=original.copy()
    boxes=[]
    town=r['image']['regionText']
    if town!='탄방동':
        im=erase(im,REGION); boxes.append(REGION)
        text(im,town,(523,112,729,176),90)
        im=erase(im,BOTTOM); boxes.append(BOTTOM)
        text(im,town,(232,941,332,970),36)
    if r['page']['subject']!='수학':
        im=erase(im,SUBJECT); boxes.append(SUBJECT)
        text(im,r['page']['subject'],(164,245,641,470),280,gradient=True)
        im=erase(im,SUBTITLE); boxes.append(SUBTITLE)
        text(im,r['page']['subject'],(828,505,922,542),60,fill=(98,36,191))
        im=erase(im,ICON_SUBJECT); boxes.append(ICON_SUBJECT)
        text(im,r['page']['subject'],(691,791,739,811),36,fill=(26,14,47))
    # Byte-for-byte original decoded pixels outside declared text areas.
    diff=np.any(np.asarray(im)!=source,axis=2)
    allowed=np.zeros(diff.shape,dtype=bool)
    for x0,y0,x1,y1 in boxes: allowed[y0:y1,x0:x1]=True
    assert not np.any(diff & ~allowed), r['id']
    out=ROOT/'public'/r['image']['imagePath'].lstrip('/')
    out.parent.mkdir(parents=True,exist_ok=True)
    im.save(out,format='PNG',compress_level=6)
    assert Image.open(out).size==(1254,1254)
    report.append({'url':r['image']['imagePath'],'outsideTextChangedPixels':int(np.sum(diff & ~allowed))})
    print('Image',len(report),r['image']['imagePath'],flush=True)
assert hashlib.sha256(MASTER.read_bytes()).hexdigest()==EXPECTED
print(json.dumps({'images':len(report),'outsideTextChangedPixels':sum(x['outsideTextChangedPixels'] for x in report),'masterSha256':EXPECTED}))
