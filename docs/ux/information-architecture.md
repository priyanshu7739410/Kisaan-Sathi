# Kisan Sathi Information Architecture

This document describes the application navigation structure and content hierarchy designed for mobile-first usage.

## 1. Global Navigation Bar (React Native Tab Navigation)
To maximize discoverability for Persona A (Small Farmer) and Persona B (Medium Farmer), we propose a flat bottom-tab navigation bar with 4 primary targets:

| Tab | Icon | Description | Core MVP Feature |
| :--- | :--- | :--- | :--- |
| **Home** | `home` | Farmer Intelligence Dashboard | Today's Tasks, Weather Alert, Critical Warning widget |
| **Farm Tracker**| `calendar` | Smart Farm Calendar | Dynamic Lifecycle Timeline, Log actions, History logs |
| **Photo AI** | `camera` | Diagnostics portal | Upload crop photo, crop confirmation validation, diagnostic citation card |
| **AI Chat** | `chatbubble` | Conversational Assistant | Text/Voice chat with RAG search tools |

---

## 2. Information Hierarchy per Tab

### Tab 1: Home Dashboard
1.  **Top Status Bar:** Dynamic village name, current weather icon, and temperature.
2.  **Stale Data Warning Widget (Conditional):** Prominent yellow alert if weather/mandi data was cached > 24 hours ago.
3.  **Today's Focus Widget:** Single primary action recommendation (e.g., *"Rain forecast tonight. Postpone irrigation"*).
4.  **Critical Emergency Alerts:** Flash banners for severe weather (frost, storm) or pest breakouts.
5.  **Farm Summary Card:** Active crops, current growth stage indicator, and quick log shortcuts.

### Tab 2: Farm Tracker (Calendar)
1.  **Crop Switcher:** Top horizontal list to toggle between multiple registered farms/crops.
2.  **Lifecycle Progress Indicator:** Graphical timeline showing Growth Stages (e.g., Sowing -> Vegetative -> Flowering -> Harvest).
3.  **Dynamic Task List:** Lists completed, scheduled, and overdue actions.
4.  **Action Logs History:** Expandable list of logged actions (irrigation dates, fertilizer bags).

### Tab 3: Photo AI
1.  **Camera Viewfinder Screen:** Custom camera layout with guidance overlays (e.g., *"Place leaf inside target box"*).
2.  **Crop Selection Validation Overlay:** Intercepts analysis to confirm identified crop before running disease check.
3.  **Diagnostic Results Page:** 
    *   Crop + Disease name (Top).
    *   Confidence percentage & severity rating.
    *   Verbatim official chemical control citation cards (ICAR).
    *   "Escalate to Expert" button (appears if confidence < 75%).

### Tab 4: AI Chat
1.  **Conversation Frame:** A scrollable, heterogeneous list of message items (Green for user text, Beige for AI text).
2.  **Inline Rich UI Widgets:** The list dynamically renders custom widgets in the chat flow based on tool results:
    *   `InlineWeatherWidget`: Displays dynamic temperatures, rain forecasts, and spraying alerts.
    *   `InlineMandiPriceWidget`: Displays a mini line chart showing historical mandi commodity prices.
    *   `InlineTaskSummaryCard`: Shows dynamic action items (e.g. *"Log Fertilizer X"*) directly inside the conversation thread.
3.  **Input Row:** Text input box, send button, and a prominent Microphone button for regional voice inputs.
4.  **Source Citations:** Dropdown links under AI messages showing the publication date and official document source for advice.
