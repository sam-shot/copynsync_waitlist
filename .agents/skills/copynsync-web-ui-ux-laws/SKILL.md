---
name: copynsync-web-ui-ux-laws
description: >-
  UI/UX principles, visual hierarchy laws, contrast standards, and anti-AI-slop rules
  for Copynsync web apps and the admin dashboard. Enforces Apple and Muse.ai taste,
  progressive disclosure, information scent, and strict aesthetic boundaries.
---

# Copynsync UI/UX Laws & Taste Guide

This skill governs the aesthetic decision-making, visual hierarchy laws, and quality standards for all Copynsync interfaces. It prevents generic "AI slop" and guarantees interfaces that look and feel like multi-million dollar, precision-crafted web applications.

---

## 1. The "No AI Slop" Manifesto (Things You Must NEVER Do)

Generic AI coding assistants tend to fall back on predictable, tacky frontend tropes. **These are strictly prohibited across all Copynsync codebases:**

1. **NO Colored Neon Glows:**
   - ❌ `box-shadow: 0 0 14px rgba(75, 147, 255, 0.4)`
   - ❌ Neon halos around icons, switches, cards, or buttons.
   - ✅ Clean, physical shadows: `shadow-sm`, `shadow-md`, or `shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_4px_16px_rgba(0,0,0,0.35)]`. High contrast comes from surface values, not blur.

2. **NO Decorative Badges / Clutter Pills:**
   - ❌ Random pill tags like "Direct invite link", "New!", "AI Powered" floating above inputs.
   - ✅ If a piece of information is critical, write it as clear body copy. If it's not critical, delete it.

3. **NO Multi-Card Error Spatter:**
   - ❌ Turning four platform cards red (`border-red-500`) when a selection is missing. It creates overwhelming visual noise.
   - ✅ Keep cards neutral; provide a single, calm, descriptive error message beneath the group.

4. **NO Generic AI Gradients:**
   - ❌ Purple-to-pink or generic indigo-to-violet linear gradients.
   - ✅ Strictly Copynsync's top-to-bottom blue gradient (`from-[#6ca8ff] to-[#256beb]` on dark `#181819`).

5. **NO Default Browser Artifacts:**
   - ❌ Blue browser focus outlines, mobile gray tap highlight boxes, dotted outline boxes.
   - ✅ `outline-none focus:outline-none focus:ring-0` with custom, subtle border transitions.

6. **NO Generic Stock Illustrations or AI Placeholders:**
   - ❌ Floating 3D bubbles, robot icons, generic stock avatars.
   - ✅ Native, functional UI: clean tabular data, real device icons (Apple, Windows, Android, Linux), telemetry meters, real peer statuses.

---

## 2. Visual Hierarchy & Information Scent

Visual hierarchy determines what the user's eye lands on first, second, and third.

1. **Explain "Why" Before Demanding Input:**
   - Always place the contextual explanation *above* the input field, not beneath it in microscopic text.
   - *Example:* When expanding the WhatsApp phone drawer, state: *"We will send an invitation link to the private WhatsApp tester group before testing starts"* **first**, followed by the input field.

2. **Establish 3 Distinct Elevation Planes:**
   - **Background Plane (`#181819`):** The quiet canvas.
   - **Container Plane (`#242528` / `#28292b`):** The structural group. Gives visual context and grouping (Gestalt Law of Common Region).
   - **Interactive Plane (`#202124` / `#1f2023` for wells; white or gradient blue for active buttons):** The focus of user action.

3. **Scale & Typography Contrast:**
   - Display headlines must be bold and confident (`text-4xl` to `text-6xl`, `leading-[1.1]`, `tracking-tight`).
   - Supporting copy must be legible and restrained (`text-[#d4d7dc]` for readability, `text-[#8f9296]` for secondary metadata).
   - Never make critical explanatory copy smaller than `text-sm` (`14px`).

---

## 3. Law of Proximity & Grouping (Gestalt)

- Related items must be closer to each other than to unrelated items.
- In forms and dashboard panels:
  - Space between a label and its input: `mb-2` (8px).
  - Space between adjacent form fields in a row: `gap-4 sm:gap-5` (16px–20px).
  - Space between distinct form sections or dashboard cards: `gap-6 sm:gap-8` (24px–32px).
- Never use uniform gaps everywhere; visual rhythm requires variation between inner and outer spacing.

---

## 4. Tactile Feedback Principles (Apple / Muse.ai Taste)

Every interactive control must feel like real hardware:
- **Buttons:** Subtle active scale down (`active:scale-[0.98]`), smooth hover transition (`duration-150`), and specular top edge highlight.
- **Toggles:** Apple-style pill switch (`h-[28px] w-[50px]`) with smooth sliding thumb (`22px`), solid gradient when ON, muted dark gray when OFF.
- **Card Hovers:** On clickable list rows or device cards, use gentle background brightening (`hover:bg-[#27282c]`) without aggressive movement or shadows.
