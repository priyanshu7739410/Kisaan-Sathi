# Kisan Sathi UI Quality Checklist

This checklist defines the design, typography, performance, and accessibility standards that every screen in the Kisan Sathi mobile app must satisfy before being marked as verified.

---

## 1. Accessibility & Visual Standards
*   [ ] **Sunlight Readability Contrast:** Check that all text and active icon outlines meet the strict minimum **7:1 contrast ratio** against backgrounds.
*   [ ] **Touch Targets:** Verify that every touchable button, chip, tab, and toggle has a minimum touch target size of **48dp × 48dp**.
*   [ ] **Indian Language Rendering:** Verify that regional text scripts (Hindi, Marathi, etc.) do not get truncated or wrap awkwardly.
*   [ ] **Long Text Handling:** Ensure that long village names or commodity grades wrap dynamically or use ellipsis without breaking card layouts.
*   [ ] **Large Text Support:** Test screens with native system font size scaling enabled; check that layouts adapt dynamically.

---

## 2. States & Failures
*   [ ] **Loading States:** Every data-fetching card/list must display a skeleton layout loader (`SkeletonPlaceholder`) rather than a blank screen.
*   [ ] **Empty States:** When no logs, tasks, or prices are present, show a custom hand-drawn outline empty illustration card with a clear call-to-action button.
*   [ ] **Error States:** Display recovery buttons (*"Try Again"*) for failed API fetches.
*   [ ] **Offline States:** Verify that offline banners indicate cached actions, showing queue status indicators for pending uploads.

---

## 3. Motion & Performance
*   [ ] **Native Thread execution:** Confirm all animations run on the Reanimated UI-thread (no JS-thread animation logs).
*   [ ] **Reduced Motion Check:** Verify that enabling the system's "Reduce Motion" setting immediately drops duration values to `0` and bypasses parallax/timing transitions.
*   [ ] **Low-End Android Check:** Test rendering scroll performance on low-spec target devices; verify interaction framerates remain near 60 FPS.
