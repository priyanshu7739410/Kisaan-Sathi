# Kisan Sathi UI Library & Animation Evaluation (React Web)

This document evaluates the compatibility and usage of modern frontend design, animation, and visualization libraries for the Kisan Sathi Web Platform.

---

## 1. Library Compatibility Matrix

| Library | Platform | React Web Compatible? | Decision |
| :--- | :--- | :--- | :--- |
| **React Bits** | Web-only | **Yes.** Runs perfectly on browser Canvas and CSS rendering. | **APPROVED.** Use for polished interactive components and UI layout patterns. |
| **Anime.js** | Web/JS | **Yes.** Highly efficient DOM animation engine. | **APPROVED.** Use for advanced timeline animations and complex visual storytelling sequences. |
| **Motion** (Framer) | Web-only | **Yes.** Primary animation library for React web apps. | **APPROVED.** Use for page/layout transitions and gesture feedback. |
| **Bklit** | Web-only | **Yes.** Creative web layouts and styling components. | **APPROVED.** Use selectively where compatible with the chosen React web structure. |

---

## 2. Web Implementation Strategy

### A. React Bits
*   **Purpose:** Reusable, modern web building blocks, canvas effects, text transitions, and interactive grids.
*   **Accessibility:** Ensure text revails have appropriate ARIA labels and do not violate minimum contrast ratios.

### B. Motion (Framer Motion)
*   **Purpose:** Page entrance/exit animations, modal slide-ins, drawer transitions, and responsive layout shifts.
*   **Example Usage:**
    ```tsx
    import { motion } from 'framer-motion';
    
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    />
    ```

### C. Anime.js
*   **Purpose:** Complex, multi-element choreographies, SVG morphing, data-visualizations, and custom timeline-based storytelling animations.
*   **Rule:** Use strictly for visualization contexts. Avoid using it for simple interactive components where CSS transitions or Motion suffice.

### D. Bklit
*   **Purpose:** Layout inspiration and creative elements.
*   **Rule:** Integrate only components that are compatible with React, Tailwind CSS, and TypeScript. Do not include files that depend on incompatible rendering engines.

---

## 3. Accessibility & Performance Guidelines

To support low-end mobile browsers and low-spec user devices:
*   **Reduced Motion:** Standard media query `@media (prefers-reduced-motion: reduce)` must be respected. When active, all CSS, Motion, and Anime.js transitions must bypass durations or fall back to static displays immediately.
*   **GPU Acceleration:** Prefer hardware-accelerated properties (`transform: translate3d/scale`, `opacity`) for smooth rendering on cheap processors.
*   **Sunlight Contrast:** Enforce a minimum 4.5:1 (target 7:1) contrast ratio across all dynamic and animated UI states.
