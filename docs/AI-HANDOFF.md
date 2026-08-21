# Kisan Sathi — AI Handoff

```
CURRENT ARCHITECTURE STATUS: GO

CURRENT STACK:
React + TypeScript (Web Application via Vite)
Node.js + Express + TypeScript (Modular Monolith)
MongoDB + Mongoose

IMPLEMENTATION STATUS:
PLANNED / RESET

CURRENT TASK:
Initialize MERN Web Application (Vite frontend shell & Node.js backend)

SUPERSEDED ARCHITECTURE:
React Native / Expo / iOS / Android / SQLite (Historical only)
FastAPI / PostgreSQL / Celery / pgvector / LangChain (Historical only)
```

## 1. Current Project State
*   **Tech Stack Statement:** The application is a Web Application. The frontend runs React with TypeScript and Vite. The backend is Node.js with Express.js and TypeScript. The database is MongoDB with Mongoose.
*   **Current Phase:** FOUNDATION (Completed). Code Implementation (Planned).
*   **Current Objective:** Initialize Vite React frontend and Node/Express backend shells.
*   **Architecture specification:** COMPLETE
*   **P0 implementation:** PLANNED
*   **P1/P2 specification:** DEFINED / DEFERRED
*   **Current Branch:** `master`
*   **Frontend Status:** PLANNED / NOT_STARTED
*   **Backend Status:** PLANNED / NOT_STARTED
*   **Database Status:** PLANNED / NOT_STARTED
*   **AI Status:** PLANNED / NOT_STARTED
*   **Design System Status:** PARTIALLY_COMPLETE (Typography, spacing, colors, and accessibility tokens defined in markdown).
*   **Testing Status:** PLANNED / NOT_STARTED
*   **Deployment Status:** PLANNED / NOT_STARTED

---

## 2. CURRENT TASK
*   **Task:** Web Monolith/Workspace initialization.
*   **Reason:** Establish Vite React web client shell and Node.js Express server boilerplates with Mongoose connections.
*   **Expected Outcome:** Monorepo setup ready for P0 web implementation.
*   **Status:** GO (Code implementation ready to initialize)
*   **Files Involved:**
    *   [P0_ARCHITECTURE_LOCK.md](file:///d:/kisan/docs/architecture/P0_ARCHITECTURE_LOCK.md)
    *   [TECH_STACK.md](file:///d:/kisan/docs/architecture/TECH_STACK.md)
*   **Blockers:** None.

---

## 3. WARNING FOR FUTURE AGENTS
> [!WARNING]
> **DO NOT IMPLEMENT REACT NATIVE OR EXPO.**
> Kisan Sathi is exclusively a web application. Do not create mobile apps, do not launch Android Studio, do not run EAS build, and do not use Expo.

---

## 4. PRODUCT FEATURE MAP

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
- [PLANNED] Photo upload dropzone (P0)
- [PLANNED] Crop selection validation checkpoint (P0)
- [PLANNED] Leaf disease detection (P0)
- [PLANNED] RAG Chemical treatment citations card (P0)
- [PLANNED] Expert escalation queue creation (P0)

### AI Chat
- [PLANNED] Text/Voice conversation thread (P0)
- [PLANNED] RAG search tool integration (P0)
- [PLANNED] Heterogeneous Inline Rich UI Widgets rendering (P0)

---

## 5. VIEW / ROUTE INVENTORY

| View | Module | Status | Route | Implemented | Tested |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Onboarding Language Selector | Onboarding | PLANNED | `/select-language` | No | No |
| Phone Auth Input | Onboarding | PLANNED | `/login` | No | No |
| SMS Verification Form | Onboarding | PLANNED | `/login/verify` | No | No |
| Land Photo Upload Setup | Onboarding | PLANNED | `/onboard/photo`| No | No |
| Soil Confirmation Overlay | Onboarding | PLANNED | (modal) | No | No |
| Crop Selector Grid | Onboarding | PLANNED | `/onboard/crops` | No | No |
| Home Dashboard Hub | Home | PLANNED | `/dashboard` | No | No |
| Scenario Simulator Card | Home | PLANNED | (modal) | No | No |
| Smart Calendar Tracker | Calendar | PLANNED | `/tracker` | No | No |
| Retroactive Activity Form | Calendar | PLANNED | `/tracker/log` | No | No |
| Photo AI Capture View | Photo AI | PLANNED | `/diagnose` | No | No |
| Crop Validation Step | Photo AI | PLANNED | `/diagnose/verify` | No | No |
| Disease Result Dashboard | Photo AI | PLANNED | `/diagnose/report` | No | No |
| Chat thread | Chat | PLANNED | `/chat` | No | No |

---

## 6. ARCHITECTURE

### Frontend (PLANNED)
*   **Framework:** React + TypeScript (Vite).
*   **Animations:** React Bits, Motion (formerly Framer Motion), Anime.js.

### Backend (PLANNED)
*   **Framework:** Express.js / Node.js modular monolith.
*   **Queue/Cron:** In-memory schedules or node-cron.

### Database (PLANNED)
*   **Engine:** MongoDB (Mongoose ODM) + GeoJSON 2dsphere indexes.

### AI (PLANNED)
*   **Orchestration:** Direct Gemini model SDK integration with explicit Tool Registry.
*   **Ingestion:** MongoDB text search queries over local manuals.
*   **Vision Solver:** Abstract solver with Cloud API fallback.

---

## 7. RECENT CHANGES

### 2026-08-21
*   Reset old React Native/Expo implementation and backed up all specifications.
*   Updated all documentation and guidelines to target responsive MERN Web Platform.

---

## 8. NEXT STEPS
1.  Initialize the React Web application shell (Vite, TS) in the workspace root.
2.  Initialize the Node.js + Express TypeScript modular backend.
3.  Establish MongoDB/Mongoose connection and configuration.
