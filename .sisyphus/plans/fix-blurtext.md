# Fix BlurText Direction and Font

## TL;DR
Fix the BlurText component in Hero section to animate from bottom instead of top, and restore the Domaine font family.

## Context
The BlurText component was added to the Hero section but has two issues:
1. Animation direction is "top" but should be "bottom" 
2. The `style` prop with `fontFamily: "var(--font-domaine)"` is not being applied because the BlurText component doesn't pass through the `style` prop to the underlying `<p>` element.

## Work Objectives

### Task 1: Fix Animation Direction
**File**: `app/sections/Hero.tsx`
**Change**: Line 15, change `direction="top"` to `direction="bottom"`

### Task 2: Fix Font Family Application  
**File**: `app/components/BlurText.tsx`
**Changes**:
- Add `style?: React.CSSProperties` to the `BlurTextProps` interface
- Destructure `style` from props
- Apply the `style` to the `<p>` element alongside the existing inline styles

### Task 3: Verify Build
Run `npm run build` to ensure no TypeScript errors.

## QA Scenarios
1. Hero heading "Sawasdee, I'm Nutt" animates from bottom (words slide up from below)
2. Font renders in Domaine Display (serif) not Aeonik (sans-serif)
3. Build passes with zero errors
