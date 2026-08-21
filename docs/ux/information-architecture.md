# Kisan Sathi Information Architecture (Web Platform)

This document describes the application navigation structure and content hierarchy designed for responsive web usage.

## 1. Global Navigation (Responsive Layout)
To maximize usability for Persona A (Small Farmer) and Persona B (Medium Farmer) across desktop, tablet, and mobile browsers, the application uses a responsive navigation shell:
*   **Desktop & Tablet Navigation:** A persistent top header bar with direct links, falling back to a collapsible left sidebar for dashboard routes.
*   **Mobile Web Navigation:** A persistent top bar with a hamburger menu that toggles an overlay navigation drawer or a clean bottom-docked navigation bar for quick access.

### Primary Nav Destinations
1.  **Home (`/dashboard`):** Farmer Intelligence Dashboard. Contains Today's Tasks, Weather Alerts, and the Critical Warning widget.
2.  **Farm Tracker (`/tracker`):** Smart Farm Calendar. Handles the Dynamic Lifecycle Timeline, logging actions, and history logs.
3.  **Photo AI (`/diagnose`):** Diagnostics portal. Enables crop photo upload, crop confirmation validation, and diagnostic citation cards.
4.  **AI Chat (`/chat`):** Conversational Assistant. Text/Voice chat with RAG search tools.

---

## 2. Information Hierarchy per View

### Home Dashboard (`/dashboard`)
1.  **Top Status Header:** Dynamic village name, current weather icon, and temperature.
2.  **Stale Data Warning Banner (Conditional):** Prominent yellow alert if weather/mandi data was cached > 24 hours ago.
3.  **Today's Focus Callout:** Single primary action recommendation (e.g., *"Rain forecast tonight. Postpone irrigation"*).
4.  **Critical Emergency Alerts:** Alert banner area for severe weather (frost, storm) or pest breakouts.
5.  **Farm Summary Grid:** Active crops, growth stage indicators, and quick log action buttons.

### Farm Tracker (`/tracker`)
1.  **Crop Switcher Select:** Top select dropdown or tab row to toggle between registered farms/crops.
2.  **Lifecycle Progress Indicator:** Responsive graphical timeline showing Growth Stages (Sowing → Vegetative → Flowering → Harvest).
3.  **Dynamic Task List:** Lists completed, scheduled, and overdue actions.
4.  **Action Logs History:** Collapsible history logs (irrigation dates, fertilizer details).

### Photo AI / Diagnose (`/diagnose`)
1.  **Dropzone / File Selector Area:** Drag-and-drop file upload container with mobile-web camera triggers (`capture="environment"`).
2.  **Crop Selection Validation Overlay:** Intercepts analysis to confirm identified crop before running disease check.
3.  **Diagnostic Results Card:** 
    *   Crop + Disease name.
    *   Confidence percentage & severity rating.
    *   Verbatim official chemical control citation cards (ICAR).
    *   "Escalate to Expert" button (appears if confidence < 75%).

### AI Chat (`/chat`)
1.  **Conversation Frame:** Scrollable message window (User messages in green, AI answers in beige).
2.  **Inline Responsive Widgets:** Custom widgets rendered inside the chat flow based on tool returns:
    *   `InlineWeatherWidget`: Displays dynamic temperatures, rain forecasts, and spraying alerts.
    *   `InlineMandiPriceWidget`: Displays a mini line chart showing historical mandi commodity prices.
    *   `InlineTaskSummaryCard`: Shows dynamic action items directly inside the conversation thread.
3.  **Input Bar:** Text input area, send button, and a prominent Microphone button for regional voice inputs.
4.  **Source Citations:** Dropdown links under AI messages showing publication metadata.
