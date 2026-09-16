import zipfile
import re
import sys
import io

# Force UTF-8 output for Windows consoles
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

path = sys.argv[1] if len(sys.argv) > 1 else "presentations/DESKHUB_MASTER_PRESENTATION_v1.2.1.pptx"

with zipfile.ZipFile(path) as z:
    slides = sorted(
        [n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)],
        key=lambda x: int(re.search(r"(\d+)", x).group(1)),
    )
    print("Total slides:", len(slides))
    with z.open("ppt/presentation.xml") as f:
        pres_xml = f.read().decode("utf-8", errors="replace")
    m = re.search(r'<p:sldSz\s+cx="(\d+)"\s+cy="(\d+)"', pres_xml)
    if m:
        cx, cy = int(m.group(1)), int(m.group(2))
        print(f"Slide size (EMU): {cx} x {cy}")
        print(f"Slide size (in): {cx/914400:.3f} x {cy/914400:.3f}")
    # Quick text dump per slide
    for i, slide in enumerate(slides, 1):
        with z.open(slide) as f:
            xml = f.read().decode("utf-8", errors="replace")
        texts = re.findall(r"<a:t>([^<]*)</a:t>", xml)
        joined = " | ".join(texts)[:160]
        # Count images and shapes
        n_pic = xml.count("<p:pic>")
        n_sp = xml.count("<p:sp>")  # shapes including text boxes
        # Estimate overflow risk: very long lines
        max_text_len = max((len(t) for t in texts), default=0)
        risk = "OVERFLOW?" if max_text_len > 90 else ""
        print(
            f"Slide {i:02d}: {len(texts):3d} txt | {n_sp:2d} shp | {n_pic:2d} pic | "
            f"maxLen={max_text_len:3d} {risk}"
        )

# Check theme + slide masters
print("\nFonts in theme:")
with zipfile.ZipFile(path) as z:
    for theme_name in [n for n in z.namelist() if n.startswith("ppt/theme/theme") and n.endswith(".xml")]:
        with z.open(theme_name) as f:
            theme = f.read().decode("utf-8", errors="replace")
        fonts = re.findall(r'typeface="([^"]+)"', theme)
        print(f"  {theme_name}: {sorted(set(fonts))}")

# Check Calibri / Outfit usage across slides
print("\nFont usage in slides:")
font_count = {}
with zipfile.ZipFile(path) as z:
    for slide in slides:
        with z.open(slide) as f:
            xml = f.read().decode("utf-8", errors="replace")
        for f_name in re.findall(r'typeface="([^"]+)"', xml):
            font_count[f_name] = font_count.get(f_name, 0) + 1
for name, count in sorted(font_count.items(), key=lambda x: -x[1]):
    print(f"  {name}: {count}")