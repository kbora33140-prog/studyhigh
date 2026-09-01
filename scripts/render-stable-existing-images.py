"""Create deterministic copies for the 30 existing manifest thumbnails.

The MASTER file is read-only. Only the same five text rectangles used by the
approved new-50 renderer may differ; every decoded pixel outside them is
asserted to be identical before WebP encoding.
"""
from pathlib import Path
import hashlib
import json
import subprocess
import tempfile

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
MASTER = ROOT / "public/thumbnails/studyhigh-official-template.png"
OUT = ROOT / "public/seo-images/stable-existing"
FONT = Path(tempfile.gettempdir()) / "studyhigh-stable-NotoSansKR.ttf"
EXPECTED = "fbd599fe2121cf5eef8138316b5bf1e44718cfe72a5f83366986c4adf639f4c6"

if not FONT.exists():
    FONT.write_bytes(
        subprocess.check_output(
            ["git", "show", "f7be124:public/fonts/NotoSansKR-VF.ttf"], cwd=ROOT
        )
    )

assert hashlib.sha256(MASTER.read_bytes()).hexdigest() == EXPECTED
original = Image.open(MASTER).convert("RGB")
source = np.asarray(original).copy()
assert original.size == (1254, 1254)

REGION = (517, 108, 735, 180)
SUBJECT = (154, 237, 649, 476)
BOTTOM = (229, 938, 448, 972)
SUBTITLE = (823, 496, 928, 550)
ICON_SUBJECT = (687, 788, 742, 815)


def erase(im, box):
    x0, y0, x1, y1 = box
    pixels = np.asarray(im).copy()
    top = source[y0 - 2, x0:x1].astype(float)
    bottom = source[y1 + 2, x0:x1].astype(float)
    weight = np.linspace(0, 1, y1 - y0)[:, None, None]
    patch = Image.fromarray(
        np.round(top[None, :, :] * (1 - weight) + bottom[None, :, :] * weight).astype("uint8")
    ).filter(ImageFilter.GaussianBlur(4))
    pixels[y0:y1, x0:x1] = np.asarray(patch)
    return Image.fromarray(pixels)


def draw_text(im, label, box, size, fill=None, gradient=False, preserve=False):
    font = ImageFont.truetype(str(FONT), size)
    font.set_variation_by_axes([900 if gradient else 700])
    bounds = font.getbbox(label)
    mask = Image.new("L", (bounds[2] - bounds[0] + 4, bounds[3] - bounds[1] + 4))
    ImageDraw.Draw(mask).text((2 - bounds[0], 2 - bounds[1]), label, font=font, fill=255)
    x0, y0, x1, y1 = box
    target = (x1 - x0, y1 - y0)
    if preserve:
        ratio = min(target[0] / mask.width, target[1] / mask.height)
        scaled = (max(1, round(mask.width * ratio)), max(1, round(mask.height * ratio)))
        mask = mask.resize(scaled, Image.Resampling.LANCZOS)
        offset = ((target[0] - scaled[0]) // 2, (target[1] - scaled[1]) // 2)
    else:
        mask = mask.resize(target, Image.Resampling.LANCZOS)
        offset = (0, 0)
    if gradient:
        colors = np.zeros((mask.height, mask.width, 3), dtype="uint8")
        for y in range(mask.height):
            t = y / max(1, mask.height - 1)
            colors[y, :, :] = np.array([103, 44, 197]) * (1 - t) + np.array([79, 31, 169]) * t
        color = Image.fromarray(colors)
    else:
        color = Image.new("RGB", mask.size, fill or (255, 255, 255))
    im.paste(color, (x0 + offset[0], y0 + offset[1]), mask)


def render(town, subject):
    im = original.copy()
    boxes = []
    if town != "탄방동":
        im = erase(im, REGION); boxes.append(REGION)
        draw_text(im, town, (523, 112, 729, 176), 90, preserve=True)
        im = erase(im, BOTTOM); boxes.append(BOTTOM)
        draw_text(im, f"{town} 학생들의", (232, 941, 442, 970), 36, preserve=True)
    if subject != "수학":
        im = erase(im, SUBJECT); boxes.append(SUBJECT)
        draw_text(im, subject, (164, 245, 641, 470), 280, gradient=True)
        im = erase(im, SUBTITLE); boxes.append(SUBTITLE)
        draw_text(im, subject, (828, 505, 922, 542), 60, fill=(98, 36, 191))
        im = erase(im, ICON_SUBJECT); boxes.append(ICON_SUBJECT)
        draw_text(im, subject, (691, 791, 739, 811), 36, fill=(26, 14, 47))
    diff = np.any(np.asarray(im) != source, axis=2)
    allowed = np.zeros(diff.shape, dtype=bool)
    for x0, y0, x1, y1 in boxes:
        allowed[y0:y1, x0:x1] = True
    assert not np.any(diff & ~allowed)
    return im, int(np.sum(diff & ~allowed))


records = json.loads(
    (ROOT / "data/manifests/daejeon/test-30-v1.json").read_text(encoding="utf-8")
)["records"]
OUT.mkdir(parents=True, exist_ok=True)
report = []
for record in records:
    image, outside = render(record["region"]["eupmyeondong"], record["page"]["subject"])
    filename = Path(record["image"]["imagePath"]).name
    target = OUT / filename
    image.save(target, "WEBP", lossless=True, method=6)
    report.append({"file": filename, "outsideTextChangedPixels": outside})

# The only published legacy API image without an existing static thumbnail.
legacy, outside = render("월평동", "영어")
legacy.save(OUT / "legacy-wolpyeong-english.webp", "WEBP", lossless=True, method=6)
report.append({"file": "legacy-wolpyeong-english.webp", "outsideTextChangedPixels": outside})

assert hashlib.sha256(MASTER.read_bytes()).hexdigest() == EXPECTED
print(json.dumps({
    "images": len(report),
    "outsideTextChangedPixels": sum(item["outsideTextChangedPixels"] for item in report),
    "masterSha256": EXPECTED,
}, ensure_ascii=False))
