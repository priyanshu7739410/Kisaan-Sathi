# Kisan Sathi User Flows (MVP Core)

This document outlines the core transactional user flows for the Kisan Sathi MVP.

## Flow 1: New Farmer Onboarding & Farm Setup

```mermaid
sequenceDiagram
    autonumber
    Farmer->>App: Launch App & Select Language
    App->>Farmer: Prompt Phone Number
    Farmer->>App: Input Phone Number
    App->>Farmer: Send OTP (Auto-reads SMS)
    Farmer->>App: Submit OTP
    App->>Farmer: Prompt: "Capture a photo of your land"
    Farmer->>App: Take Photo (App grabs GPS)
    App->>Backend: Post Land Photo + GPS (or Fallback Village)
    Backend->>Backend: Vision AI analyzes soil color/texture
    Backend-->>App: Return Soil Classification (e.g. Black Cotton Soil)
    App->>Farmer: Display detected Soil + Water Availability Inputs + size
    Farmer->>App: Confirms/edits Soil, selects Water source, inputs Size
    App->>Backend: Save FarmerProfile + Farm details
    Backend-->>App: Success -> Load Dashboard
```

## Flow 2: Photo AI Crop Disease Diagnosis

```mermaid
sequenceDiagram
    autonumber
    Farmer->>App: Open Camera / Photo AI Tab
    Farmer->>App: Capture leaf photo (or select from gallery)
    App->>Backend: Upload image file
    Backend->>Backend: Image check + Crop Detection
    Backend-->>App: "Detected crop: Cotton. Is this correct?"
    Alt Crop is incorrect
        Farmer->>App: Edit and select "Okra"
        App->>Backend: Re-verify with Okra context
    End
    Farmer->>App: Confirm Crop Type
    Backend->>Backend: Diagnose disease + check confidence score
    Alt Confidence >= 75%
        Backend->>Backend: Retrieve verbatim ICAR chemical database citations
        Backend-->>App: Display Disease, severity, and official citations
    Else Confidence < 75%
        Backend->>Backend: Generate Expert Escalation ticket (saves to queue)
        Backend-->>App: Show Warning: "Uncertain diagnosis. Sent to experts. We will notify you."
    End
```

## Flow 3: Smart Calendar Action Logging

```mermaid
sequenceDiagram
    autonumber
    Farmer->>App: View "Today's Task" on Dashboard
    Farmer->>App: Tap "Log Activity"
    App->>Farmer: Show Logging form (Pre-populated with expected Fertilizer X)
    Farmer->>App: Confirm Date applied (e.g., June 1st) and save
    App->>Backend: Post Activity Log (crop_id, action, date, quantity)
    Backend->>Backend: Compute follow-up step via rule engine
    Backend->>Backend: Generate future dynamic task: "Apply Fertilizer B on June 15th"
    Backend-->>App: Display success message + update timeline
```

## Flow 4: Scenario-Based Risk Analysis (Weather vs. Harvest)

```mermaid
sequenceDiagram
    autonumber
    WeatherAPI->>Backend: High probability of rain (80%) detected on Day X
    Backend->>Backend: Query active crop cycles near harvest (Day X-1 to X+2)
    Backend->>Backend: Identify affected farms (e.g. Wheat field of Farmer A)
    Backend->>Backend: Generate Risk Simulation matrix
    Backend->>App: Push Notification: "Heavy rain risk on Sunday. Check your harvest plan."
    Farmer->>App: Tap notification, opens Scenario Simulator Screen
    App->>Backend: Fetch simulation parameters (weather, crop stage, farm size)
    Backend-->>App: Return 3 pay-off scenarios (A: Harvest Early, B: Wait + Rain, C: Wait + No Rain)
    App->>Farmer: Display visual cards comparing yield weight, crop damage risk, and market prices
    Farmer->>App: Taps "Action: Log Harvest Today" (confirms early harvest)
    App->>Backend: Update crop_cycle status to 'harvested'
    Backend-->>App: Success -> Update dashboard tasks and clear rain alerts
```

