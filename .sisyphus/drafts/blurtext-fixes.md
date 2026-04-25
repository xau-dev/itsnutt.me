# Draft: BlurText Fixes

## Requirements (confirmed)
- **Fix 1**: BlurText animation direction — `direction="bottom"` should make text **rise up** from below (not land from above)
  - Current bug: `direction="top"` starts at `y: -50` (above), animates to `y: 0`
  - User wants: `direction="bottom"` should start at `y: 50` (below), animate to `y: 0` — text brought UP
  - So: `direction="top"` = text comes from top (lands down), `direction="bottom"` = text comes from bottom (rises up)
  - Current code has this INVERTED — `direction="top"` starts at `y: -50` which means it comes FROM top, lands down... actually that's correct for "top"
  - Wait, let me re-read: user says "animation should like text brought up not landed from above make the direction bottom"
  - So user wants `direction="bottom"` which means text rises UP from below
  - Currently in Hero.tsx it's `direction="top"` — need to change to `direction="bottom"`
  - And fix the animation logic so `bottom` means start below (`y: 50`) and animate to `y: 0`

- **Fix 2**: Font not rendering as Test Domaine Display
  - Hero.tsx has `style={{ fontFamily: "var(--font-domaine)", fontWeight: 400 }}`
  - globals.css defines `@font-face` for "Test Domaine Display" and CSS variable `--font-domaine`
  - But the font files are `.otf` format — need to verify paths are correct
  - Font paths in CSS: `/fonts/TestDomaineDisplay-Regular-BF66174a224cb3d.otf`
  - Actual files exist at: `public/fonts/TestDomaineDisplay-Regular-BF66174a224cb3d.otf`
  - Next.js serves `public/` at root, so `/fonts/...` should work
  - Issue might be that `font-display: swap` with no system font fallback means invisible text while loading
  - OR the CSS variable isn't being applied properly
  - Need to add explicit fallback and ensure font loads

## Technical Decisions
- Use CSS `font-display: swap` with proper fallback stack
- Ensure font-face declarations are correct and files are reachable
- Fix animation direction logic in BlurText.tsx

## Open Questions
- None — requirements are clear

## Scope Boundaries
- INCLUDE: BlurText.tsx animation fix, Hero.tsx font fix
- EXCLUDE: Any other components or sections
