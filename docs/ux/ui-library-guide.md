# Kisan Sathi UI, Animation & Visualization Guide

This document details the evaluation, compatibility analysis, and guidelines for integrating UI, animation, and visualization libraries in the Kisan Sathi mobile application.

---

## 1. Compatibility Matrix

Kisan Sathi is primarily built on **React Native + Expo**. We cannot run Web-specific DOM components without causing crashes or severe performance degradation on low-end Android devices.

| Tool | Core Purpose | React Web | React Native | Expo | License | Recommended for Kisan Sathi? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **React Bits** | Visual UI Effects | Yes | **No** | **No** | MIT | **No (Web Only)**. Recreate effects in native styles. |
| **Anime.js** | Complex Timelines | Yes | **No** | **No** | MIT | **No (Web/DOM focused)**. Use `react-native-reanimated`. |
| **Motion** | Gestures & Layouts | Yes | **Yes** | **Yes** | MIT | **Yes (via Moti)**. Use `Moti` (Reanimated-backed) on mobile. |
| **Bklit** | Chart Visualizations | Yes | **No** | **No** | Custom/MIT | **No (Web/DOM focused)**. Use `react-native-gifted-charts`. |

---

## 2. Library Ownership & Responsibility Model

To avoid bloated bundles and runtime conflicts, we define a strict responsibility boundary for animations and UI:

```
               KISAN SATHI APPLICATION SCREEN
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│     UI Transitions    │         │  Data Visualizations  │
│    (Moti / Reanimated)│         │ (Gifted Charts / SVG) │
└───────────┬───────────┘         └───────────┬───────────┘
            │                                 │
            ▼                                 ▼
   Entrance / exit lists             Market price trends
   Modal & bottom sheets             Crop yield charts
   Card hover feedback               Farm economics bars
```

1.  **Moti (backed by React Native Reanimated):**
    *   *Usage:* Layout transitions, modal/bottom sheet entrances, list animations, and micro-interactions.
2.  **React Native Gifted Charts (or Native SVG):**
    *   *Usage:* Mandi price trends, crop yield charts, and farm economics.
3.  **React Native Animated API:**
    *   *Usage:* Simple, performance-critical layout fades.

---

## 3. Semantic Animation Tokens

We define standard tokens for transition durations and easing behaviors to ensure a consistent experience across all app screens:

### Duration Tokens
*   `animation.fast` = `150ms` (Use for micro-interactions, button presses, checkmarks).
*   `animation.normal` = `300ms` (Use for card entrances, small layout morphs).
*   `animation.slow` = `500ms` (Use for full screen transitions, bottom sheets).

### Easing Tokens
*   `easing.standard` = `Easing.bezier(0.4, 0.0, 0.2, 1)` (Standard moving element).
*   `easing.decelerate` = `Easing.out(Easing.ease)` (Entering elements).
*   `easing.accelerate` = `Easing.in(Easing.ease)` (Exiting elements).

---

## 4. UX & Performance Guidelines for Rural India

### A. Accessibility in Bright Sunlight
*   Do not use low-contrast animations or transparent text fades.
*   Interactive components must remain static or have solid visual boundaries under direct sunlight.

### B. Low-End Android Performance
*   **Zero Canvas Blurs:** Avoid heavy blur effects (`BlurView`) on low-end Android chips.
*   **Direct UI Thread execution:** All Reanimated animations must run on the **UI thread** (`worklet` functions) rather than the JS thread.
*   **Reduced Motion:** Respect platform reduced motion settings using `AccessibilityInfo.isReduceMotionEnabled()`. If true, bypass all layout animations and use instant state changes.
