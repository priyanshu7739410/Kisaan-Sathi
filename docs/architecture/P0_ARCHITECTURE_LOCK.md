# Kisan Sathi P0 Architecture Lock

This document locks the scope, system specifications, data models, and API interfaces for the P0 MVP implementation of Kisan Sathi.

---

## 1. Final P0 Scope
The P0 MVP focuses on the core agricultural loop, validating data collection, threat detection, and scenario simulation:
*   **Onboarding & Profile Setup:** Phone authentication, farm location (GPS), soil type detection via land photo, and water availability input.
*   **Core Agricultural Intelligence Loop:** Tracing: `Farmer Profile -> GPS -> Crop Cycle -> Weather Threat Alert -> AI Scenario Simulation -> Actionable Task`.
*   **Farmer Intelligence Dashboard:** Live weather widget, today's smart task prompts, and dynamic crop health checks.
*   **Smart Calendar Tracker:** Dynamic task scheduler and a simple activity logger (e.g. "Irrigated on June 1st").
*   **Photo AI Diagnostic:** Leaf image capture, crop verification checkpoint, and disease classification with verbatim treatment guidelines.
*   **Simplified AI Chat:** Voice and text thread queries for weather, crop manuals, and general agricultural topics.

---

## 2. Deferred Features
The following features are officially deferred to P2/P3:
*   **P2P Kisan Community Hub** (Reddit-style farmer message boards, upvotes, peer comments).
*   **Local Buyer Marketplace** (Trader registration, active purchase bids, contact routing).
*   **AI Forum Anomaly Scanner** (NER quantity/dosage parsing for comments).
*   **Expert Escalation Live Sync** (Real-time agronomist ticketing portal).

---

## 3. P0 User Journeys
1.  **Onboarding Journey:** Farmer selects language -> Inputs phone number and verifies OTP -> Enters village name and captures land photo -> System returns detected soil class, capturing GPS location -> Farmer verifies details and starts.
2.  **Scenario Decision Journey:** Heatwave forecast ($T_{max} \ge 40\text{°C}$) triggers alert on dashboard -> System renders *Heatwave Decision Widget* with three options: Option A (Mulch and irrigate, showing labor/water cost), Option B (Do nothing, showing estimated wilting loss), Option C (Drought fails) -> Farmer taps "Log Action" to mulch -> Smart Calendar records event and updates today's alerts.
3.  **Leaf Diagnosis Journey:** Farmer captures leaf image -> App displays detected crop (Cotton) -> Farmer confirms crop type -> Vision API returns classification (Leaf Blight, 85% confidence) -> App displays verbatim chemical treatment cards from verified ICAR databases.

---

## 4. P0 System Architecture
A simplified **Express.js / Node.js Monolith** and a **React Native Expo Mobile Client**:

```
 ┌───────────────────────────────────────────────┐
 │            React Native Mobile Client         │
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
*   **Framework:** Native Google Gemini Python SDK. No LangChain or custom agent frameworks.
*   **Tool Calling:** Standard function mapping router:
    *   `get_weather(lat, lon)` -> Invokes abstract `WeatherService`.
    *   `search_agricultural_knowledge(query)` -> Lexical search over SQL database.
    *   `get_crop_context(farm_id)` -> Fetches active crop lifecycle stages.
*   **RAG Knowledge Base:** Defer `pgvector`. Agricultural manuals are chunked and queried using **MongoDB Text search** index matching and metadata filtering.
*   **Vision Solver:** Defer self-hosted ONNX. Image classification routes through an abstract `CropVisionSolver` interface that resolves to the model configured by `AI_VISION_MODEL` environment variable.

---

## 6. P0 Data Architecture & Core Database Model
The database uses MongoDB collections configured via Mongoose, using GeoJSON parameters for geospatial indices.

```
┌─────────┐      ┌────────┐      ┌────────────┐      ┌───────────────┐
│  Users  │ ───►  │ Farms  │ ───►  │ CropCycles │ ───►  │ ActivityLogs  │
└─────────┘      └────────┘      └────────────┘      └───────────────┘
                     │
                     ▼
             ┌───────────────┐      ┌────────────────────────┐
             │ FarmBoundary  │      │ LocalizedTranslations  │ (Normalized)
             └───────────────┘      └────────────────────────┘
