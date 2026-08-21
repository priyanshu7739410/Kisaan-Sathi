# Kisan Sathi UI Library & Animation Evaluation

This document evaluates the compatibility of the requested design libraries with React Native + Expo, locking our animation and charting implementation plans.

---

## 1. Library Compatibility Matrix

| Library | Platform | React Native / Expo Compatible? | Decision |
| :--- | :--- | :--- | :--- |
| **React Bits** | Web-only | **No.** Relies on Tailwind CSS, Framer Motion, and browser canvas APIs. | **REJECTED.** Recreate specific visual interactions natively. |
| **Anime.js** | Web/JS | **No.** Runs animations on the JS thread, causing lag on low-end Android. | **REJECTED.** Use React Native Reanimated for native thread animations. |
| **Motion** | Web-only | **No.** Framer Motion targets browser HTML/SVG elements. | **REJECTED.** Replaced with **Moti** (a native-compatible declarative wrapper). |
| **Bklit** | Web-only | **No.** Tailwind/browser template layouts. | **REJECTED.** Use strictly as a visual design reference. |

---

## 2. Recreating Web Animations Natively

### A. React Bits Adaptations
*   **Staggered Lists / Cards:** Recreated using React Native Reanimated's `stagger` sequences or native flatlist layout animations.
*   **Animated Text Reveal:** Recreated using opacity/translate animation loops running on the native UI thread.
*   **Backgrounds / Particles:** Exclude heavy WebGL canvas scripts. Use simple, flat SVG icons with low opacity for decorative agricultural patterns.

### B. Motion Adaptations
*   We use **Moti** for declarative animations:
    ```tsx
    import { View } from 'moti';
    
    <View
      from={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 300 }}
    />
    ```

### C. Anime.js Sequencing Adaptations
*   All sequencing, stagger, and spring timelines are implemented using Reanimated's `withSequence` and `withDelay` APIs running directly on the native thread.

### D. Bklit Charts Adaptations
*   Bklit web chart modules are replaced with **Victory Native XL** or custom paths rendered via `react-native-svg`.

---

## 3. Primary Animation Engine: React Native Reanimated & Moti
*   **Primary Engine:** `react-native-reanimated` (runs animations on the UI thread at 60 FPS).
*   **Declarative Wrapper:** `moti` (enables Framer Motion-style properties for layout states).
*   **Constraint:** No JS-thread animation loops are allowed in P0 to prevent CPU throttling on low-end Android.

---

## 4. Accessibility & Reduced Motion
To support users with motion sensitivity or low-spec devices, all animations must verify the device motion setting:
*   Use `useReducedMotion()` from Reanimated.
*   If `reducedMotion` is true, immediately bypass timing animations (duration set to `0`) and disable layout transitions.
