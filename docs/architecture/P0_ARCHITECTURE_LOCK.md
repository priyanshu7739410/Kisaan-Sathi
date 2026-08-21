# Kisan Sathi P0 Architecture Lock

This document locks the scope, system specifications, data models, and API interfaces for the P0 MVP implementation of Kisan Sathi as a Web Application.

---

## 1. Final P0 Scope
The P0 MVP focuses on the core agricultural loop, validating data collection, threat detection, and scenario simulation:
*   **Onboarding & Profile Setup:** Phone authentication, farm location (GPS), soil type detection via land photo, and water availability input.
*   **Core Agricultural Intelligence Loop:** Tracing: `Farmer Profile -> GPS -> Crop Cycle -> Weather Threat Alert -> AI Scenario Simulation -> Actionable Task`.
*   **Farmer Intelligence Dashboard:** Live weather widget, today's smart task prompts, and dynamic crop health checks.
*   **Smart Calendar Tracker:** Dynamic task scheduler and a simple activity logger (e.g., "Irrigated on June 1st").
*   **Photo AI Diagnostic:** Leaf image capture, crop verification checkpoint, and disease classification with verbatim treatment guidelines.
*   **Simplified AI Chat:** Voice and text thread queries for weather, crop manuals, and general agricultural topics.

---

## 2. Deferred Features
The following features are officially deferred to P2/P3:
*   **P2P Kisan Community Hub** (Farmer message boards, upvotes, peer comments).
*   **Local Buyer Marketplace** (Trader registration, active purchase bids, contact routing).
*   **AI Forum Anomaly Scanner** (dosage parsing for comments).
*   **Expert Escalation Live Sync** (Real-time agronomist ticketing portal).

---

## 3. P0 User Journeys
1.  **Onboarding Journey:** Farmer selects language → Inputs phone number and verifies OTP → Enters village name and uploads land photo → System returns detected soil class, capturing GPS location → Farmer verifies details and starts.
2.  **Scenario Decision Journey:** Heatwave forecast ($T_{max} \ge 40\text{°C}$) triggers alert on dashboard → System renders *Heatwave Decision Widget* with options: Option A (Mulch and irrigate), Option B (Do nothing) → Farmer logs action to mulch → Smart Calendar records event.
3.  **Leaf Diagnosis Journey:** Farmer uploads leaf image → Web app displays detected crop (Cotton) → Farmer confirms crop type → Vision API returns classification (Leaf Blight) → App displays verbatim chemical treatment cards.

---

## 4. P0 System Architecture
A simplified **Express.js / Node.js Monolith** and a **React Web Client**:

