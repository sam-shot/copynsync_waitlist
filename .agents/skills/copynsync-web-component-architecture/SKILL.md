---
name: copynsync-web-component-architecture
description: >-
  Component architecture, CVA primitives, typing rules, and modularity guidelines
  for Copynsync web apps and the admin dashboard. Enforces reusable atomic primitives,
  Radix Slot composition, zero-outline focus rules, and clean component extraction.
---

# Copynsync Web Component Architecture

This skill defines how components must be structured, typed, and composed in Copynsync web applications and the admin dashboard. It ensures modular, maintainable, and type-safe UI engineering.

---

## 1. Atomic Primitive Architecture (CVA & Radix Slot)

All core primitives (`Button`, `Input`, `Card`, `Badge`, `Dialog`) must be built using `class-variance-authority` (CVA) and `@radix-ui/react-slot` for polymorphism (`asChild`).

### Standard Button Primitive (`components/ui/button.tsx`)
```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 font-medium transition-all duration-150 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-[#569bff] to-[#246feb] hover:from-[#62a4ff] hover:to-[#317bf5] active:from-[#2167de] active:to-[#1b55be] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_2px_6px_rgba(0,0,0,0.18)]",
        elevated:
          "bg-[#28292d]/90 hover:bg-[#34353a] active:bg-[#202124] backdrop-blur-[16px] text-white shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset,0_4px_16px_0_rgba(0,0,0,0.35)]",
        secondary:
          "bg-[#242528] hover:bg-[#2d2e33] active:bg-[#1d1e20] text-white",
        outline:
          "border border-white/15 hover:border-white/30 hover:bg-white/5 text-white",
        ghost:
          "hover:bg-white/10 text-[#8f9296] hover:text-white",
      },
      size: {
        sm: "h-8 px-3.5 text-xs rounded-full",
        md: "h-10 px-5 text-sm rounded-full",
        lg: "h-[54px] px-6 text-base rounded-full",
        icon: "h-10 w-10 rounded-full p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);
```

### Critical Interactive Rules
1. **Always Kill Browser Rings on Buttons:**
   Every button and interactive tile must have:
   `outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0`
   Browser-generated focus rings look amateurish and clash with the hardware dark aesthetic.
2. **Built-in Icon & Loading Slots:**
   Buttons must natively support `icon`, `trailingIcon`, and `loading` spinner props rather than manually assembling SVGs in parent components.

---

## 2. Standard Input Primitive (`components/ui/input.tsx`)

Inputs must feel like recessed hardware wells:
- **Geometry:** `h-[54px]` (or `h-[48px]` for high-density admin forms), `rounded-full` or `rounded-xl`.
- **Background:** `bg-[#28292b]` or recessed `bg-[#202124]` / `bg-[#1f2023]`.
- **Text & Placeholder:** `text-base` (prevent iOS auto-zoom on `<input>`), `placeholder:text-[#8f9296]`.
- **Focus:** `border-transparent focus:border-[#4b93ff] focus:ring-1 focus:ring-[#4b93ff]`.
- **Selection:** Always include `select-text` class so mobile users can select and edit text despite global unselectable rules.

---

## 3. Component Decomposition Guidelines

Never create 300+ line monolithic page files. Follow this separation of concerns:

1. **Primitives (`components/ui/`):**
   Stateless, reusable across the entire product (`Button`, `Input`, `Card`, `Badge`, `Switch`, `Dialog`, `Confetti`).
2. **Domain Modules (`components/dashboard/` or `components/`):**
   Compositions with specific domain logic:
   - `DeviceCard`: Renders OS icon (Apple, Windows, Android, Linux), peer status, IP, last sync timestamp.
   - `PeerStatusBadge`: Displays connection state (Connected, Handshaking, Offline, Relay).
   - `TelemetryTile`: Displays throughput (e.g. `1.2 GB/s`), packet drop rate, or active cohort count.
   - `ApplicantRow`: User email, registered testing platforms, WhatsApp toggle state, approval button.
3. **View Layer (`app/dashboard/page.tsx`):**
   Pure composition: handles data fetching, state management, and renders the domain modules inside standard layout grids.
