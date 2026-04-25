# Plan: Section Header Font Weight Change

## TL;DR
Change all section headers from `font-semibold` to `font-normal` for a thinner, lighter appearance.

## Context
The user wants section headers to use a thinner font weight. Currently they use `font-semibold` (600), but should use `font-normal` (400) with the Domaine Display Condensed font.

## Work Objectives

### Core Objective
Update 4 section header components to use `font-normal` instead of `font-semibold`.

### Concrete Deliverables
- Modified `app/sections/Projects.tsx`
- Modified `app/sections/Experience.tsx`
- Modified `app/sections/Awards.tsx`
- Modified `app/sections/Contact.tsx`

### Definition of Done
All 4 section headers render with thinner font weight while maintaining Domaine Display Condensed font family.

## Execution Strategy

### Wave 1 (Single Wave - All Parallel)
- Task 1: Update Projects.tsx header
- Task 2: Update Experience.tsx header
- Task 3: Update Awards.tsx header
- Task 4: Update Contact.tsx header

## TODOs

- [ ] 1. Update Projects.tsx section header font weight

  **What to do**:
  - Change line 28 from `font-semibold` to `font-normal`
  
  **File**: `app/sections/Projects.tsx`
  **Line**: 28
  **Change**: `className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-10"` → `className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-10"`

- [ ] 2. Update Experience.tsx section header font weight

  **What to do**:
  - Change line 28 from `font-semibold` to `font-normal`
  
  **File**: `app/sections/Experience.tsx`
  **Line**: 28
  **Change**: `className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-10"` → `className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-10"`

- [ ] 3. Update Awards.tsx section header font weight

  **What to do**:
  - Change line 20 from `font-semibold` to `font-normal`
  
  **File**: `app/sections/Awards.tsx`
  **Line**: 20
  **Change**: `className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-10 text-center"` → `className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-10 text-center"`

- [ ] 4. Update Contact.tsx section header font weight

  **What to do**:
  - Change line 23 from `font-semibold` to `font-normal`
  
  **File**: `app/sections/Contact.tsx`
  **Line**: 23
  **Change**: `className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4"` → `className="text-4xl md:text-5xl font-normal text-white tracking-tight mb-4"`

## Final Verification Wave

- [ ] F1. Verify all 4 files have been updated correctly
  - Check each file contains `font-normal` instead of `font-semibold` in the header className
  - Confirm no other styles were accidentally modified

## Success Criteria
- [ ] All 4 section headers use `font-normal` weight
- [ ] Font family remains `var(--font-domaine-condensed)`
- [ ] No visual regressions in other elements
