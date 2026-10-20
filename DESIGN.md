---
version: alpha
name: Diptyque Web — Reference Design System
description: Evidence-based reconstruction of Diptyque's live EU storefront, with desktop, tablet and mobile rules.
---

# DESIGN.md — Diptyque reference

## Overview

### Visual theme & atmosphere

A restrained Parisian editorial storefront: white space, fine black outlines, literary serif headings and light sans-serif supporting text. The interface behaves like a quiet frame around richly coloured objects, illustration and photography. Luxury comes from composition, typography and material imagery rather than oversized text, rounded cards or floating shadows.

The October 2026 homepage features a warm wooden workshop and green seasonal objects. These campaign colours belong to the imagery; they do not replace the white-and-black interface foundation. Alternate full-width media, centred editorial introductions, product galleries and quieter service content.

### Scope and evidence

Inspected 20 October 2026. This is an independent reconstruction, not Diptyque's official brand book.

- **Verified CSS:** values extracted from the live HTML and its base, shared and compiled stylesheets.
- **Measured desktop:** computed styles and screenshot inspected at a 1363 × 936 CSS-pixel viewport.
- **Responsive CSS:** tablet and phone behaviour derived from actual media queries; separate resized browser screenshots were not available. Do not describe these as visually tested device layouts.
- **Recommended:** accessibility improvements and implementation choices explicitly marked below; these are not claims about Diptyque.
- Pixel equivalents assume a 16px root font. Retain rem units where appropriate.

This file uses the official Google Labs DESIGN.md alpha schema: YAML tokens plus ordered Markdown sections. The schema is a design-system exchange format, not proof of pixel-perfect reproduction or a guarantee of Stitch import behaviour. Component properties beyond the core schema may be preserved with warnings by consumers.

### Sources

1. Live page: https://diptyqueparis.com/en-eu
2. Base tokens, type, button rules: https://diptyqueparis.com/cdn/shop/t/91/assets/theme-base.css?v=140764287034725502611792067673
3. Cards and collection night styling: https://diptyqueparis.com/cdn/shop/t/91/assets/theme-shared.css?v=41285275846276404081791974139
4. Layout, header, footer and forms: https://diptyqueparis.com/cdn/shop/t/91/compiled_assets/styles.css?v=170377986255551628101791974152
5. Official format: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md

Homepage content, asset URLs and component overrides can change. The geolocation dialog is a third-party component with custom styling; do not treat it as the universal form system.

## Colors

### Functional palette

| Role | Hex | Use / evidence |
|---|---|---|
| Primary ink | #000000 | Core text, icons, primary outlines, inverse buttons |
| Page / surface | #FFFFFF | Verified html/body and desktop header background |
| Subtle surface | #F8F8F8 | Secondary background token |
| Warm tertiary surface | #F3EFEF | Blanc Montaigne; selective surfaces, not the default page |
| Secondary text | #4D4D4D | Supporting information |
| Pressed state / secondary border | #717171 | Action feedback and border token |
| Disabled | #C8C8C8 | Disabled foreground and border |
| Light border | #E9E9E9 | General border token |
| Input border | #E6E5E5 | Gris Nacre generic input border |
| Success | #03A536 | Approved state token |
| Alert | #ED7049 | Alert state token |
| Error | #D13037 | Error state token |
| Soft overlay | #00000040 | Black at approximately 25% opacity |
| Strong overlay | #00000080 | Black at approximately 50% opacity |

