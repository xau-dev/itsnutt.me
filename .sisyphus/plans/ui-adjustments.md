# UI Adjustments: Hero Spacing + Navbar Sizing

## TL;DR
> Increase Hero section top padding to push content down, and enlarge navbar text/size for better visibility.
> 
> **Deliverables**: Updated `Hero.tsx` and `Navbar.tsx`
> **Estimated Effort**: Quick (< 5 min)
> **Parallel Execution**: NO - 2 sequential edits

---

## Context

User wants two visual adjustments:
1. **Hero content too high** — the "👋 Sawasdee, I'm Nutt" block sits too close to the navbar
2. **Navbar too small** — logo and nav links are not prominent enough

---

## Work Objectives

### Core Objective
Adjust spacing and sizing for better visual hierarchy on the landing page.

### Concrete Deliverables
- `app/sections/Hero.tsx` — increased top padding
- `app/components/Navbar.tsx` — larger text and padding

### Definition of Done
- [ ] Hero section has more breathing room from navbar
- [ ] Navbar logo and links are visibly larger
- [ ] Page still renders without errors on localhost:3000

---

## Verification Strategy

### QA Scenarios

**Scenario: Visual check — Hero spacing**
  Tool: Bash (curl + grep)
  Steps:
    1. curl http://localhost:3000
    2. Verify Hero section class contains `pt-24` or `pt-32`
  Expected Result: Hero has increased top padding

**Scenario: Visual check — Navbar sizing**
  Tool: Bash (curl + grep)
  Steps:
    1. curl http://localhost:3000
    2. Verify navbar has `text-xl` or `text-2xl` for logo
    3. Verify nav links have `text-base` or `text-lg`
  Expected Result: Navbar text is larger

---

## Execution Strategy

### Tasks

- [ ] 1. Increase Hero top padding

  **What to do**:
  - Edit `app/sections/Hero.tsx`
  - Change `pt-16` to `pt-24 md:pt-32` on the section element

  **Must NOT do**:
  - Change any other spacing or layout

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Blocks**: None

  **Acceptance Criteria**:
  - [ ] Hero section top padding increased
  - [ ] curl http://localhost:3000 | findstr "pt-24" returns match

- [ ] 2. Enlarge Navbar

  **What to do**:
  - Edit `app/components/Navbar.tsx`
  - Change `py-6` to `py-8 md:py-10`
  - Change logo `text-lg` to `text-xl md:text-2xl`
  - Change nav links `text-sm` to `text-base md:text-lg`

  **Must NOT do**:
  - Change colors, fonts, or hover effects

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 1)
  - **Blocks**: None

  **Acceptance Criteria**:
  - [ ] Navbar padding increased
  - [ ] Logo text enlarged
  - [ ] Nav link text enlarged
  - [ ] curl http://localhost:3000 | findstr "text-xl" returns match

---

## Commit Strategy

- **1**: `style(ui): increase hero spacing and navbar size`
  - Files: `app/sections/Hero.tsx`, `app/components/Navbar.tsx`

## Success Criteria

- [ ] Hero content sits lower on page
- [ ] Navbar is more visible with larger text
- [ ] No build errors
