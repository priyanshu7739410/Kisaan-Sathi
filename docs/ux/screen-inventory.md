# Kisan Sathi Screen Inventory

A complete checklist of mobile application screens, modal states, and fallback layouts for the Kisan Sathi MVP.

## 1. Onboarding Module
*   `SCR-ONB-001: Language Selection Screen` (Initial launch; large tiles for Hindi, Marathi, Telugu, etc.)
*   `SCR-ONB-002: Phone Input Screen` (Minimalist UI, focus on number keypad)
*   `SCR-ONB-003: OTP Verification Screen` (6-digit block input, auto-submit on read)
*   `SCR-ONB-004: Land Photo Capture Screen` (Camera overlay with GPS indicator)
*   `SCR-ONB-005: Farm Details Form` (Input fields for Village name, farm size, and water source options dropdown)
*   `SCR-ONB-006: Soil Type Confirmation Overlay` (Presents detected soil type, button to approve, or change)
*   `SCR-ONB-007: Active Crop Selector` (Large crop cards to choose Cotton, Wheat, Rice, Okra)

## 2. Home Dashboard Module
*   `SCR-HOM-001: Main Dashboard Screen` (Standard state)
*   `SCR-HOM-002: Alerts Modal Details` (Appears when tapping a weather or pest emergency card)
*   `SCR-HOM-003: Offline Mode Banner` (Embedded dashboard header overlay when connection is lost)

## 3. Crop Tracker Module
*   `SCR-TRK-001: Smart Calendar Screen` (Interactive lifecycle line and task blocks)
*   `SCR-TRK-002: Log Activity Form` (Inputs for activity type, quantity/dosage, date selector modal)
*   `SCR-TRK-003: Log History Sheet` (Scrollable bottom sheet detailing past fertilizer/irrigation records)

## 4. Photo AI Module
*   `SCR-PHO-001: Capture Viewfinder Screen` (Live camera screen with focus/sharpness warning indicator)
*   `SCR-PHO-002: Gallery Image Picker Screen` (Native gallery selection layout)
*   `SCR-PHO-003: Crop Validation Screen` (Confirms crop identification, editable dropdown list option)
*   `SCR-PHO-004: Diagnostic Diagnosis Screen` (Results display with severity, RAG chemical treatment citations)
*   `SCR-PHO-005: Expert Escalation Status Screen` (Confirmation of ticket creation, status update details)

## 5. AI Chat Module
*   `SCR-CHA-001: AI Conversation Screen` (Text messages, voice note playback, tool search indicators)
*   `SCR-CHA-002: Citation Source Viewer Screen` (Simple overlay showing PDF references and date retrieved)

## 6. General System States (Edge Layouts)
*   `SCR-SYS-001: Permission Request Layout` (Triggered for Camera or Location; instructions on why it is needed)
*   `SCR-SYS-002: Network Offline Fallback Screen` (Full-page empty state for tabs requiring server execution)
*   `SCR-SYS-003: Data Loading / Spinner Screen` (Sleek pulse animation during soil analysis or chat processing)
