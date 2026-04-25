# Font Weight Change: Section Headers

## Objective
Change section headers from `font-semibold` (600) to `font-normal` (400) for a thinner, lighter appearance using the Domaine Display Condensed font.

## Context
The section headers currently use `font-semibold` weight. The user wants a thinner version. The Domaine Display Condensed font has Regular (400) and Semibold (600) variants available.

## Changes Required

### Files to Modify
1. `app/sections/Projects.tsx` - Line 28
2. `app/sections/Experience.tsx` - Line 28
3. `app/sections/Awards.tsx` - Line 20
4. `app/sections/Contact.tsx` - Line 23

### Specific Changes
In each file, change:
```
className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-10"
```
to:
```
className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-10"
```

(Note: Contact.tsx uses `mb-4` instead of `mb-10`)

## Verification
- All 4 section headers should render with thinner font weight
- Font family remains `var(--font-domaine-condensed)`
- No other styling changes needed
