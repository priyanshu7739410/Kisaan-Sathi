# Kisan Sathi Design Reference Catalog (React Web)

This catalog outlines the layout, interaction references, and web animation implementation details for every primary web route/view in the Kisan Sathi platform.

---

## 1. Views & Routes Directory

### Splash / Landing Page (`/`)
*   **Design Reference:** Minimalist folk-art logo centered with a warm background.
*   **Interaction Reference:** Auto-fade and scale on mount.
*   **Web Implementation:** Motion `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` entrance.
*   **Performance Constraint:** Optimize SVG asset size for instantaneous loading.

### Language Selection (`/select-language`)
*   **Design Reference:** Flat card grid with flag illustrations.
*   **Interaction Reference:** Staggered card entrance on load.
*   **Web Implementation:** Staggered delays using Motion or React Bits text/card triggers.

### Onboarding Setup (`/onboard`)
*   **Design Reference:** Wizard form stepper with warm beige backgrounds.
*   **Interaction Reference:** Left-to-right slide transitions between steps.
*   **Web Implementation:** Motion `AnimatePresence` managing step switches.

### Home Dashboard (`/dashboard`)
*   **Design Reference:** Modular agricultural cards (weather threat banner on top, today's tasks).
*   **Interaction Reference:** Expanding task details, progress circle fills.
*   **Web Implementation:** Motion layout morphing for expanding cards; React Bits/CSS for progress transitions.

### Farm Overview (`/farm`)
*   **Design Reference:** Map view boundary overlay + crop status summary cards.
*   **Interaction Reference:** Click-to-zoom boundary, card pop.
*   **Web Implementation:** `MapLibre GL JS` polygon overlays with HTML/SVG markers animated via Motion.

### Crop Detail (`/crops/:id`)
*   **Design Reference:** Multi-tab layout (Stage, Soil, Activity history).
*   **Interaction Reference:** Smooth tab switching.
*   **Web Implementation:** Simple React state controlling visible tabs, transitioned via Motion.

### Crop Timeline (`/crops/:id/timeline`)
*   **Design Reference:** Vertical timeline with hand-drawn node icons.
*   **Interaction Reference:** Scroll reveals upcoming stages.
*   **Web Implementation:** Motion scroll-triggered animations or Anime.js timeline triggers.

### Weather Intelligence (`/weather`)
*   **Design Reference:** Temperature line chart and rain forecast icons.
*   **Interaction Reference:** Tooltip on hovering chart.
*   **Web Implementation:** Recharts (SVG based) charts with custom tooltips.

### Profitable Crops (`/profitable-crops`)
*   **Design Reference:** Sorted card lists comparing yield profitability metrics.
*   **Interaction Reference:** Filter chip toggles.
*   **Web Implementation:** Motion layout animation for reordering lists dynamically.

### Learning Modules (`/learn`)
*   **Design Reference:** Video playback cards + text guidelines.
*   **Interaction Reference:** Tap to expand text description cards (progressive disclosure).
*   **Web Implementation:** Motion `layout` property for smooth height adjustments on expand.

### Photo AI Diagnosis (`/diagnose`)
*   **Design Reference:** File upload dropzone or live camera feed dialog.
*   **Interaction Reference:** Upload progress bar.
*   **Web Implementation:** HTML5 Drag & Drop API / `<input type="file" accept="image/*" capture="environment">`.

### AI Chatbot (`/chat`)
*   **Design Reference:** Chat thread list rendering inline widgets.
*   **Interaction Reference:** Dynamic message bubbles sliding up.
*   **Web Implementation:** React rendering list items with Motion transitions.

### News & Schemes (`/news`)
*   **Design Reference:** Card feed matching crop tags.
*   **Interaction Reference:** Staggered list fade-in.
*   **Web Implementation:** Motion staggered container children transitions.

### Market Prices (`/market-prices`)
*   **Design Reference:** Mandi price listings comparison charts.
*   **Interaction Reference:** Price history scrubber tooltip.
*   **Web Implementation:** Recharts line charts.

### Notifications (`/notifications`)
*   **Design Reference:** Simple task warning triggers list.
*   **Interaction Reference:** Hover highlight and dismiss actions.
*   **Web Implementation:** CSS/Motion hover and exit transitions.

### Settings / Profile (`/settings`)
*   **Design Reference:** Form lists with switch toggles.
*   **Interaction Reference:** Toggle switch translation.
*   **Web Implementation:** CSS transitions for slider states.
