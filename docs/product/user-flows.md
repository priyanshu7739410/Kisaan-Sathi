# Kisan Sathi User Flows (MVP Core)

This document outlines the core transactional user flows for the Kisan Sathi Web MVP.

## Flow 1: New Farmer Onboarding & Farm Setup

```mermaid
sequenceDiagram
    autonumber
    Farmer->>Browser: Visit Website & Select Language
    Browser->>Farmer: Prompt Phone Number
    Farmer->>Browser: Input Phone Number
    Browser->>Farmer: Send OTP (Input verification code)
    Farmer->>Browser: Submit OTP
    Browser->>Farmer: Prompt: "Upload or capture a photo of your land"
    Farmer->>Browser: Upload Photo (Web app requests GPS)
    Browser->>Backend: Post Land Photo + GPS (or Fallback Village)
    Backend->>Backend: Vision AI analyzes soil color/texture
    Backend-->>Browser: Return Soil Classification (e.g. Black Cotton Soil)
    Browser->>Farmer: Display detected Soil + Water Availability Inputs + size
    Farmer->>Browser: Confirms/edits Soil, selects Water source, inputs Size
    Browser->>Backend: Save FarmerProfile + Farm details
    Backend-->>Browser: Success -> Load Dashboard
```

## Flow 2: Photo AI Crop Disease Diagnosis

```mermaid
sequenceDiagram
    autonumber
    Farmer->>Browser: Open Photo AI / Diagnose Route
    Farmer->>Browser: Upload leaf photo (or capture via mobile browser)
    Browser->>Backend: Upload image file
    Backend->>Backend: Image check + Crop Detection
    Backend-->>Browser: "Detected crop: Cotton. Is this correct?"
    Alt Crop is incorrect
        Farmer->>Browser: Edit and select "Okra"
        Browser->>Backend: Re-verify with Okra context
    End
    Farmer->>Browser: Confirm Crop Type
    Backend->>Backend: Diagnose disease + check confidence score
    Alt Confidence >= 75%
        Backend->>Backend: Retrieve verbatim ICAR chemical database citations
        Backend-->>Browser: Display Disease, severity, and official citations
    Else Confidence < 75%
        Backend->>Backend: Generate Expert Escalation ticket (saves to queue)
        Browser-->>Farmer: Show Warning: "Uncertain diagnosis. Sent to experts. We will notify you."
    End
```

## Flow 3: Smart Calendar Action Logging

```mermaid
sequenceDiagram
    autonumber
    Farmer->>Browser: View "Today's Task" on Web Dashboard
    Farmer->>Browser: Tap "Log Activity"
    Browser->>Farmer: Show Logging form overlay (Pre-populated with expected Fertilizer X)
    Farmer->>Browser: Confirm Date applied (e.g., June 1st) and save
    Browser->>Backend: Post Activity Log (crop_id, action, date, quantity)
    Backend->>Backend: Compute follow-up step via rule engine
    Backend->>Backend: Generate future dynamic task: "Apply Fertilizer B on June 15th"
    Backend-->>Browser: Display success message + update timeline
```

## Flow 4: Scenario-Based Risk Analysis (Weather vs. Harvest)

```mermaid
sequenceDiagram
    autonumber
    WeatherAPI->>Backend: High probability of rain (80%) detected on Day X
    Backend->>Backend: Query active crop cycles near harvest (Day X-1 to X+2)
    Backend->>Backend: Identify affected farms (e.g. Wheat field of Farmer A)
    Backend->>Backend: Generate Risk Simulation matrix
    Backend->>Browser: Render Dashboard Banner: "Heavy rain risk on Sunday. Check your harvest plan."
    Farmer->>Browser: Clicks banner, opens Scenario Simulator Card
    Browser->>Backend: Fetch simulation parameters (weather, crop stage, farm size)
    Backend-->>Browser: Return 3 pay-off scenarios (A: Harvest Early, B: Wait + Rain, C: Wait + No Rain)
    Browser->>Farmer: Display visual cards comparing yield weight, crop damage risk, and market prices
    Farmer->>Browser: Taps "Action: Log Harvest Today" (confirms early harvest)
    Browser->>Backend: Update crop_cycle status to 'harvested'
    Backend-->>Browser: Success -> Update dashboard tasks and clear rain alerts
```