```
 ┌───────────────────────────────────────────────┐
 │            React + TypeScript Web Client      │
 └──────────────────────┬────────────────────────┘
                        │
                  REST / WebSockets
                        │
                        ▼
 ┌───────────────────────────────────────────────┐
 │            Express.js / Node.js Monolith      │
 └──────┬─────────────────┬────────────────┬─────┘
        │                 │                │
        ▼                 ▼                ▼
 ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
 │ MongoDB      │  │ Local Memory │  │ Cloud AI     │
 │ (Mongoose)   │  │ Cache / env  │  │ Model SDK    │
 └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 5. P0 AI Architecture
*   **Framework:** Native Google Gemini Node.js SDK (Model Cloud SDK). No LangChain.
*   **Tool Calling:** Standard function mapping router:
    *   `get_weather(lat, lon)` → Invokes abstract `WeatherService`.
    *   `search_agricultural_knowledge(query)` → Lexical search over manuals.
    *   `get_crop_context(farm_id)` → Fetches active crop lifecycle stages.
*   **RAG Knowledge Base:** Chunks are searched using **MongoDB Text search** index matching.
*   **Vision Solver:** Leaf image classification routes through an abstract `CropVisionSolver` interface that resolves to the model configured by `AI_VISION_MODEL` environment variable.

---

## 6. P0 Data Architecture & Core Database Model
The database uses MongoDB collections configured via Mongoose, using GeoJSON parameters for geospatial indices.

```
┌─────────┐      ┌────────┐      ┌────────────┐      ┌───────────────┐
│  Users  │ ───►  │ Farms  │ ───►  │ CropCycles │ ───►  │ ActivityLogs  │
└─────────┘      └────────┘      └────────────┘      └───────────────┘
```

### Major Collections
1.  **`users`:** `_id` (ObjectID), `phone_number` (String), `role` (String), `registered_at` (Date).
2.  **`farms`:** `_id`, `user_id`, `name`, `soil_type`, `water_source`, `gps_location` (GeoJSON Point).
3.  **`crop_cycles`:** `_id`, `farm_id`, `crop_type`, `sowing_date`, `stage` (sowing, vegetative, flowering, harvest).
4.  **`activity_logs`:** `_id`, `crop_cycle_id`, `activity_type`, `details` (Mixed JSON).
5.  **`localized_translations` (Normalized Content Translations):** 
    *   `_id`: ObjectID
    *   `entity_type`: String (e.g. 'crop', 'disease', 'task')
    *   `entity_id`: ObjectID
    *   `field_name`: String
    *   `language_code`: String
    *   `translated_value`: String

---

## 7. P0 API Boundaries
*   `POST /api/v1/auth/login` → Request phone OTP.
*   `POST /api/v1/auth/verify` → Verify OTP and issue JWT.
*   `POST /api/v1/farms/register` → Register farm location, details, and soil.
*   `GET /api/v1/dashboard/alerts` → Get active weather threats and scenario models.
*   `POST /api/v1/tracker/logs` → Log activity.
*   `POST /api/v1/vision/diagnose` → Upload leaf photo and receive disease classification.
*   `WS /api/v1/chat/ws` → WebSocket for conversational AI thread with tool-call results.

---

## 8. P0 External Data Sources
*   **Weather Provider:** `Application -> WeatherService -> WeatherProvider interface -> OpenWeather implementation`.
*   **Market Price Strategy:** Static, weekly-updated local database MongoDB collection of mandi baseline prices parsed from verified CSV reports.
*   **Agricultural Knowledge Sources:** Official ICAR manuals.

---

## 9. P0 Photo AI & LLM Model Abstraction
*   **AI Model Abstraction:** `AIService -> AIProvider interface -> Configured model`.
*   **Configuration Keys:** `AI_PROVIDER`, `AI_TEXT_MODEL`, `AI_VISION_MODEL`.
*   **Solver Pipeline:** Leaf Image Upload → Backend compression (<500KB) → Controller → `CropVisionSolver` → Response.

---

## 10. P0 Multilingual Strategy
*   **Coverage:** English, Hindi, and Marathi.
*   **UI Translation:** Served static JSON i18n files loaded in the React client.
*   **Database Content Localization:** Fetched from the normalized `localized_translations` collection.

---

## 11. P0 Offline Strategy
*   **Local Caching:** Web storage (LocalStorage) stores pending task logs.
*   **Network Sync Queue:** Axios client interceptor logs offline status. Synchronizes payloads sequentially when connectivity returns.

---

## 12. P0 Security & GPS Privacy Strategy
*   **GPS Location:** Stored securely as **MongoDB GeoJSON Points** (using `2dsphere` index). Truncated to 2 decimal places before being transmitted to third-party weather APIs.

---

## 13. P0 Design & UI Library Strategy
*   **Style System:** Outfit/Inter typography, warm beige backgrounds (`#FAF8F5`), and dark charcoal borders (`#2D2926`) following the local Indian folk-art outline identity.
*   **UI Libraries:** **React Bits** (reusable UI), **Motion** (layout transitions and animations), **Anime.js** (timeline-based storytelling visualizations), and **Bklit** where compatible.
*   **Sunlight Readability:** Enforce 7:1 contrast ratios.

---

## 14. Technology Classification Matrix

| Technology | Classification | Rationale |
| :--- | :--- | :--- |
| **React + TypeScript** | REQUIRED NOW | Core web client framework. |
| **Express.js / Node.js** | REQUIRED NOW | Core modular monolith backend framework. |
| **MongoDB / Mongoose** | REQUIRED NOW | Handles user profiles, logs, dynamic translations, and GeoJSON shapes. |
| **MongoDB Text Index** | REQUIRED NOW | Lexical crop manual RAG indexing. |
| **Model Cloud API** | REQUIRED NOW | Direct provider SDK integration (no LangChain). |
| **React Bits / Bklit** | REQUIRED NOW | Web visual styling / creative layout components. |
| **Motion / Anime.js** | REQUIRED NOW | Web transitions and interactive timelines. |
| **React Native / Expo** | REJECTED | Mobile-only frameworks; superseded by Web target. |
| **pgvector** | DEFERRED | Vector database features deferred. |

---

## ARCHITECTURE STATUS
# GO

The P0 MVP Web architecture is locked and fully specified. We are ready to begin implementation.
