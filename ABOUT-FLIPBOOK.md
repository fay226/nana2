# About Me — illustrated PNG flipbook
The **entire table** is `assets/about/table.png`. The **book underneath the pages** is `assets/about/book-base.png`. Six **individual illustrated page PNGs**, including hand-drawn words, are `assets/about/page-01.png` to `page-06.png`.

Replace the placeholder files with your own PNGs using the same names. For best effect, draw a book underlay without page writing; make each page the same portrait aspect ratio **3:4** (e.g. 1500 × 2000). Place drawn Previous/Next arrows at the book's bottom outer corners, matching the transparent button hit targets positioned in CSS `.about-prev` and `.about-next`. The visible arrows are temporary text symbols until you replace them in your book artwork; then hide only the button's span text, not the buttons.

Only the About Me section in index.html was modified. Existing hero, project artifacts and sound effects remain unchanged. The animation relies on StPageFlip loaded via CDN. Reduced-motion users and CDN failures get a static, still-navigable two-page book. The transcript is accessible HTML outside the PNG drawing.

**Review before merging:** browser-test desktop, mobile, arrows, shadows, and artwork placement on GitHub Pages. The current PNGs are tiny placeholders, not final designs.
