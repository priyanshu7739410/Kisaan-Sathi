# Kisan Sathi Product Vision

## 1. Product Description
Kisan Sathi is an AI-powered agricultural intelligence platform for Indian farmers, local buyers, and traders. The platform shifts agricultural workflows from traditional, fragmented, and information-poor practices to data-informed, modern, personalized, and intelligent decisions.

Kisan Sathi is not a generic chatbot. It acts as an active assistant that integrates details about the **Farmer, Farm, Location, Soil, Crop Stage, Weather, and Government data** to recommend direct, actionable steps, while serving as a collaborative marketplace connecting farmers with regional buyers and peers.

## 2. Core Value Proposition: "What to do today?"
The platform centers around answering the farmer's daily questions:
*   What tasks should I perform today based on my crop stage and weather?
*   Is my crop healthy, and what is the exact cause of any leaf damage?
*   What is the dynamic weather impact on my irrigation and spraying plans?
*   What are the active buying prices offered by local traders near my village?

## 3. MVP (P0) Scope Boundary
To maximize user validation and deliver immediate value, the MVP will focus on a focused core slice:
1.  **Onboarding & Progressive Setup:** Farm registration using a land photo for automatic soil type detection, village location selection, and water availability input.
2.  **Farmer Intelligence Dashboard:** Live weather warnings, dynamic alerts, and actions for today.
3.  **Crop Tracking & Dynamic Alerts (Smart Calendar):** Logging actions (fertilizers, irrigation) and receiving follow-up suggestions.
4.  **Local Buyer Marketplace:** Allowing registered buyers and traders to list active purchase offers and contact details, and enabling farmers to browse local listings.
5.  **P2P Kisan Community Hub:** A Reddit-style forum structured by district/crop where farmers ask questions, coordinate logistics, and share local mandi details.
6.  **Photo AI Diagnostics:** Photographing leaf diseases, verifying the crop, and retrieving verified treatment citations.
7.  **AI Farmer Chatbot:** Conversational assistant with tool access (weather, RAG crop manuals) to handle farmer queries.

## 4. Core AI Feature: Scenario-Based Risk Analysis
The highlight AI capability of Kisan Sathi is the **Scenario-Based Risk Analysis** engine. By combining historical farm logs, active crop growth stages, and real-time probabilistic weather forecasts, the system calculates risk/payoff matrices for farmer decisions:
*   **Predictive Simulations:** If extreme weather is forecast, the engine computes:
    *   *Rain/Harvest Scenario:* Harvest early (yield preservation vs. minor weight-loss) vs. Delay (lodging, rot, and price penalty if rain occurs, or maximum maturity if rain fails).
    *   *Frost/Cold Snap Scenario:* Irrigate early (warms soil, shields root system) vs. Do nothing (presents leaf-burn, flower drop, or plant death if frost hits).
    *   *Heatwave/Drought Scenario:* Extra watering/mulching (conserves soil moisture, high labor cost) vs. Do nothing (wilting, transpiration shock, and yield drop).
    *   *High Wind/Cyclone Scenario:* Stake crops & Postpone sprays (prevents breakage and pesticide drift waste) vs. Do nothing (stem breakage, defoliation).
*   **Economic Impact Modeling:** Displays concrete, localized financial estimates for each decision outcome.

