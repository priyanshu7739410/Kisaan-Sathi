# Kisan Sathi UI, Animation & Visualization Guide (React Web)

This document details the rules, design parameters, and guidelines for integrating React Bits, Motion, Anime.js, and Bklit on the Kisan Sathi Web Platform.

---

## 1. Compatibility & Toolkit Matrix

The approved web stack runs natively in all modern mobile and desktop browsers. The animation responsibilities are divided based on complexity and rendering requirements:

| Tool | Core Purpose | Rendering Layer | License | Usage Guidelines |
| :--- | :--- | :--- | :--- | :--- |
| **React Bits** | Visual UI Effects | React / CSS | MIT | Use for staggered lists, text effects, and interactive grid modules. |
| **Motion** | Transitions & Gestures | React / SVG / DOM | MIT | Use for page transitions, modals, dropdowns, and button state transitions. |
| **Anime.js** | Choreographed Timelines | Canvas / DOM / SVG | MIT | Use for advanced charts, SVGs, tutorials, and storytelling animations. |
| **Bklit** | Design/Creative Elements | DOM / CSS | Custom/MIT | Use selectively as styling components or layouts where fully compatible. |

---

## 2. Library Responsibility & Ownership Model

To maintain clean frontend bundles, we define strict usage boundaries:

```
               KISAN SATHI APPLICATION PAGES
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
 ┌──────────────────────┐         ┌───────────────────────┐
 │    UI Transitions    │         │  Data Visualizations  │
 │   (Motion / CSS)     │         │  (Anime.js / Recharts)│
 └──────────┬───────────┘         └───────────┬───────────┘
            │                                 │
            ▼                                 ▼
   Page / route navigation           Mandi price graphs
   Collapsible menus                 Crop yield trackers
   Input field focus                 Farm weather projections
```

1.  **Motion (Framer Motion):**
    *   *Usage:* Layout morphs, sidebar menus, onboarding wizard transitions, and interactive gesture feedback.
2.  **Anime.js & Recharts (SVG based):**
    *   *Usage:* Crop health charts, regional mandi pricing metrics, and animated crop cycles.
3.  **Vanilla CSS Transitions:**
    *   *Usage:* Hover animations, primary focus borders, and basic timing transitions.

---

## 3. Semantic Animation Tokens

We define standard tokens for transition durations and easing behaviors to ensure a consistent experience across all app views:

### Duration Tokens
*   `animation.fast` = `150ms` (Micro-interactions, button clicks, checkmarks).
*   `animation.normal` = `300ms` (Card loading states, small layout expansions).
*   `animation.slow` = `500ms` (Page transitions, dropdown panels, drawers).

### Easing Tokens
*   `easing.standard` = `cubic-bezier(0.4, 0.0, 0.2, 1)` (General movement).
*   `easing.decelerate` = `cubic-bezier(0.0, 0.0, 0.2, 1)` (Entering elements).
*   `easing.accelerate` = `cubic-bezier(0.4, 0.0, 1, 1)` (Exiting elements).

---

## 4. UX & Performance Guidelines for Rural India

### A. Accessibility in Bright Sunlight
*   Do not use low-contrast text transitions.
*   Hover/Active states must retain solid, thick outline indicators (`border: 2px solid #2D2926`) so they are visible under strong ambient glare.

### B. Device Performance Limits
*   **No WebGL blurs:** Avoid heavy CSS blur filters (`backdrop-filter: blur()`) as they drag down framerates on cheap mobile processors.
*   **Reduced Motion:** Respect the `@media (prefers-reduced-motion: reduce)` system setting. Bypass all transition timers and use instant state swaps if active.