```

### Major Tables
1.  **`users`:** `id` (UUID), `phone_number` (VARCHAR), `role` (VARCHAR), `registered_at`.
2.  **`farms`:** `id`, `user_id`, `name`, `soil_type`, `water_source`.
3.  **`farm_boundaries`:** `id`, `farm_id`, `boundary_polygon` (GEOMETRY(Polygon, 4326)).
4.  **`crop_cycles`:** `id`, `farm_id`, `crop_type`, `sowing_date`, `stage` (sowing, vegetative, flowering, harvest).
5.  **`activity_logs`:** `id`, `crop_cycle_id`, `activity_type` (fertilizer, irrigation), `details` (JSONB).
6.  **`localized_translations` (Normalized P2P Content Translations):** 
    *   `id`: UUID (Primary Key)
    *   `entity_type`: VARCHAR(50) (e.g. 'crop', 'disease', 'task')
    *   `entity_id`: UUID (Foreign key referencing respective entities)
    *   `field_name`: VARCHAR(50) (e.g. 'name', 'treatment_details')
    *   `language_code`: VARCHAR(5) (e.g. 'hi', 'mr', 'te')
    *   `translated_value`: TEXT (Translated content)
    *   *Index:* Unique composite index on `(entity_type, entity_id, field_name, language_code)`.

---

## 7. P0 API Boundaries
*   `POST /api/v1/auth/login` -> Request phone OTP.
*   `POST /api/v1/auth/verify` -> Verify OTP and issue JWT.
*   `POST /api/v1/farms/register` -> Register farm location, boundaries, and soil.
*   `GET /api/v1/dashboard/alerts` -> Get active weather threats and scenario models.
*   `POST /api/v1/tracker/logs` -> Log activity (retroactive support).
*   `POST /api/v1/vision/diagnose` -> Upload leaf photo and receive disease classification.
*   `WS /api/v1/chat/ws` -> WebSocket for conversational AI thread with tool-call results.

---

## 8. P0 External Data Sources

### A. Weather Provider Abstraction
Kisan Sathi decouples the application logic from weather vendor payload APIs:
*   **Abstraction Layer:** `Application -> WeatherService -> WeatherProvider interface -> OpenWeather implementation`.
*   **Interface Contract (`WeatherProvider`):**
    *   `getCurrentWeather(coarse_location) -> CurrentWeatherPayload`
    *   `getHourlyForecast(coarse_location) -> List[HourlyForecastPayload]`
    *   `getDailyForecast(coarse_location) -> List[DailyForecastPayload]`
    *   `getWeatherAlerts(coarse_location) -> List[WeatherAlertPayload]`
*   **India Coverage (OpenWeather MVP):** Utilizes OpenWeatherMap OneCall API for granular wind, hourly precipitation, temperature, and alerts. Falls back to local historical averages if API limits or failures occur.

### B. Market Price Strategy
*   **Constraint:** Direct scraping of AGMARKNET is deprecated for the MVP due to ASPX page fragility.
*   **Approach:** FastAPI maintains a static, weekly-updated local database table of mandi baseline prices parsed from verified CSV reports.

### C. Agricultural Knowledge Sources
*   Official ICAR (Indian Council of Agricultural Research) manuals and state agricultural university guides.

---

## 9. P0 Photo AI & LLM Model Abstraction
To support easy upgrades and migrations, the AI stack is fully decoupled:
*   **AI Model Abstraction:** `AIService -> AIProvider interface -> Configured model (via env API key)`.
*   **Configuration Keys:**
    *   `AI_PROVIDER` (e.g. `google`, `openai`)
    *   `AI_TEXT_MODEL` (e.g. `gemini-1.5-flash`, `gpt-4o-mini`)
    *   `AI_VISION_MODEL` (e.g. `gemini-1.5-flash`, `gpt-4o`)
*   **Solver Pipeline:** Leaf Image Capture -> Local size compression (<500KB) -> FastAPI controller -> `CropVisionSolver` resolving to the configured `AI_VISION_MODEL` -> Validation check -> Verification matching -> Response.

---

## 10. P0 Multilingual Strategy
*   **Coverage:** 3 languages for the initial MVP: English, Hindi, and Marathi (extensible to 22–25 without database schema modifications).
*   **UI Translation:** Standard static i18n JSON files stored locally on-device.
*   **Database Content Localization:** Fetched from the normalized `localized_translations` schema table with a language fallback hierarchy (`user_language -> regional_fallback -> English`).
*   **AI Responses:** The system prompt instructs the configured `AI_TEXT_MODEL` to format outputs strictly in the farmer's registered profile language.
*   **Offline Strategy:** UI translation JSON maps are stored in the bundle, enabling complete local translation capability without network connection.

---

## 11. P0 Offline Strategy
*   **Local Database:** `expo-sqlite` stores pending task logs and offline photo metadata.
*   **Network Sync Queue:** Axios client interceptor logs offline status. When connection returns, it processes payloads in a sequential queue to prevent double-writes.

---

## 12. P0 Security & GPS Privacy Strategy
*   **GPS Splitting Model:**
    1.  **Exact Coordinates:** Captured via GPS and stored securely as **MongoDB GeoJSON Points** (using `2dsphere` index) for exact boundary polygon lookups. Restricted to owner profile access.
    2.  **Coarse Location:** Coordinates are truncated to 2 decimal places (~1.1km grid precision) before being transmitted to third-party weather APIs or market price location indices, preserving spatial privacy.

---

## 13. P0 Design & UI Library Strategy
*   **Style System:** Outfit/Inter typography, warm beige backgrounds (`#FAF8F5`), and dark charcoal borders (`#2D2926`) following the local Indian folk-art outline identity.
*   **sunlight Readability:** Enforce 7:1 contrast ratios.
*   **Animation System:** Moti (React Native Reanimated-backed). React Bits, Anime.js, and Bklit are Web-only and are excluded.

---

## 14. Technology Classification Matrix

| Technology | Classification | Rationale |
| :--- | :--- | :--- |
| **Express.js / Node.js**| REQUIRED NOW | Core modular monolith backend framework. |
| **MongoDB / Mongoose** | REQUIRED NOW | Handles user profiles, logs, dynamic translations, and GeoJSON shapes. |
| **MongoDB Text Index** | REQUIRED NOW | Lexical crop manual RAG indexing. |
| **Model Cloud API** | REQUIRED NOW | Direct provider SDK integration (no LangChain). |
| **Moti / Reanimated** | REQUIRED NOW | Mobile layout animations. |
| **pgvector** | DEFERRED | Deferred; future semantic search can evaluate MongoDB Atlas Vector Search. |
| **Python ML Services** | DEFERRED | GPU hosting / local models are postponed. |
| **LangChain** | REJECTED | Avoid agent abstraction libraries. |
| **React Bits / Bklit** | REJECTED | Web-only; incompatible with React Native. |

---

## ARCHITECTURE STATUS
# GO

The P0 MVP architecture is locked and fully specified. We are ready to begin implementation.

### First Implementation Task
Initialize the React Native + Expo app shell in the workspace root directory `d:\kisan` and configure the initial Outfit/Inter fonts and native color palettes inside `src/ui/theme.ts`.
