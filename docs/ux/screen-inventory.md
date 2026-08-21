# Kisan Sathi Web View & Route Inventory

A complete checklist of web pages, routes, dialogs, overlays, and system states for the Kisan Sathi Web MVP.

## 1. Onboarding Module
*   `VW-ONB-001: Language Selection View` (Route: `/select-language` — large tiles for Hindi, Marathi, English)
*   `VW-ONB-002: Phone Input View` (Route: `/login` — minimalist input form)
*   `VW-ONB-003: OTP Verification View` (Route: `/login/verify` — OTP token input)
*   `VW-ONB-004: Land Photo Upload View` (Route: `/onboard/photo` — file selector/dropzone with GPS status check)
*   `VW-ONB-005: Farm Details View` (Route: `/onboard/details` — form with village, acreage, and water source select)
*   `VW-ONB-006: Soil Type Confirmation Overlay` (Presents detected soil type with options to confirm or change)
*   `VW-ONB-007: Active Crop Selector` (Route: `/onboard/crops` — grid cards to choose Cotton, Wheat, Rice, Okra)

## 2. Home Dashboard Module
*   `VW-HOM-001: Main Dashboard View` (Route: `/dashboard` — standard grid state)
*   `VW-HOM-002: Alerts Dialog / Drawer` (Responsive modal displaying weather or pest emergency details)
*   `VW-HOM-003: Offline Status Banner` (Embedded header banner overlay when network connection is lost)

## 3. Crop Tracker Module
*   `VW-TRK-001: Smart Calendar View` (Route: `/tracker` — interactive lifecycle line and task blocks)
*   `VW-TRK-002: Log Activity Dialog` (Responsive overlay containing activity details form)
*   `VW-TRK-003: Log History Drawer` (Collapsible slide-out panel detailing past fertilizer/irrigation records)

## 4. Photo AI Module
*   `VW-PHO-001: Diagnose Upload View` (Route: `/diagnose` — file dropzone supporting capture input)
*   `VW-PHO-002: Crop Validation View` (Confirms crop identification, editable dropdown select)
*   `VW-PHO-003: Diagnostic Report View` (Route: `/diagnose/report` — display with severity, RAG citations)
*   `VW-PHO-004: Expert Escalation Dialog` (Confirmation of agronomist review ticket creation)

## 5. AI Chat Module
*   `VW-CHA-001: AI Conversation View` (Route: `/chat` — text thread interface with inline weather/pricing widgets)
*   `VW-CHA-002: Citation Source Overlay` (Popover showing PDF references and verified metadata)

## 6. General System States (Edge Layouts)
*   `VW-SYS-001: Browser Permission Guide` (Instructions shown inline when geolocation or camera permission is blocked)
*   `VW-SYS-002: Network Offline Full-Page Fallback` (Empty state rendered when routes requiring server connectivity are visited offline)
*   `VW-SYS-003: Data Loading Pulse State` (Sleek motion pulse during soil analysis or chat processing)
