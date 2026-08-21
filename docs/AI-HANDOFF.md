# Kisan Sathi — AI Handoff

```
CURRENT ARCHITECTURE STATUS: GO

CURRENT STACK:
React Native + Expo + TypeScript
Node.js + Express + TypeScript
MongoDB + Mongoose

IMPLEMENTATION STATUS:
IN PROGRESS

CURRENT TASK:
Boilerplate initialized, awaiting first feature approval

SUPERSEDED ARCHITECTURE:
FastAPI/PostgreSQL/Celery/pgvector/LangChain (Historical only)
```

## 1. Current Project State
*   **Tech Stack Statement:** Frontend remains React Native + Expo. Backend/database stack is Node.js + Express + MongoDB.
*   **Current Phase:** FOUNDATION (Completed). Code Implementation (In Progress).
*   **Current Objective:** Boilerplates and workspaces initialized. Core Mern/Expo/TS connection established.
*   **Architecture specification:** COMPLETE
*   **P0 implementation:** IN PROGRESS
*   **P1/P2 specification:** DEFINED / DEFERRED
*   **Current Branch:** `master`
*   **Frontend Status:** PLANNED / NOT_STARTED
*   **Backend Status:** PLANNED / NOT_STARTED
*   **Database Status:** PLANNED / NOT_STARTED
*   **AI Status:** PLANNED / NOT_STARTED
*   **Design System Status:** PARTIALLY_COMPLETE (Typography, spacing, colors, and accessibility tokens defined in markdown; theme/animation TS files created).
*   **Testing Status:** PLANNED / NOT_STARTED
*   **Deployment Status:** PLANNED / NOT_STARTED

---

