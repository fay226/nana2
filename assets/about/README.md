# Replace the About Me PNGs

All visual book content now uses PNG files. Replace the files with your own drawings using the same names:

- assets/about/table.png — full-width table background (placeholder: 2400 × 1400px).
- assets/about/page-01.png through page-10.png — ten individual book pages, each 1500 × 1875px.

Five open spreads use these pairs: 01/02, 03/04, 05/06, 07/08, 09/10.
You may draw each spread at 3000 × 1875px, then split it exactly in half.
Keep every single page at the same 4:5 ratio; replacement images with this ratio require no CSS or JavaScript changes.

The supplied PNGs are plain labeled placeholders, not finished illustrations.
The page PNG should include your drawn paper, text and illustrations. Keep the table separate, and leave the moving page area out of the table image. The page background has an opaque paper base so transparent PNG details can still cast page shadows.

Table background uses cover and may crop on narrow screens. Adjust .about-desk background-position and padding in about-book.css to align your table drawing and book.
The library positions and turns the book pages above the table.

After replacing page artwork, update each image's alt text in index.html with an accurate transcription.
This feeds the Read about me as text section.
Avoid lazy-loading these page PNGs; all ten are used by the flipbook.

Previous/Next buttons and keyboard navigation are already wired up.
If drawing arrows on the table, align the controls over those arrows with CSS.
Retain accessible button names, keyboard focus indicators and 44px touch targets.

The book is built with StPageFlip 2.0.7 loaded from a pinned CDN URL, HTML page wrappers, CSS and vanilla JavaScript.
Reduced motion uses instant page changes. If the library fails, static PNG pages remain available.
