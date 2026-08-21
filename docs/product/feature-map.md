# Kisan Sathi Feature Map (MVP Core)

A hierarchical feature map detailing the MVP (P0) modules, actions, and states.

```
KISAN SATHI (MVP Core)
├── 1. Onboarding & Profiling
│   ├── 1.1 Authentication
│   │   ├── Phone Number Input
│   │   ├── OTP Verification (Auto-read SMS)
│   │   └── Session state (Persistent JWT)
│   ├── 1.2 Language Selection
│   │   ├── Language List (Scheduled Indian Languages)
│   │   └── Standard UI translations loading
│   ├── 1.3 Farm Setup
│   │   ├── Land Photo Capture (triggering GPS/village fallback)
│   │   ├── AI Soil Classification Nudge (Verify detected type)
│   │   ├── Water Availability Input (Borewell, rainfed, canal, drip)
│   │   └── Farm Size Input (Acres/Bighas)
│   └── 1.4 Active Crop Selection
│       └── Crop list (Cotton, Rice, Wheat, Okra)
│
├── 2. Farmer Intelligence Dashboard
│   ├── 2.1 Today's Task & Nudges
│   │   ├── Task timeline cards (Irrigate, Fertilize, Harvest)
│   │   └── Log task status (Complete, Postpone, Skip)
│   ├── 2.2 Weather Interpretation Widget
│   │   ├── Agricultural context (e.g., "Spraying alert: High winds")
│   │   └── Stale data warning banner (if offline/API failed)
│   ├── 2.3 Scenario-Based Risk Analysis (Core AI)
│   │   ├── Harvest vs. Rain Simulator Widget
│   │   ├── Dynamic payoff comparison (Scenario A vs. B vs. C)
│   │   └── Direct Action Triggers (e.g., "Tap to log early harvest")
│   └── 2.4 Disease / Alert Center
│       └── Critical notifications (Frost warning, pest outbreak risk)
│
├── 3. Crop Tracking (Smart Calendar)
│   ├── 3.1 Activity Log
│   │   ├── Retroactive log creation (Select activity, date, quantity)
│   │   └── Log details (Fertilizer type, irrigation hours)
│   ├── 3.2 Dynamic Recommendation Engine
│   │   └── Next step alerts (Triggered by farmer action logs)
│   └── 3.3 Crop Lifecycle Timeline
│       └── Visual stage indicators (Sowing -> Vegetative -> Flowering)
│
├── 4. Photo AI Diagnostics
│   ├── 4.1 Leaf Image Capture
│   │   ├── Live camera frame capture (triggering focus check)
│   │   └── Gallery upload fallback (with missing metadata prompt)
│   ├── 4.2 Crop Validation Step
│   │   ├── Display detected crop type
│   │   └── Allow manual edit if AI detected crop incorrectly
│   ├── 4.3 Analysis & Treatment Citations
│   │   ├── Likely disease classification & severity indicator
│   │   └── Verbatim ICAR/University chemical & dosage citations
│   └── 4.4 Low-Confidence Expert Escalation
│       └── Flag to agronomist review queue (if confidence < 75%)
│
└── 5. AI Farmer Chatbot
    ├── 5.1 Chat Interface
    │   ├── Multilingual text input and output
    │   └── Voice note attachment (Speech-to-Text via backend)
    └── 5.2 Contextual Tools
        ├── Weather retrieval tool
        ├── RAG Agricultural manuals tool
        └── Farmer profile context injector
│
├── 6. Local Buyer Marketplace
│   ├── 6.1 Buyer Offer Ingestion
│   │   ├── Buyer price posting (commodity, variety, price, location)
│   │   └── Contact details listing (direct call tap triggers)
│   └── 6.2 Farmer Offers Directory
│       ├── Browse local active listings (filter by distance)
│       └── Log crop yield sale transaction
│
└── 7. P2P Kisan Community Hub
    ├── 7.1 Community Board
    │   ├── Post creation (questions, text description, leaf photo)
    │   ├── Comments and replies feed (nested view)
    │   ├── Upvote / helpful reaction triggers
    │   └── AI Safety Scanner
    │       ├── Automated peer warning tags (general disclaimer footer)
    │       └── AI Anomaly flagging (chemical/quantity mismatch alerts)
    └── 7.2 Local Directory
        └── Farmer peer contacts sharing (opt-in only)
```