## 2. CURRENT TASK
*   **Task:** Foundation initialization.
*   **Reason:** Establish React Native Expo frontend shell and Node.js Express server boilerplates with Mongoose connections.
*   **Expected Outcome:** Workspace monorepo setup ready for P0 implementation.
*   **Status:** GO (Code implementation ready to initialize)
*   **Files Involved:**
    *   [P0_ARCHITECTURE_LOCK.md](file:///d:/kisan/docs/architecture/P0_ARCHITECTURE_LOCK.md)
    *   [TECH_STACK.md](file:///d:/kisan/docs/architecture/TECH_STACK.md)
*   **Blockers:** None.

---

## 3. COMPLETED WORK

### [Pre-Implementation Architecture Audit]
*   **Status:** VERIFIED
*   **What was done:** Performed a rigorous technical and product audit on the complete specifications. Identified 6 critical issues, recommended a simplified P0 MVP vertical slice, deprecated speculative subfeatures (P2P forum and Buyer portal) for the MVP, stripped out unnecessary AI frameworks, mapped out official weather/mandi data API alternatives, and set a hard NO-GO gate.
*   **Files Changed:**
    *   [PRE_IMPLEMENTATION_AUDIT.md](file:///d:/kisan/docs/architecture/PRE_IMPLEMENTATION_AUDIT.md)
    *   [AI-HANDOFF.md](file:///d:/kisan/docs/AI-HANDOFF.md)

### [Integrated Guidelines Configuration]
*   **Status:** VERIFIED
*   **What was done:** Installed Karpathy-inspired AI guidelines and merged them with Kisan Sathi rules for thinking before coding, simplicity, surgical changes, goal-driven execution, and agricultural safety bounds.
*   **Files Changed:**
    *   [GEMINI.md](file:///d:/kisan/GEMINI.md)
    *   [AGENTS.md](file:///d:/kisan/AGENTS.md)
    *   [CLAUDE.md](file:///d:/kisan/CLAUDE.md)
    *   [.cursor/rules/karpathy-guidelines.mdc](file:///d:/kisan/.cursor/rules/karpathy-guidelines.mdc)
    *   [.agents/skills/karpathy-guidelines/SKILL.md](file:///d:/kisan/.agents/skills/karpathy-guidelines/SKILL.md)
    *   [.agents/rules/kisan-sathi.md](file:///d:/kisan/.agents/rules/kisan-sathi.md)

### [Product Specs & IA Blueprints]
*   **Status:** IMPLEMENTED
*   **What was done:** Generated full product design, IA, screen maps, and user flow charts for the MVP core boundaries.
*   **Files Changed:**
    *   [vision.md](file:///d:/kisan/docs/product/vision.md)
    *   [personas.md](file:///d:/kisan/docs/product/personas.md)
    *   [feature-map.md](file:///d:/kisan/docs/product/feature-map.md)
    *   [user-flows.md](file:///d:/kisan/docs/product/user-flows.md)
    *   [information-architecture.md](file:///d:/kisan/docs/ux/information-architecture.md)
    *   [screen-inventory.md](file:///d:/kisan/docs/ux/screen-inventory.md)

### [Technical Architecture Blueprints]
*   **Status:** IMPLEMENTED
*   **What was done:** Designed modular monolith, RAG tools router, conceptual schemas (PostgreSQL, PostGIS, pgvector), and endpoints.
*   **Files Changed:**
    *   [system-architecture.md](file:///d:/kisan/docs/architecture/system-architecture.md)
    *   [ai-architecture.md](file:///d:/kisan/docs/architecture/ai-architecture.md)
    *   [data-architecture.md](file:///d:/kisan/docs/architecture/data-architecture.md)
    *   [api-architecture.md](file:///d:/kisan/docs/architecture/api-architecture.md)

### [Design System Foundations]
*   **Status:** IMPLEMENTED
*   **What was done:** Established color palettes, spacing, Outfit/Inter typography, and React Native Easing tokens.
*   **Files Changed:**
    *   [design-system.md](file:///d:/kisan/docs/ux/design-system.md)
    *   [ui-library-guide.md](file:///d:/kisan/docs/ux/ui-library-guide.md)
    *   [theme.ts](file:///d:/kisan/src/ui/theme.ts)
    *   [animation.ts](file:///d:/kisan/src/ui/animation.ts)

---

## 4. IN PROGRESS
None. All design/blueprint tasks have been fully implemented.

---

## 5. BLOCKERS
None.

---

## 6. OPEN QUESTIONS FOR USER
All design phase grilling questions have been successfully aligned and answered.

---

## 7. PRODUCT FEATURE MAP

### Onboarding
- [PLANNED] Authentication SMS Flow (P0)
- [PLANNED] progressive profiling wizard (P0)
- [PLANNED] Land Photo capture soil detection (P0)
- [PLANNED] Water availability source setup (P0)

### Dashboard
- [PLANNED] Today's tasks listing (P0)
- [PLANNED] Emergency weather alerts (P0)
- [PLANNED] Weather interpretation widget (P0)
- [PLANNED] Multi-weather scenario simulator widget (P0)

### Tracker
- [PLANNED] Smart calendar schedule lifecycle timeline (P0)
- [PLANNED] Retroactive action logger (P0)

### Photo AI
- [PLANNED] Camera capture (P0)
- [PLANNED] Crop selection validation checkpoint (P0)
- [PLANNED] Leaf disease detection (P0)
- [PLANNED] RAG Chemical treatment citations card (P0)
- [PLANNED] Expert escalation queue creation (P0)

### AI Chat
- [PLANNED] Text/Voice conversation thread (P0)
- [PLANNED] RAG search tool integration (P0)
- [PLANNED] Heterogeneous Inline Rich UI Widgets rendering (P0)

### Marketplace & Community
- [PLANNED] Local Buyer price offers broadcasting (P0)
- [PLANNED] P2P Reddit-style farmer board (P0)
- [PLANNED] AI Community Anomaly Scanner (P0)

---

## 8. SCREEN INVENTORY

| Screen | Module | Status | Route | Implemented | Tested |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Onboarding Language Selector | Onboarding | PLANNED | `/onboard/lang` | No | No |
| Phone Auth Input | Onboarding | PLANNED | `/onboard/phone` | No | No |
| SMS Verification Form | Onboarding | PLANNED | `/onboard/otp` | No | No |
| Land Photo Capture Setup | Onboarding | PLANNED | `/onboard/land-photo`| No | No |
| Soil Confirmation Overlay | Onboarding | PLANNED | (modal) | No | No |
| Crop Selector Grid | Onboarding | PLANNED | `/onboard/crops` | No | No |
| Home Dashboard Hub | Home | PLANNED | `/dashboard` | No | No |
| Scenario Simulator Card | Home | PLANNED | (modal) | No | No |
| Smart Calendar Tracker | Calendar | PLANNED | `/tracker` | No | No |
| Retroactive Activity Form | Calendar | PLANNED | `/tracker/log` | No | No |
| Photo AI Capture View | Photo AI | PLANNED | `/photo-ai` | No | No |
| Crop Validation Step | Photo AI | PLANNED | `/photo-ai/verify` | No | No |
| Disease Result Dashboard | Photo AI | PLANNED | `/photo-ai/result` | No | No |
| Chat thread | Chat | PLANNED | `/chat` | No | No |
| Market Offers directory | Marketplace | PLANNED | `/marketplace` | No | No |
| P2P Forum Feed | Community | PLANNED | `/community` | No | No |

---

## 9. ARCHITECTURE

### Frontend (PLANNED)
*   **Framework:** React Native + Expo (TypeScript).
*   **Navigation:** React Navigation (Bottom Tabs layout).
*   **Styling:** StyleSheet styling, following `src/ui/theme.ts`.
*   **Animations:** Moti (Reanimated-backed Framer Motion alternative).

### Backend (PLANNED)
*   **Framework:** Express.js / Node.js modular monolith.
*   **Queue/Cron:** In-memory schedules or node-cron (no heavy Celery/Redis).

### Database (PLANNED)
*   **Engine:** MongoDB (Mongoose ORM) + GeoJSON 2dsphere indexes.

### AI (PLANNED)
*   **Orchestration:** Direct Gemini model SDK integration with explicit Tool Registry.
*   **Ingestion:** MongoDB text search queries over local manuals corpus.
*   **Vision Solver:** Abstract solver with Cloud API fallback.

---

## 10. DESIGN SYSTEM
*   **Integrated:** PLANNED (Visual principles defined in [design-system.md](file:///d:/kisan/docs/ux/design-system.md)).
*   **Visual Direction:** Custom, hand-drawn vector sketches inspired by traditional Indian block printing and local folk art. Outlines use dark charcoal `#2D2926` strokes over warm beige `#FAF8F5` background surfaces.
*   **Sunlight Readability:** Strict minimum **7:1 contrast ratio** for all text and outlines.
*   **Design & Animation Strategy:** Evaluated web libraries (React Bits, Anime.js, Motion, Bklit). Confirmed they are **Web-only** and incompatible. They are utilized strictly as visual design/layout references. Replaced natively with **React Native Reanimated**, **Moti**, and **Victory Native XL** (Locked in [UI_LIBRARY_EVALUATION.md](file:///d:/kisan/docs/architecture/UI_LIBRARY_EVALUATION.md)).

---

## 11. DATABASE STATUS
*   **Database Engine:** MongoDB / Mongoose (PLANNED).
*   **Major Collections:** `users`, `farms`, `crop_cycles`, `activity_logs`, `weather_scenarios`, `localized_translations`, `expert_cases`. (Buyer and community collections are deferred).

---

## 12. API STATUS
*   All endpoints listed in [api-architecture.md](file:///d:/kisan/docs/architecture/api-architecture.md) are **PLANNED**. No endpoints are implemented yet.

---

## 13. AI SYSTEM STATUS
*   **LLM/RAG/Vision:** PLANNED. No live AI execution is online. 
*   **AI Knowledge Base:** The AI is intended to know crop lifecycles, government scheme eligibilities, leaf pest classifications, and commodity pricing.

---

## 14. DATA SOURCES
*   **Weather:** OpenWeatherMap API (PLANNED - Fallback to static mock alerts).
*   **Market Prices (P0 Static Ingestion):** Government-verified CSV/data -> Admin validation/import -> Node.js ingestion service -> MongoDB -> Express API -> React Native + Expo. (Direct AGMARKNET scraping feeds and Redis storage are deprecated for P0).
*   **Knowledge Manuals:** Curated official ICAR PDF documents (PLANNED).

---

## 15. TESTING
*   **Status:** PLANNED / NOT_STARTED (No automated test suites exist yet).

---

## 16. KNOWN BUGS
None (no code exists).

---

## 17. TECHNICAL DEBT
None.

---

## 18. ARCHITECTURAL DECISIONS

### ADR-001: P0 Cloud Vision Architecture
*   **Decision:** P0 uses the abstract `CropVisionProvider` interface backed by the configured cloud vision provider (e.g. Gemini 1.5 Flash Vision model or equivalent) without self-hosted GPU containers, ONNX runtime workers, Celery brokers, or Redis queues.
*   **Date:** 2026-08-20

### ADR-002: Land Photo Progressive Onboarding
*   **Decision:** Utilize land photo capture during profile setup to automatically determine soil type class, with manual override and GPS location capture.
*   **Date:** 2026-08-20

### ADR-003: Multi-Weather Scenario Risk Simulation
*   **Decision:** Implement a scenario risk calculator comparing utilities for Frost, Heatwaves, and Cyclones in addition to Rain.
*   **Date:** 2026-08-20

### ADR-004: Folk-Art Inspired Sketch UI Styling
*   **Decision:** Bypassed corporate SaaS styles in favor of a local hand-drawn outline sketch visual identity using dark charcoal outlines on warm beige surfaces for outdoor readability.
*   **Date:** 2026-08-20

### ADR-005: Decoupled Weather Provider Abstraction
*   **Decision:** Decoupled weather queries using an abstract `WeatherProvider` interface with contract boundaries (`getCurrentWeather`, `getHourlyForecast`, `getDailyForecast`, `getWeatherAlerts`), making it easy to swap OpenWeatherMap for another service.
*   **Date:** 2026-08-20

### ADR-006: Configurable LLM Model Bindings
*   **Decision:** Decoupled model identifiers using env variables `AI_PROVIDER`, `AI_TEXT_MODEL`, and `AI_VISION_MODEL` under an abstract `AIProvider` wrapper, avoiding hard-coding model families.
*   **Date:** 2026-08-20

### ADR-007: Normalized Multilingual Database Schema
*   **Decision:** Rejected adding column suffixes (e.g. `crop_name_en`) in favor of a normalized `localized_translations` schema table mapping `entity_type`, `entity_id`, `field_name`, `language_code`, and `translated_value`, enabling seamless extensions up to 22-25 Indian languages.
*   **Date:** 2026-08-20

### SUPERSEDED ARCHITECTURE HISTORY
The following technical designs were proposed in original conception sessions and rejected or deferred during the pre-implementation architecture audits:
*   **Backend Monolith:** Python (FastAPI) was replaced by Node.js (Express.js) to leverage MERN stack conventions and shared TypeScript contracts.
*   **Database & Search:** PostgreSQL (with PostGIS and pgvector) and SQLAlchemy/Alembic migrations were superseded by MongoDB (with GeoJSON shapes and 2dsphere indexing) and Mongoose, reducing deployment complexity for MVP RAG manuals.
*   **Background Queues:** Celery and Redis as the P0 task queue were replaced by lightweight in-memory async tasks or `node-cron` routines.
*   **AI Frameworks:** LangChain was rejected in favor of native model-provider SDKs and explicit tool registries.
*   **Data Feeds:** Live AGMARKNET portal scrapers were replaced by static, verified CSV price uploads to prevent ASPX site failures.

---

## 19. RECENT CHANGES

### 2026-08-20
*   Created all product specifications (`vision.md`, `personas.md`, `feature-map.md`, `user-flows.md`).
*   Created all technical and UX blueprints (`system-architecture.md`, `ai-architecture.md`, `data-architecture.md`, `api-architecture.md`, `design-system.md`, `ui-library-guide.md`).
*   Created design system theme and animation tokens (`theme.ts`, `animation.ts`).
*   Initialized empty git repository tracking all specifications.

---

## 20. NEXT STEPS

### NEXT — DO THIS FIRST
1.  Initialize the React Native + Expo application shell.
2.  Initialize the Node.js + Express TypeScript modular backend.
3.  Establish MongoDB/Mongoose connection and configuration.
4.  Establish shared types/contracts.
5.  Establish design system and native animation primitives.
6.  Establish authentication foundation.
7.  Verify the entire foundation.
8.  Begin the first vertical P0 feature slice.

### THEN
1.  Implement Onboarding Screens (Language Selector, Phone OTP verification).
2.  Setup Mongoose database schemas matching the conceptual models.

---

## 21. RECOMMENDED NEXT TASK

# Recommended Next Task

Task:
Initialize the React Native + Expo App Boilerplate

Why:
To establish the frontend codebase shell and start integrating our design tokens (`theme.ts` and `animation.ts`) and navigation tabs.

Prerequisites:
Node.js environment available on the machine.

Expected files:
*   `package.json`
*   `app.json`
*   `App.tsx` (or entrypoint)
*   `tsconfig.json`

Success criteria:
*   Project is initialized via Expo CLI.
*   Compilation succeeds.
*   The application starts up on a simulator or device.

Risk:
Low. Standard boilerplate initialization.
