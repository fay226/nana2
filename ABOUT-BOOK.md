# Illustrated About Me book

This feature adds three spreads (six illustrated pages) to the existing #about section without altering the homepage illustrated desk or project artwork.

## Replace the temporary PNGs

Replace `assets/about-pages/page-01.png` through `page-06.png` with your own artwork. Use identical dimensions for all six pages (suggested 1500 × 2000 px, portrait 3:4). Keep the filenames unchanged.

The placeholder words are HTML in `index.html` inside `.about-page-copy`. Once your illustrations include lettering, remove the corresponding `.about-page-copy` block from each page (the written text in the expandable accessible alternative should remain and be updated). Each drawing's arrows are interactive via transparent/illustration-style buttons placed over the outer edges, with markup `.about-prev` and `.about-next`.

The book uses StPageFlip v2.0.7 from jsDelivr (internet required). If the CDN doesn't load, a static two-page fallback with working navigation is displayed. The first two pages are open by default. On narrow screens the library may show single pages. Keyboard arrows work when focus is inside the book region, and a text-only alternative is supplied below it.

## QA checklist
- Page flipping in both directions across all three spreads
- First/last page navigation disabled as appropriate
- Mobile portrait responsiveness and no horizontal scrolling
- Clickable illustrated navigation arrows
- Reduced-motion experience
- Screen-reader text alternative
- Verify CDN loading on deployed GitHub Pages
