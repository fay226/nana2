# About Me: full-canvas illustrated flipbook

Every PNG is **1440 × 900 pixels**, including the full canvas's transparent margins. Draw them all using the same coordinates (or work at 2880 × 1800, then export all layers to 1440 × 900). Keep transparent unused areas.

Files:
- `assets/about/table.png`: full background.
- `assets/about/book-base.png`: the stationary open book, including spine/cover/shadow.
- `assets/about/page-01.png` to `page-06.png`: one visible paper page **per PNG**, with all writing drawn into the illustration; other areas transparent.
- `assets/about/previous.png`, `assets/about/next.png`: illustrations of the arrows **outside** the book, on the table, full 1440 × 900 PNGs.

The transparent hit targets are separate from the PNGs. Their size/position can be adjusted in `about-flipbook.css`. All image layers stay registered with one coordinate system.

## Page rectangle and cropping

For the temporary demo, the book page **viewport rectangles in 1440 × 900 source pixels** are:
- left page: x = 330, y = 190, w = 390, h = 520
- right page: x = 720, y = 190, w = 390, h = 520

StPageFlip animates only those rectangles. CSS crops the 1440 × 900 page PNG to those page rectangles. If your artwork has a different book position or dimensions, adjust `.about-flipbook` plus `.about-page img` size/offset rules to match. Keep the full canvas exports unchanged.

**Important:** Export page 01, 03, 05 with their text in the *left* viewport rectangle; page 02, 04, 06 in the *right* viewport rectangle. These are separate flat image files: no page-turn motion is drawn into the source images.

For full-page artwork with realistic StPageFlip paper turns, the image/crop remains aligned with its original page during the transformation; outside-table PNGs stay motionless. The current placeholder files have not yet been replaced by final 1440 × 900 drawings.

The library loads from CDN. If unavailable or reduced motion is preferred, a two-page static fallback with functional arrow buttons appears. Written content is available in the text-only disclosure.

## Review checklist
- Replace the ten temporary PNGs at the correct dimensions
- Verify drawing/page rectangles and arrows line up at desktop and mobile widths
- Flip 1 → 2 → 3 and back, checking disabled arrow endpoints
- Test browsers, touch, reduced motion and fallback before merging