Do not call the main background ivory. The source includes a colour named Ivoire (#F1CFA9), but that is an extended palette colour, not the page background.

```yaml
colors:
  primary: "#000000"
  surface: "#FFFFFF"
  surface-subtle: "#F8F8F8"
  surface-warm: "#F3EFEF"
  on-surface: "#000000"
  on-surface-secondary: "#4D4D4D"
  on-inverse: "#FFFFFF"
  inverse: "#000000"
  border: "#E9E9E9"
  border-strong: "#000000"
  border-secondary: "#717171"
  border-input: "#E6E5E5"
  pressed: "#717171"
  disabled: "#C8C8C8"
  success: "#03A536"
  alert: "#ED7049"
  error: "#D13037"
  overlay-soft: "#00000040"
  overlay-strong: "#00000080"
  campaign-forest: "#004139"
  campaign-green: "#2E5538"
  campaign-ivory: "#F1CFA9"
  campaign-brick: "#8F2937"
```

Campaign tokens above are verified extended CSS palette entries, not sampled colours from the current photograph and not obligatory accents.

### Dark mode and transition logic

**No global light/dark switch was observed on the homepage.** Do not infer automatic OS-theme switching from the presence of dark photographs or inverse buttons.

Verified shared CSS implements an optional product-list night presentation:

1. An enabled state is represented by `data-plp-night="on"`.
2. Body, header and filter surfaces use `--plp-night-bg`; the CSS fallback is **#F3EFEF**, which is not itself dark. The actual collection configuration must supply its intended colour.
3. Text uses `--plp-night-fg` and `--plp-night-fg-subtle`. Different selectors contain different fallbacks; subtle text commonly falls back to #C8C8C8. Do not invent a single global dark palette from those fallbacks.
4. Product night-image layers begin at opacity 0. They become visible only with both the active night state and `card-product__night--ready`.
5. The ordinary second-image hover layer is suppressed in the active collection night state.
6. Dialogs, submenus, tags, buttons and quick-buy containers retain black text and reset secondary text to #4D4D4D rather than blindly inheriting the night foreground.
7. When `data-plp-night-fade` is present, colour/background and image-opacity transitions use **500ms**, **cubic-bezier(0.42, 0, 0.58, 1)**.
8. Those fade rules are conditional on `prefers-reduced-motion: no-preference`.

The CSS verifies state presentation, not how the state is triggered, persisted or restored. User-toggle logic, storage, OS preference integration and collection-specific final colours were not verified. For a homepage replication, keep light mode unless a separate night experience is explicitly designed.

## Typography

### Families and hierarchy

- **Diptyque Saint Germain:** custom serif for headings, editorial passages and many action labels.
- **Apercu Pro:** sans-serif for body, navigation, form content and metadata.
- The page also declares Apercu Pro Mono and Desmond Handwriting; their declaration alone does not make them core homepage fonts.
- Font faces use `font-display: swap`.
- Use licensed fonts where available. Suggested substitutes are Georgia for the serif and Arial for the sans-serif; these are approximations, not visual equivalents.

Verified source type tokens:

| Role | Family | Weight | Mobile <750px size / line | Tablet ≥750px size / line | Desktop size / line |
|---|---|---:|---:|---:|---:|
| Medium headline | Saint Germain | 400 | 28 / 34px | 32 / 38px | 32 / 38px |
| Small headline | Saint Germain | 400 | 20 / 24px | 24 / 28px | 24 / 28px |
| Small uppercase headline | Saint Germain | 400 | 20 / 24px | 24 / 28px | 24 / 28px |
| Large body | Apercu Pro | 300 | 16 / 22px | 16 / 22px | 16 / 22px |
| Editorial body | Saint Germain | 400 | 20 / 28px | 20 / 28px | 20 / 28px |
| Medium body | Apercu Pro | 300 | 14 / 20px | 14 / 20px | 14 / 20px |
| Small body | Apercu Pro | 300 | 12 / 16px | 12 / 16px | 12 / 16px |
| Large label | Apercu Pro | 400 | 16 / 20px | 16 / 20px | 16 / 20px |
| Medium label | Apercu Pro | 400 | 14 / 16px | 14 / 16px | 14 / 16px |
| Small label | Apercu Pro | 400 | 12 / 14px | 12 / 14px | 12 / 14px |
| Primary button | Saint Germain | 400 | 16 / 18px | 16 / 18px | 16 / 18px |

Letter spacing is 0 for these roles except uppercase small headings: -0.4px below 750px and -0.5px at/above 750px. Uppercase is a specific variant, not the default treatment for every heading. The breakpoint at 750px means 750–767px already uses larger headings.

```yaml
typography:
  headline-mobile:
    fontFamily: "'Diptyque Saint Germain', Georgia, serif"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 34px
    letterSpacing: 0px
  headline:
    fontFamily: "'Diptyque Saint Germain', Georgia, serif"
    fontSize: 32px
    fontWeight: 400
    lineHeight: 38px
    letterSpacing: 0px
  headline-small-mobile:
    fontFamily: "'Diptyque Saint Germain', Georgia, serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 24px
  headline-small:
    fontFamily: "'Diptyque Saint Germain', Georgia, serif"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 28px
  body:
    fontFamily: "'Apercu Pro', Arial, sans-serif"
    fontSize: 16px
    fontWeight: 300
    lineHeight: 22px
  body-editorial:
    fontFamily: "'Diptyque Saint Germain', Georgia, serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 28px
  body-small:
    fontFamily: "'Apercu Pro', Arial, sans-serif"
    fontSize: 14px
    fontWeight: 300
    lineHeight: 20px
  caption:
    fontFamily: "'Apercu Pro', Arial, sans-serif"
    fontSize: 12px
    fontWeight: 300
    lineHeight: 16px
  navigation:
    fontFamily: "'Apercu Pro', Arial, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 20px
  label:
    fontFamily: "'Apercu Pro', Arial, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 16px
  label-small:
    fontFamily: "'Apercu Pro', Arial, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 14px
  button:
    fontFamily: "'Diptyque Saint Germain', Georgia, serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 18px
```

The fallback stacks above are recommended implementation choices. Font names, sizes and weights come from the source. For lengthy portfolio case studies, a recommended adaptation is 16px/24px body text with weight 400; do not silently apply this to a faithful source reconstruction.

## Layout

### Spacing system

The source uses a **2px base unit**, with named steps rather than a strict 8px-only grid.

```yaml
spacing:
  base: 2px
  small-xs: 2px
  small-s: 4px
  small-m: 8px
  small-l: 12px
  small-xl: 16px
  medium-xs: 20px
  medium-s: 24px
  medium-m: 32px
  medium-l: 40px
  medium-xl: 48px
  large-xs: 56px
  large-s: 64px
  large-m: 80px
  large-l: 120px
  large-xl: 160px
  page-max-configured: 1920px
  header-inner-max-base: 1440px
  type-breakpoint: 750px
  footer-breakpoint: 768px
  layout-breakpoint: 1024px
  desktop-token-breakpoint: 1200px
```

### Responsive mapping

Device names are convenient labels; actual width queries control each component.

| Element | Mobile <750px | Tablet 768–1023px | Desktop ≥1024px |
|---|---|---|---|
| Headline | 28px / 34px | 32px / 38px | 32px / 38px |
| Small headline | 20px / 24px | 24px / 28px | 24px / 28px |
| Main navigation | Compact controls / menu | Compact controls / menu | Full navigation |
| Header base inset | 16px | 16px | Measured 24px top, 32px sides, 0 bottom |
| Standard section vertical padding | 40px | 40px | 56px |
| Generic content block padding | 40px vertical, 32px sides | Same smaller-layout rule | 56px vertical, 120px sides |
| Optional padded editorial variant | Component-specific | Component-specific | 80px side padding |
| Newsletter/help | Stacked | Two columns from 768px | Two columns |
| Footer padding | 30px vertical, 20px sides | 50px vertical, 40px sides | Same larger footer rule |
| Footer structure | Stacked expandable groups | Four-column grid | Four-column grid |
| Product-image ratio | 3:4 | 3:4 | 3:4 |
| Card badge inset | 8px | 8px | 16px |

Boundary notes:
- **750–767px:** larger typography, while footer/newsletter still use their smaller layout.
- **1024px tablet landscape:** desktop rules apply where the query is min-width:1024px. A physical tablet is not necessarily in the “tablet” CSS layout.
- **1200px:** a declared breakpoint token, not a universal switch for every component.
- The homepage config sets a 1920px page maximum; the base stylesheet also contains 1440px and smaller container tokens. Use the actual component/configuration, not a blanket 1440px wrapper.
- Section-specific settings remove selected top/bottom padding, especially around adjoining media. Do not mechanically insert 56px around every section.
- Text/gallery content includes 40px 16px 32px padding on the smaller layout; desktop variants can instead use 40px vertical and zero horizontal padding, or 48px side padding. Preserve the selected variant.

### Composition and media

The inspected desktop header centres its wordmark, with utility actions at the edges and category navigation underneath. The hero is wide, followed by centred serif storytelling and product browsing. Keep text blocks visually narrow even when media is full bleed.

Product cards use a 3:4 media frame. Some category media is explicitly 1:1. Source image CSS commonly uses object-fit:cover; responsive artwork may therefore crop. Do not stretch images.

**Portfolio adaptation:** for Fiona's full-table illustration, preserve the separately agreed no-cropping rule and shared layer coordinates. Use width:100% with the original composition aspect ratio; do not apply Diptyque's photographic cover behaviour to that artwork.

Recommended validation widths: 390, 749, 750, 767, 768, 834, 1023, 1024, 1366 and 1920px. Test long labels, keyboard navigation, touch menus and reduced motion. These are a future QA matrix, not completed test results.

## Elevation & Depth

The observed desktop header and product cards have **box-shadow:none**. Cards are separated through image scale, alignment and white space. Avoid generic floating-card elevation.

A primary button has **inset 0 -3px 0 0 #000000**. This is an internal bottom emphasis, not an exterior drop shadow. On hover/active it becomes **inset 0 0 0 0 #000000**.

Use the defined black overlay tokens behind dialogs. Do not infer card shadows from shadows inside product photography. Third-party widgets and local exceptions should not dictate the core elevation system.

## Shapes

Primary buttons and product cards are square in the inspected UI. Generic inputs are square; some actual form fields have **2px** corners. A `.button-rounded` modifier explicitly uses **4px**, so “every element has zero radius” would be inaccurate.

```yaml
rounded:
  none: 0px
  small: 2px
  medium: 4px
  large: 8px
  full: 999px
```

The nonzero values are declared source tokens, not permission to apply rounded cards everywhere. Reserve full rounding for appropriate circular controls.

## Components

### Buttons and text actions

| Variant / state | Styling |
|---|---|
| Primary default — verified | White fill, black 1px border, square corners, serif 16/18px, 48px height, 16px horizontal base padding, 4px gap, 3px inset bottom line |
| Primary hover — verified CSS | Bottom inset line disappears; base transition 400ms |
| Primary pressed — verified CSS | Text/border #717171; inset line removed |
| Primary disabled — verified CSS | Text/border/inset #C8C8C8; pointer events disabled |
| Inverse primary — verified | Black fill, white text; active background #717171; disabled background #C8C8C8 with #717171 text |
| Small button — verified | 40px height; 12px side padding; 2px gap |
| Secondary text action — verified | Serif 16/18px, transparent, underline; hover underline translates upward 2px over 300ms ease |
| Dot-link action — verified CSS | Underline offset changes from 6px to 4px on hover |
| Keyboard focus — recommended | 2px visible black outline, offset 3px; use white ring on black surfaces |

The measured purchase CTA overrides base padding to **24px** horizontally. Base rules are not necessarily the final computed values of every button. Secondary text actions have compact visual boxes; recommended touch hit areas should reach 44px without enlarging the type.

### Cards and galleries

- Default: transparent, square, no exterior shadow; centred content; 16px main row gap.
- Product image: 3:4; optional second image on the same grid cell.
- Hover: on fine pointers with hover support, the alternative image fades in over **500ms linear**. No general card lift is required.
- Touch: do not depend on hover to reveal an essential action or description.
- Badge: white background; 8px image inset below 1024px, 16px above; small interior padding.
- Click target: source uses a stretched product link; quick-buy controls have a higher stacking level. Keep secondary controls independently operable.
- Focus/selected/disabled: no universal card-state system was verified. Recommended: outline the link on keyboard focus, use an explicit selected indicator only for selectable cards, and explain unavailable products with text.
- Carousels should expose labelled previous/next buttons and visible progress where useful. Exact item count is component-specific; do not force one global column count.

### Inputs and forms

- Generic source input: 1px #E6E5E5 border, 0px radius, 2px vertical / 16px horizontal padding.
- A desktop email field measured **16px/20px Apercu Pro**, **12px padding**, **2px radius**, white background and no shadow. Treat this as a component override.
- Search fields can use a bottom-only border, transparent background and no rounded corners.
- Geolocation selects use a black 1px border and a 2px expanded border; this is a separate third-party component.
- Source generic input focus rules remove the outline. **Recommended correction:** retain a clear 2px focus treatment; do not reproduce invisible keyboard focus.
- Recommended hover: darken the field border to #717171.
- Recommended invalid: #D13037 border plus explicit error text and aria-describedby; do not rely on red alone.
- Recommended disabled: #F8F8F8 surface and #717171 text, with actual disabled semantics.
- Recommended filled: retain normal black text; keep a persistent visible label.
- Exact universal error, filled and disabled form styling was not verified; these recommendations complete an implementable system without mislabelling them as source behaviour.

### Navigation

- White background, black typography/icons, centred brand anchor.
- Desktop shows primary categories beneath the brand area; smaller widths use a menu control.
- CSS supports hover and focus-within menu states. Opening a menu restores a white header surface.
- Sticky/scroll behaviour includes a translateY(-100%) hidden state and component-specific transitions, including 150ms/300ms and cubic-bezier(0.48,-0.01,0.34,0.99).
- Transparent editorial header variants exist; these are context-dependent, not the default for every page.
- Recommended menu implementation: click/tap support, aria-expanded, Escape to close, focus restoration and an explicit active-page indication.
- Do not invent a tested hover delay or persistence policy; neither was established here.

### Machine-readable component mappings

Verified base values unless marked “recommended” in the component key. Some consumers may warn on extra properties such as boxShadow or transition; their values remain strings.

```yaml
components:
  page:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    maxWidth: "{spacing.page-max-configured}"
  button-primary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    height: "48px"
    padding: "0px 16px"
    border: "1px solid #000000"
    boxShadow: "inset 0 -3px 0 0 #000000"
    transition: "400ms"
  button-primary-hover:
    boxShadow: "inset 0 0 0 0 #000000"
  button-primary-active:
    textColor: "{colors.pressed}"
    borderColor: "{colors.pressed}"
    boxShadow: "inset 0 0 0 0 #000000"
  button-primary-disabled:
    textColor: "{colors.disabled}"
    borderColor: "{colors.disabled}"
    boxShadow: "inset 0 -3px 0 0 #C8C8C8"
  button-inverse:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
  button-inverse-active:
    backgroundColor: "{colors.pressed}"
  button-inverse-disabled:
    backgroundColor: "{colors.disabled}"
    textColor: "{colors.pressed}"
    boxShadow: "none"
  button-small:
    height: "40px"
    padding: "0px 12px"
  focus-visible-recommended:
    outline: "2px solid #000000"
    outlineOffset: "3px"
  product-card:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    boxShadow: "none"
    rowGap: "{spacing.small-xl}"
    imageAspectRatio: "3 / 4"
  product-card-hover:
    transition: "opacity 500ms linear"
  input-base:
    backgroundColor: "{colors.surface}"
    border: "1px solid #E6E5E5"
    rounded: "{rounded.none}"
    padding: "2px 16px"
  input-email-measured:
    typography: "{typography.navigation}"
    rounded: "{rounded.small}"
    padding: "12px"
    boxShadow: "none"
  input-invalid-recommended:
    borderColor: "{colors.error}"
  input-disabled-recommended:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.pressed}"
  navigation:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.navigation}"
    boxShadow: "none"
  collection-night-transition:
    duration: "500ms"
    easing: "cubic-bezier(0.42, 0, 0.58, 1)"
    motionCondition: "prefers-reduced-motion: no-preference"
```

## Do's and Don'ts

### Do

- Keep the primary canvas pure white and the interface predominantly black.
- Let imagery supply rich colour, craft and personality.
- Use modest serif headings and light sans-serif supporting text.
- Preserve square core controls and the characteristic button inset line.
- Build space from the 2px-based named scale; honour component overrides.
- Treat tablet as a mixture of larger typography and compact navigation until 1024px.
- Keep focus visible, labels persistent and touch interactions complete.
- Honour reduced motion and keep essential content visible when animation is disabled.
- Use fonts and imagery you have permission to reuse.
- Keep observed source rules separate from deliberate adaptations.

### Don't

- Replace the white page with beige merely because the mood feels warm.
- Turn every card into a rounded, shadowed panel.
- Add oversized display typography, gradients or decorative movement everywhere.
- Apply uppercase and wide tracking to all labels.
- Scale a desktop page down as an image to create a mobile layout.
- Assume every component changes at 768px.
- Mistake a dark campaign image, transparent header or collection night effect for global dark mode.
- Copy generic outline:none without an accessible focus replacement.
- Claim all responsive states are browser-tested when only CSS was inspected.
- Use Diptyque branding as your own identity; translate its visual principles into original work.

**Fiona portfolio application:** preserve the existing white background, divider-free preference, original illustrations and Home / Selected work / About me / Contact navigation. This reference document does not change the current portfolio or replace its project-specific design rules.

