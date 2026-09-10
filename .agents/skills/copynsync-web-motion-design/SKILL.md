---
name: copynsync-web-motion-design
description: >-
  Motion design, Framer Motion spring physics, zero-jank expand/collapse drawer patterns,
  and micro-interaction standards for Copynsync web apps and the admin dashboard.
  Enforces smooth Apple/Muse.ai easing curves and eliminates layout snapping.
---

# Copynsync Web Motion Design

This skill governs animations, spring physics, dynamic text reveals, and micro-interactions for Copynsync interfaces. It defines the exact formulas required to achieve buttery 60fps/120fps motion with zero layout jank.

---

## 1. The Standard Easing Curve (Apple / Muse.ai Physics)

Never use generic CSS `ease` or linear motion for interactive transitions. Strictly use this luxurious cubic-bezier curve:

```ts
export const EASE_LUXURY = [0.16, 1, 0.3, 1];
```

- **Duration Standards:**
  - Fast feedback (hover, button press): `0.15s` (`150ms`)
  - Medium transitions (tabs, toggles, badges): `0.20s`–`0.25s`
  - Structural expands / drawers: `0.28s`–`0.35s`
  - Modal entries: `spring` with `{ damping: 25, stiffness: 350 }`

---

## 2. The Zero-Jank Expand/Collapse Drawer Law

When animating collapsible content (such as drawer panels, filter dropdowns, or pairing tips), generic implementations cause a **1–2px jump or layout stutter** right as the element unmounts.

### The Problem
When the parent container has a CSS `gap` (e.g., `flex flex-col gap-3`) or the motion div has an animated `marginTop`, the browser continues to render that flex gap/margin during the collapse. The instant Framer Motion unmounts the node, the remaining margin/gap suddenly disappears, snapping the content underneath upward.

### The Immutable Formula
1. **Remove `gap` on the parent container** if adjacent to a collapsible element. Use explicit margins on static siblings instead.
2. **Move all spacing INSIDE the motion drawer:** Place a padding container (`<div className="pt-3">` or `pt-4`) *inside* the `motion.div`.
3. **Animate ONLY `height` and `opacity`:** Do not animate `marginTop` or `padding` on the motion wrapper itself.

```tsx
<div className="flex flex-col">
  {/* Static Grid / Row */}
  <div className="grid grid-cols-4 gap-4">...</div>

  {/* Smooth Drawer */}
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.div
        key="drawer-panel"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: "auto",
          transition: {
            height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.2, delay: 0.05 },
          },
        }}
        exit={{
          opacity: 0,
          height: 0,
          transition: {
            height: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.12 },
          },
        }}
        className="overflow-hidden">
        {/* All spacing lives inside here */}
        <div className="pt-3">
          <div className="rounded-2xl bg-[#242528] p-4">
            {/* Drawer Content */}
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>
```
*Why this works:* At `height: 0`, the wrapper and its internal padding collapse down to exactly `0.000px`. When `AnimatePresence` unmounts the node, there is zero residual gap or margin, eliminating the 2px stutter completely.

---

## 3. Dynamic Text & Headline Parallax

For rotating text or high-impact metric updates:
- Animate individual words or lines with `staggerChildren: 0.032`.
- Apply a subtle directional blur (`blur(8px)` $\to$ `blur(0px)`) combined with a vertical translation (`y: 22` $\to$ `y: 0`).
- Exit quickly (`0.16s`) with slight upward motion (`y: -18`, `blur(6px)`) so the eye seamlessly catches the incoming text.

---

## 4. Modal & Dialog Spring Physics

Dialogs must feel like native macOS/iOS sheets:
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 12 }}
  transition={{ type: "spring", damping: 25, stiffness: 350 }}
  className="relative w-full max-w-md rounded-[32px] bg-[#242528] p-7 shadow-2xl">
  {/* Content */}
</motion.div>
```
- Backdrop: Solid dark scrim (`bg-black/80`), fading in over `0.15s`. Avoid heavy backdrop-blur that hurts framerates on mobile.
