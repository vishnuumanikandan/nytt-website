# Design System: National Youth Think Tank

## 1. Visual Theme & Atmosphere

**"Civic print, two editions."** The visual language of legislative documents executed with contemporary scale: Clarendon display type, machined frames, registration marks, film grain. Two editions of the same document: **Light** is ink on archival paper; **Dark** is gold leaf on midnight navy. The atmosphere is institutional gravity with youthful confidence, like a state archive that hired a very good art director.

Dials: variance 7 (offset asymmetric), motion 6 (fluid, scroll-choreographed), density 4. Dashboard and admin stay at motion 2: quiet tools.

## 2. Color Palette & Roles (OKLCH semantic tokens, defined in `app/globals.css`)

Every component uses semantic utilities (`bg-paper`, `text-ink`, `text-accent`); raw hexes never appear in markup. Tokens flip under `[data-theme="dark"]`.

| Token | Light ("paper") | Dark ("midnight") | Role |
| --- | --- | --- | --- |
| `paper` | archival off-white `oklch(98.5% .004 270)` | midnight navy `oklch(17.5% .028 272)` | page ground |
| `paper-shade` | tinted band | slightly raised band | alternate sections |
| `surface` | white | raised navy `oklch(22.5% .035 272)` | cards, forms |
| `navy` / `navy-deep` | brand navy bands | still-distinct deep bands | drenched brand surfaces |
| `ink` / `ink-muted` | navy ink | cool paper / muted | text (AA verified) |
| `brand` | navy headings | **gilded cream** `oklch(88% .045 88)` | display headings |
| `accent` | royal ink `oklch(46% .17 266)` | **gold leaf** `oklch(82% .125 90)` | links, focus rings |
| `btn` / `btn-fg` | royal fill / paper text | gold plate / navy text | primary buttons |
| `gold` / `gold-strong` | seal gold (constant) | seal gold | identity accents, eyebrows |
| `on-navy` / `on-navy-faint` | near-white (constant) | near-white | text on navy bands |

The poetic rule: **in the light the ink does the work; in the dark the gold does.**

## 3. Typography Rules

- **Display: Besley** (Clarendon revival, the letterforms of public notices and legal print), 700/800 + italics. Fluid clamp, hero ceiling 3.5rem, tracking-tight, max 2 lines for the homepage hero.
- **Body & UI: Public Sans** (the U.S. federal government's open-source typeface). All dashboard/admin type.
- **Ghost type:** oversized Besley outlines (`.ghost-type`, `-webkit-text-stroke`) carrying real brand facts only (founding year, chapter count, seat counts). Never lorem decoration.
- Body max 65–75ch, `text-wrap: balance` on headings, same-family italic for emphasis.

## 4. Component Stylings

- **Buttons:** rectangular 2px radius, `active:translate-y-px`. Primary = `btn` tokens (royal in light, gold plate in dark). One label per intent site-wide.
- **Double bezel (`.bezel`):** every significant photograph sits in a machined gold-hairline tray with an inner highlight, never flat on the page.
- **Registration marks (`.reg-mark`):** small `+` crosshairs marking compartments of real content (cadence ledger, legislator strip). Never free-floating decoration.
- **Film grain (`.grain`):** fixed, pointer-events-none fractal noise at 5% (light) / 7% (dark), mix-blend overlay.
- **Photo treatments:** `.duotone` (desaturate + contrast) and `.duotone-wash` (navy multiply gradient) tie photography to the palette.
- **Inputs:** label above, error below in `--bad`, accent focus ring, `surface` fill. Values repopulate after failed submissions.
- **Status badges:** soft token fills that flip per theme; founding chapters get navy/gold.

## 5. Layout Principles

12-col grid, `max-w-[1200px]`, asymmetric splits (8/4, 7/5), section padding `py-20 md:py-28` (manifesto band `md:py-36`). Hairlines organize real content only. Sharp corners everywhere (2px controls, 0 on bands); the one exception is 4px portraits. All multi-column layouts collapse to single column below 768px; verified zero horizontal overflow at 360/390/768/1024.

## 6. Motion & Interaction

- **Hero entrance:** CSS keyframes (rise + blur resolve), server-rendered visible, staggered via `hero-rise-*`. No hydration dependency.
- **Scroll reveals:** IntersectionObserver progressive enhancement; content visible without JS; rise + blur over 0.8s `cubic-bezier(0.22,1,0.36,1)`.
- **GSAP layer** (`components/motion.tsx`): `ScrubText` resolves the closing manifesto word by word against scroll; `ParallaxFrame` drifts photographs inside their bezels. Both wrapped in `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.
- **Nav:** translucent blur bar, animated link underlines, hamburger that morphs into an X, staggered mobile menu reveal.
- **Theme switch:** the lightbulb (the NYTT mark) toggles the lights; a 0.35s surface crossfade plays once, then is removed.
- Dashboard/admin: 150–250ms state transitions only.

## 7. Anti-Patterns (enforced)

No em-dashes anywhere. No Inter. No purple gradients or neon glows. No pure black. Max 1 eyebrow per 3 sections. No section-number eyebrows, version stamps, locale strips, or scroll cues. No div-built fake screenshots. No placeholder names or fake-precise numbers: every figure on the site (6 seats, ~20 students, 48 chapters, one paper per two months) is real. WCAG AA contrast is verified programmatically in both themes by `scripts/contrast-check.mjs`.
