---
name: copynsync-admin-dashboard-patterns
description: >-
  Specific architecture, patterns, and component recipes for the Copynsync Admin Dashboard.
  Covers device fleet monitors, P2P sync telemetry, cohort applicant management,
  high-density data tables, metric tiles, and real-time log streaming interfaces.
---

# Copynsync Admin Dashboard Patterns

This skill provides the domain-specific component patterns, layout recipes, and UX standards for building the **Copynsync Admin Dashboard**. It translates the core design system into a powerful, data-dense, professional operations console.

---

## 1. Dashboard Layout & Shell Architecture

The admin console uses a high-density, split-pane architecture:

```
+-----------------------------------------------------------------------------+
| Sidebar Rail (240px / 72px)  | Top Header (64px) - Engine Status, Node IP   |
| Logo, Nav Links, Device Fleet|----------------------------------------------|
| Telemetry, Cohort Management | Main Viewport (Internal scroll, safe margins)|
| Admin Settings, Logs         | Metric Tiles, Data Tables, Inspector Drawers |
+-----------------------------------------------------------------------------+
```

### Shell Rules
- **Sidebar Rail:** Dark surface `#181819` or `#1f2023` with hairline border `border-r border-white/[0.06]`. Active navigation links use a subtle background `bg-white/10` with white text and an accent dot (`bg-[#4b93ff]`).
- **Top Header Bar:** Fixed `h-[60px]` or `h-[64px]`, containing live peer connection counts, node status indicator, and quick search.
- **Main Viewport:** High-density layout using `max-w-7xl mx-auto px-6 py-8`.

---

## 2. Metric & Telemetry Tiles

Metric cards must display real-time numbers with zero visual clutter:

```tsx
<div className="rounded-2xl sm:rounded-3xl bg-[#242528] p-5 sm:p-6 shadow-sm border border-white/[0.06] flex flex-col justify-between">
  <div className="flex items-center justify-between mb-3">
    <span className="text-xs font-semibold tracking-wider uppercase text-[#8f9296]">
      P2P Throughput
    </span>
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
      +18.2%
    </span>
  </div>
  <div className="flex items-baseline gap-2">
    <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white font-mono tabular-nums">
      1.42 GB/s
    </span>
    <span className="text-xs text-[#8f9296]">LAN Peak</span>
  </div>
</div>
```

---

## 3. High-Density Data Tables

Admin tables must prioritize rapid scanning and keyboard efficiency:

### Table Rules
- **Header:** Sticky `top-0 bg-[#242528] border-b border-white/[0.08]`, `text-[11px] font-semibold uppercase tracking-wider text-[#8f9296]`.
- **Rows:** `h-14 border-b border-white/[0.04] hover:bg-[#27282c] transition-colors`.
- **Numbers & Timestamps:** Always use `font-mono tabular-nums` for timestamps, IPs, byte counts, and IDs to prevent horizontal jitter.
- **Status Badges:** Muted pills with high contrast text (e.g. Green: `bg-emerald-500/10 text-emerald-400 border-emerald-500/20`, Amber: `bg-amber-500/10 text-amber-400 border-amber-500/20`).

---

## 4. Device Fleet Management Components

Copynsync connects devices across heterogeneous operating systems:

### Device Row / Card Recipe
Each device tile must display:
1. **OS Icon:** Apple (`FaApple`), Windows (`FaWindows`), Linux (`FaLinux`), or Android (`FaAndroid`).
2. **Device Hostname:** `text-sm font-medium text-white` (e.g., `macbook-pro-m3.local`).
3. **Connection Type:**
   - `Local P2P (Direct Wi-Fi / LAN)`: Primary zero-latency connection.
   - `Relay Fallback`: Encrypted relay fallback when direct subnet traversal is blocked.
4. **Active Sync Capabilities:** Small toggles or indicator icons for Clipboard, Files, Mouse/Keyboard, Notifications.
5. **Quick Action:** Disconnect, Re-pair, or View Sync Logs.

---

## 5. Cohort Application Management (Beta Waitlist)

For managing waitlist applicants:
- **Filter Row:** Platform filter chips (All, Android, macOS, Windows, Linux) + WhatsApp opted-in toggle filter.
- **Batch Actions:** "Approve Selected for TestFlight / APK", "Export CSV", "Send Onboarding Email".
- **Detail Flyout Drawer:** Uses the zero-jank slide-over pattern from the right side of the screen (`fixed right-0 top-0 h-full w-[440px] bg-[#242528] border-l border-white/[0.08] p-6 shadow-2xl`).
