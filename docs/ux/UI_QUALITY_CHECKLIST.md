# Kisan Sathi Web UI Quality Checklist

This checklist defines the design, typography, performance, and accessibility standards that every page and component on the Kisan Sathi Web Platform must satisfy.

---

## 1. Accessibility & WCAG 2.1 Standards
*   [ ] **Sunlight Readability Contrast:** Check that all text and active icon outlines meet the strict minimum **7:1 contrast ratio** against backgrounds.
*   [ ] **Click Targets:** Verify that every clickable button, link, tab, and switch has a minimum clickable target area of **48px × 48px**.
*   [ ] **Keyboard Navigation:** Confirm all interactive elements are reachable via `Tab` and show a distinct, high-contrast focus outline (`border: 2px solid #2D2926`).
*   [ ] **Screen Readers:** Check that all SVGs, hand-drawn sketches, and buttons contain appropriate descriptive `aria-label` or `alt` tags.
*   [ ] **Indian Language Rendering:** Verify that regional scripts (Hindi, Marathi) do not get truncated or wrap awkwardly at any viewport width.

---

## 2. Layout States & Responsiveness
*   [ ] **Responsive Viewport Breakpoints:** Test views at Desktop (1200px+), Tablet (768px-1024px), and Mobile Web (360px-480px) viewports; verify no layout breakage.
*   [ ] **Cumulative Layout Shift (CLS):** Ensure pages do not experience sudden layout shifts during image load or RAG data fetching.
*   [ ] **Loading Skeletons:** Every data-fetching card/list must display a skeleton layout loader card during execution rather than a blank page.
*   [ ] **Offline Fallbacks:** Verify that the offline banner appears when connection is lost, detailing local caching states and retry options.
*   [ ] **Empty States:** When lists are empty, display a custom outline empty illustration with a clear call-to-action button.

---

## 3. Motion & Performance
*   [ ] **GPU Acceleration:** Verify animations utilize CSS/Motion properties that trigger GPU acceleration (`transform`, `opacity`).
*   [ ] **Reduced Motion Check:** Verify that `@media (prefers-reduced-motion: reduce)` immediately disables all layout transitions and timing animations.
*   [ ] **Low-End Mobile Web Check:** Test scroll performance on low-spec smartphone browsers; ensure no lag or frame drops.
