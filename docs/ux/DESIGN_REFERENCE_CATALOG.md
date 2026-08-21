# Kisan Sathi Design Reference Catalog

This catalog outlines the layout, interaction reference, and native animation implementation details for every primary mobile screen in the Kisan Sathi platform.

---

## 1. Screens Directory

### Splash Screen
*   **Design Reference:** Minimalist folk-art logo centered.
*   **Interaction Reference:** Auto-fade and scale.
*   **Native Implementation:** Reanimated `Opacity` sweep on app start.
*   **Performance Constraint:** Fast load time, bypass animation if cold start delay is high.

### Language Selection
*   **Design Reference:** Flat card grid with flag illustrations.
*   **Interaction Reference:** Staggered card entrance on load.
*   **Native Implementation:** Staggered translation using `MotiView` with delay.
*   **Performance Constraint:** High responsiveness to touch inputs.

### Onboarding Setup
*   **Design Reference:** Wizard form stepper with warm beige backgrounds.
*   **Interaction Reference:** Left-to-right slide transitions between steps.
*   **Native Implementation:** FlatList with horizontal scrolling and pagination indicators.
*   **Performance Constraint:** Keep inputs simple; lazy-load heavy pages.

### Home Dashboard
*   **Design Reference:** Modular agricultural cards (weather threat banner on top, today's tasks).
*   **Interaction Reference:** Expanding task details, progress circle fills.
*   **Native Implementation:** Reanimated circular layout animation for progress indices.
*   **Performance Constraint:** Zero JS-thread operations during scroll.

### Farm Overview
*   **Design Reference:** Map view boundary overlay + crop status summary cards.
*   **Interaction Reference:** Double-tap zoom boundary, card pop.
*   **Native Implementation:** `MapLibre` polygon overlays with Reanimated status bubbles.
*   **Performance Constraint:** Render coordinates asynchronously to avoid blank screen states.

### Crop Detail
*   **Design Reference:** Multi-tab layout (Stage, Soil, Activity history).
*   **Interaction Reference:** Smooth horizontal tabs page swipe.
*   **Native Implementation:** React Navigation tabs with layout interpolation.
*   **Performance Constraint:** Keep history entries paginated.

### Crop Timeline
*   **Design Reference:** Vertical timeline with hand-drawn node icons.
*   **Interaction Reference:** Vertical scroll reveals upcoming stages.
*   **Native Implementation:** Customized FlatList with SVG line connectors.
*   **Performance Constraint:** Lightweight SVG rendering.

### Weather Intelligence
*   **Design Reference:** Temperature line chart and rain forecast icons.
*   **Interaction Reference:** Tooltip on scrubbing chart.
*   **Native Implementation:** Victory Native XL charts with interactive tooltip overlays.
*   **Performance Constraint:** Cache OpenWeather API data locally.

### Profitable Crops
*   **Design Reference:** Sorted card lists comparing yield profitability metrics.
*   **Interaction Reference:** Filter chip toggle filters lists.
*   **Native Implementation:** Moti layout animations on FlatList item filter changes.
*   **Performance Constraint:** Limit calculations to backend; frontend parses static payloads.

### Learning Modules
*   **Design Reference:** Compact video playback cards + text guidelines.
*   **Interaction Reference:** Tap to expand text description cards (progressive disclosure).
*   **Native Implementation:** Layout transition on card expand.
*   **Performance Constraint:** Compress video files and load indicators.

### Photo AI Diagnosis
*   **Design Reference:** Finder overlay camera layout.
*   **Interaction Reference:** Target box guides.
*   **Native Implementation:** `Expo Camera` overlay rendering custom SVG shapes.
*   **Performance Constraint:** Compress uploaded photos to <500KB.

### AI Chatbot
*   **Design Reference:** Chat thread list rendering inline widgets.
*   **Interaction Reference:** Dynamic message bubbles.
*   **Native Implementation:** FlatList rendering custom React widgets (Weather, prices).
*   **Performance Constraint:** Lazy-load older message indices.

### News & Schemes
*   **Design Reference:** Card feed matching crop tags.
*   **Interaction Reference:** Staggered list fade-in.
*   **Native Implementation:** Reanimated timing list entry.
*   **Performance Constraint:** Offline caching of baseline schemes.

### Market Prices
*   **Design Reference:** Mandi price listings comparison charts.
*   **Interaction Reference:** Price history scrubber.
*   **Native Implementation:** Victory Native XL line charts.
*   **Performance Constraint:** Paginate price listing cards.

### Notifications
*   **Design Reference:** Simple task warning triggers list.
*   **Interaction Reference:** Swipe-to-dismiss actions.
*   **Native Implementation:** Swipeable items using Reanimated gestures.
*   **Performance Constraint:** Runs entirely on native UI thread.

### Settings / Profile
*   **Design Reference:** Form lists with switch toggles.
*   **Interaction Reference:** Toggle switch transition.
*   **Native Implementation:** Native switches with spring animations.
*   **Performance Constraint:** Low battery usage constraint.
