---
name: copynsync-web-app-standards
description: >-
  Touch behavior, mobile viewport pinning, safe area handling, accessibility (a11y),
  and native web app feel standards for Copynsync web apps and the admin dashboard.
  Enforces global unselectable text rules with editable input exceptions.
---

# Copynsync Web App Standards

This skill establishes the behavioral rules that make Copynsync web interfaces feel like native desktop and mobile applications rather than typical websites.

---

## 1. Global Touch & Text Selection Rules

To achieve a true native app feel, the browser must not act like a static text document:

### Base CSS Configuration (`globals.css`)
```css
html,
body {
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
  touch-action: pan-x pan-y;
  background-color: #181819;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;

  /* Native Web App Feel: Globally disable text selection and callouts */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

/* Prevent image / asset ghost dragging */
img,
svg,
a,
button {
  -webkit-user-drag: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

/* Form inputs MUST allow editing, text selection, and native cursor interactions */
input,
textarea,
[contenteditable="true"] {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  -webkit-touch-callout: default;
}
```

### The Input Exception Rule
While all headers, cards, badges, and labels have `user-select: none;` (`select-none`), any editable control (`<input>`, `<textarea>`, code blocks) must explicitly have:
```tsx
className="... select-text"
```
This ensures users can place their cursor, backspace, and copy/paste text inside inputs without impediment.

---

## 2. Viewport Pinning (`100dvh`) & Scroll Isolation

To prevent the mobile browser address bar from jumping up and down during scrolling:
1. **Main Stage Pinning:** Pin `<main>` to `fixed inset-0 h-[100dvh] max-h-[100dvh] overflow-hidden`.
2. **Internal Scroll Container:** Place a dedicated internal scrollable container inside `<main>`:
   ```tsx
   <div
     className="h-[100dvh] w-full overflow-y-auto overflow-x-hidden"
     style={{ WebkitOverflowScrolling: "touch" }}>
     {/* Page Sections */}
   </div>
   ```
3. **Pinch-Zoom Prevention:** In root layout/pages, prevent multi-touch gesture zoom from breaking the dashboard layout:
   ```tsx
   useEffect(() => {
     const preventZoom = (e: Event) => e.preventDefault();
     document.addEventListener("gesturestart", preventZoom);
     document.addEventListener("gesturechange", preventZoom);
     document.addEventListener("gestureend", preventZoom);
     return () => {
       document.removeEventListener("gesturestart", preventZoom);
       document.removeEventListener("gesturechange", preventZoom);
       document.removeEventListener("gestureend", preventZoom);
     };
   }, []);
   ```

---

## 3. Accessibility & Keyboard Navigation (a11y)

1. **Custom Switch Controls:**
   Always provide `role="switch"`, `aria-checked={checked}`, and keyboard listeners for `Space` and `Enter`:
   ```tsx
   <div
     role="switch"
     tabIndex={0}
     aria-checked={isOn}
     onKeyDown={(e) => {
       if (e.key === "Enter" || e.key === " ") {
         e.preventDefault();
         toggle();
       }
     }}>
   ```
2. **Dialogs & Modals:**
   - Must listen to the `Escape` key to dismiss.
   - Must lock background scrolling while open (`document.body.style.overflow = "hidden"`).
   - Close buttons must have an explicit `aria-label="Close dialog"`.
3. **High-Contrast Text Standards:**
   - Avoid dark-gray-on-dark-gray text. Primary body copy should use `#d4d7dc` (passes WCAG AAA on `#181819`), while secondary captions use `#8f9296` (passes WCAG AA).
