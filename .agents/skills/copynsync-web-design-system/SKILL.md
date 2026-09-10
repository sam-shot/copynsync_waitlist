---
name: copynsync-web-design-system
description: >-
  Official design system and style guide for Copynsync web applications and admin dashboards.
  Enforces dark palette tokens, top-to-bottom blue gradients, concentric corner radius formulas,
  hairline borders, and typography rules derived from Apple hardware aesthetics and Muse.ai.
---

# Copynsync Web Design System

This skill defines the visual identity, tokens, and styling standards for all Copynsync interfaces, including the admin dashboard and web applications. Inspired by high-end Apple hardware design and Muse.ai, the aesthetic is dark, tactile, restrained, and precision-engineered.

---

## 1. Color Palette & Surface Hierarchy

Never use arbitrary hex codes or generic grays. Copynsync interfaces strictly use this multi-layered dark elevation system:

| Layer / Role | Hex Code | Tailwind Utility | Purpose & Usage |
| :--- | :--- | :--- | :--- |
| **Base Canvas** | `#181819` | `bg-[#181819]` | Root background of the viewport and dashboard shell. |
| **Recessed Well** | `#1f2023` / `#202124` | `bg-[#1f2023]` | Sunken elements: input fields, search bars, table cells, icon boxes. |
| **Primary Surface** | `#242528` | `bg-[#242528]` | Primary cards, modal dialogs, flyout drawers, elevated containers. |
| **Secondary Surface** | `#28292b` | `bg-[#28292b]` | Form containers, card groups, interactive tiles, table headers. |
| **Hover Surface** | `#313337` / `#34353a` | `hover:bg-[#313337]` | Tactile hover states for inactive buttons, chips, and list rows. |
| **Active / Pressed** | `#1d1e20` / `#202124` | `active:bg-[#1d1e20]` | Momentary feedback on click/press. |

---

## 2. Signature Top-to-Bottom Gradient Blue

Copynsync strictly avoids flat primary blues or horizontal gradients. All brand blue highlights, primary action buttons, and active toggles use a **vertical top-to-bottom gradient** (light vibrant blue at the top $\to$ deep cobalt blue at the bottom):

### Gradient Text Highlights (Display Headings)
```tsx
<span className="bg-gradient-to-b from-[#6ca8ff] to-[#256beb] bg-clip-text text-transparent">
  Highlighted Value or Status
</span>
```

### Primary Buttons & Action Controls
```tsx
className="bg-gradient-to-b from-[#569bff] to-[#246feb] hover:from-[#62a4ff] hover:to-[#317bf5] active:from-[#2167de] active:to-[#1b55be] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_2px_6px_rgba(0,0,0,0.18)]"
```
*Note the subtle top specular inner highlight (`rgba(255,255,255,0.2) inset`), giving the button a crisp, physical glass-edge appearance.*

### Active Toggle Switches & Status Badges
```tsx
className="bg-gradient-to-b from-[#569bff] to-[#246feb]"
```

---

## 3. Concentric Corner Radius Formula

Never pick corner radii at random. To create a cohesive, hardware-grade interface, nested elements must follow the concentric radius formula:

$$R_{\text{inner}} = R_{\text{outer}} - \text{Padding}$$

### Standard Hierarchy
1. **Outer Windows & Modals:** `rounded-[32px]` or `rounded-[28px]`
2. **Dashboard Cards & Group Containers:** `rounded-3xl` (`24px`) with `p-5` or `p-6` (20px–24px padding)
3. **Inner Tiles, Icon Squares, & Nested Wells:** `rounded-2xl` (`16px`) or `rounded-xl` (`12px`)
4. **Interactive Controls & Inputs:**
   - Standalone inputs and action buttons: `rounded-full` (`h-[54px]` or `h-[48px]`)
   - High-density admin controls: `rounded-xl` or `rounded-lg` with matching inner radii

---

## 4. Hairline Borders & Specular Highlights

Avoid thick borders or high-contrast lines. Use Apple-style translucent hairlines:

- **Standard Divider / Card Border:** `border border-white/[0.08]` or `border-white/[0.06]`
- **Subtle Surface Highlight:** `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]`
- **Inactive Elements:** `border-transparent` or `border-white/[0.06]`
- **Active / Selected Elements:** High contrast clean white `border-white bg-white text-[#181819] font-medium shadow-md`

---

## 5. Typography Standards

| Role | Size & Weight | Color Token | Tracking / Leading |
| :--- | :--- | :--- | :--- |
| **Display Title** | `text-4xl` to `text-6xl`, `font-semibold` | `text-white` | `tracking-tight`, `leading-[1.1]` |
| **Section Header** | `text-2xl` to `text-3xl`, `font-semibold` | `text-white` | `tracking-tight` |
| **Card / Tile Title**| `text-lg` to `text-xl`, `font-semibold` | `text-white` | `tracking-tight` |
| **Body / Readout** | `text-base` or `text-sm`, `font-normal` | `text-[#d4d7dc]` | `leading-relaxed` |
| **Muted Metadata** | `text-xs` to `text-sm`, `font-normal` | `text-[#8f9296]` | `leading-normal` |
| **Micro Labels** | `text-[11px]`, `font-medium` | `text-[#6a6e74]` / `text-[#8f9296]` | `tracking-wider uppercase` |

- **Number Alignment:** In tables and metric tiles, use tabular figures (`font-mono` or `tabular-nums`) to prevent jitter on updates.
