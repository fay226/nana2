# Portfolio design guide

## Style

French classic minimalism with colourful, hand-drawn Procreate artwork. References: [Diptyque](https://diptyqueparis.com/en-eu) and [Aesop](https://www.aesop.com/).

Use generous whitespace. No decorative divider lines or heavy shadows.

## Colours

| Use                | Colour          |
| ------------------ | --------------- |
| Background         | White `#FFFFFF` |
| Main text          | `#24241F`       |
| Supporting text    | `#6C6A62`       |
| Focus and emphasis | `#55594B`       |

## Typography

Headings: **Cormorant Garamond**. Body and navigation: **DM Sans**.

Sizes below are **font size / line height in px**. Desktop: **≥761px**; mobile: **≤760px**. Use equivalent `rem` values in code.

| Use                     | Font                      |  Weight | Desktop |  Mobile |
| ----------------------- | ------------------------- | ------: | ------: | ------: |
| Main heading · H1       | Cormorant Garamond        |     400 | 40 / 44 | 32 / 38 |
| Section heading · H2    | Cormorant Garamond        |     400 | 32 / 40 | 28 / 36 |
| Project name · H3       | Cormorant Garamond        |     400 | 28 / 36 | 24 / 32 |
| Project statement       | Cormorant Garamond        |     400 | 24 / 32 | 22 / 30 |
| Body                    | DM Sans                   |     400 | 16 / 26 | 16 / 26 |
| Navigation and controls | DM Sans                   |     400 | 14 / 20 | 13 / 20 |
| Labels and captions     | DM Sans                   | 400–500 | 12 / 18 | 12 / 18 |
| Decorative notes        | Cormorant Garamond italic |     400 | 20 / 28 | 20 / 28 |

- Active navigation: weight **500**.
- Heading letter spacing: **−0.02em**; body: normal.
- Italic heading phrases use the same size as the heading.
- Paragraph width: maximum **65ch**.
- Text inside the drawing scales with the artwork; this table defines page text.

## Homepage

Navigation: **Home · Selected work · About me · Contact**.

Display the complete drawing at full page width without cropping or distortion. Its height follows the 1440:900 ratio; scroll vertically when it exceeds the viewport. Scale the background, objects, labels, and clickable areas together. No scene padding or margins; extra white space is acceptable.

| Object   | Hover / keyboard focus               | Click          |
| -------- | ------------------------------------ | -------------- |
| Book     | Pen and “About me” appear            | About me       |
| Cup      | Heart and project label appear       | Custom Café    |
| Compass  | Needle turns; project label appears  | Career Compass |
| Bracelet | Stars sparkle; project label appears | Chloris Lux    |
| Painting | Tilts 5°; gallery label appears      | Paintings      |
| Envelope | “To Fiona” and contact label appear  | Contact        |

Use separate PNG layers for objects, effects, and labels. Keep matching canvas bounds for related layers. On touchscreens, show labels without hover. Provide visible keyboard focus and reduced-motion support.

Current artwork: all 15 supplied PNGs share a 1440 × 900 canvas. Place each at the same scene origin; use object-local clickable regions. The laptop is part of the background and remains static. Original uploads are preserved.
