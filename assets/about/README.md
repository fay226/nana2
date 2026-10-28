# About Me book artwork

The About Me section uses StPageFlip 2.0.7, HTML pages, CSS and vanilla JavaScript.
Its pinned browser bundle loads from jsDelivr. If it fails, static pages remain visible.
The table artwork is not supplied yet; the current surface is white.

## Draw and export

- Keep the table/background separate from the turning sheets. Do not bake the open pages into the table: those pixels would stay underneath every turn.
- Draw the open book straight-on from above, with a vertical center spine. A strongly angled book requires a different alignment setup.
- Current single-page ratio is 4:5. Example: each page 1500 × 1875px; a complete spread 3000 × 1875px.
- Draw each spread, then split it exactly at the center into left and right PNGs. Five spreads = ten individual pages.
- Export pages in reading order: page-01.png (first left), page-02.png (first right), … page-10.png (last right).
- Pages should share identical dimensions, paper color, margins and spine position. Put text and artwork on each page, and keep it away from the gutter.
- The library supplies turning sheets and shadows. A static book cover/spine can be part of the table artwork, but leave the moving page area clear.
- Use PNG for the artwork. Keep an accurate text transcription for users who cannot read text baked into images.

## Add the table

Upload assets/about/table.png, then replace this variable in about-book.css:

    --about-table-image: url("assets/about/table.png");

The table fills the full browser width. Background-size is cover, so edges may crop on narrow screens.
Adjust .about-desk background-position and padding to align the book with your drawing.
The table and the book are independent layers, so test desktop and phone crops.

## Replace each sample HTML page

In index.html find #about-book. Keep every outer .about-book-page and replace its .about-book-page-inner with:

    <img src="assets/about/page-01.png"
         alt="An accurate transcription of everything written on this page."
         width="1500" height="1875" decoding="async">

Repeat in order for all ten pages. Avoid lazy-loading individual book pages: a hidden next page must be ready before a turn.
The Read about me as text section copies page text/alt descriptions. For longer text, provide matching HTML text in each page instead of relying only on alt text.
Change the ratio consistently in about-book.css and width/height/min/max settings in about-book.js if your drawings use another shape.

## Navigation drawn into the artwork

The Previous/Next buttons already call the page-flip methods and support keyboard arrows.
To place them over arrows drawn on the table, position .about-book-controls relative to
.about-book-stage or .about-desk and adjust its left/right/bottom percentages to your artwork.
You may make button borders/background transparent and visually hide their span text after
the arrows are drawn, but retain accessible names, keyboard focus outlines and 44px touch targets.
Do not place navigation drawings on a sheet that flips away: keep them on the static table.

## Behavior

- Opens on spread 1; no closed cover.
- Two-page layout remains on phones, matching your drawn spreads. Text version stays available for easier reading.
- Buttons disable at the first/last spread and while turning. ArrowLeft/ArrowRight work while the book area has keyboard focus.
- Reduced-motion visitors get instant page changes.
- The book does not capture touch dragging, so vertical scrolling stays available.
- Sample page wording is editable placeholder copy, not a completed About Me narrative.
