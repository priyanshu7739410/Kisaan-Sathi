# Kisan Sathi Pre-Implementation Audit

> [!NOTE]
> **Superseded History:** This audit was performed when the backend was FastAPI/Postgres and the frontend was React Native. It has been updated to align with the locked P0 MERN-style web architecture (React + TypeScript web client, Node.js/Express backend, MongoDB/Mongoose). The original findings are preserved for context.

This audit evaluates the previous Kisan Sathi specifications to identify architectural bottlenecks, over-engineered modules, data dependencies, and safety gaps prior to codebase initialization.

---

## Executive Summary
Kisan Sathi is specified as an AI-powered agricultural intelligence web platform. To ensure a successful and reliable launch, we must strip away speculative features, simplify the AI stack, and enforce absolute safety boundaries around agricultural recommendations.

---

## Critical Issues
1.  **Premature Infrastructure Scaling:** Hosting self-hosted ONNX models on dedicated GPU Celery workers introduces severe deployment complexity for an MVP.
2.  **API Data Dependency (Agmarknet):** Relying on web scraping ASP.NET forms in production will result in frequent service outages. Use weekly-updated mandi CSV benchmarks.
3.  **Chatbot Over-Engineering (LangChain):** Using LangChain adds an unnecessary orchestration abstraction.
4.  **Database Over-Engineering (pgvector):** Replaced with **MongoDB Text Search** indexing, which is perfectly suited for our crop manual search queries.
5.  **P2P Forum Liability:** Allowing unmoderated community posts on crop chemicals introduces severe crop loss risks.
6.  **Mobile App Focus:** Initial mobile designs (Expo/React Native) are deprecated in favor of a responsive web platform accessible via low-end mobile browsers.

---

## Product Gaps
*   **Offline Failure Modes:** The specs lack detail on what the user sees when offline during diagnostic uploads (e.g., local storage compression and queue retries).

---

## MVP Recommendation
We recommend a **strictly constrained vertical slice (P0 MVP)** focusing on the core value loop:
`Farmer Profile -> GPS Location -> Crop Cycle -> Weather Threat Alert -> AI Scenario Simulation -> Actionable Task`.

### What the MVP Proves:
*   That farmers can input data and receive immediate, actionable recommendations during weather threats via a mobile web browser.
*   That leaf-photo disease classification works with a verified confidence checkpoint.

### What the MVP Excludes:
*   P2P Farmer Forum / Reddit Board.
*   Buyer Offer Marketplace / Trader Registration.
*   Self-hosted GPU Workers.

---

## Feature Map Corrections
*   **Downgrade to P2/P3:** `Local Buyer Marketplace` and `P2P Kisan Community Hub`.
*   **Upgrade to P0:** Web local storage image buffering for offline captures.

---

## UX Corrections
*   **Offline Mode:** Enforce local compression of leaf images before upload to handle poor network contexts.
*   **Accessibility:** Design high-contrast layouts readable in direct sunlight.

---

## Architecture Corrections
*   **Consolidate Backend:** Eliminate the GPU worker pool. Route all vision inference directly through a cloud vision API handler (Alternative 1) for the MVP.
*   **Simplified RAG:** Store crop manual text chunks in MongoDB and query them using MongoDB Text Search.

---

## AI Corrections
| Technology | Status | Recommendation |
| :--- | :--- | :--- |
| **LangChain** | REMOVE | Use native Node.js SDK functions. |
| **ONNX Workers** | USE LATER | Re-evaluate post-MVP validation. |
| **pgvector** | REMOVE | Use MongoDB Text Search index matching. |
| **Gemini 1.5 Flash**| USE NOW | Ideal for high-speed vision & RAG text. |

---

## Multilingual Corrections
*   **Translation Layer:** Store UI translation files (`json`) locally in the web app client build.

---

## Safety Corrections
*   **Dosage Protection:** The backend system must pass all AI outputs through a validator. If the output recommends a chemical/dosage not found in our manual registry, the response is blocked.

---

## UI Library Corrections
*   **Moti / Reanimated** | REMOVE | Replaced with React web animation tools. |
| **React Bits / Anime.js / Motion / Bklit** | USE NOW | Excellent compatibility with React Web. |

---

## Database Corrections
*   **Remove Entities:** `buyer_profiles`, `buyer_offers`, `community_posts`, `community_comments` from MVP.
*   **Retain Entities:** `users`, `farms`, `crop_cycles`, `activity_logs`.

---

## Recommended Final Architecture
A clean **Node.js/Express Backend + React Web Client** using MongoDB (Mongoose) and the Gemini Node.js SDK for tool routing.

---

## Recommended Implementation Order
1.  Initialize the React web client shell (Vite, TS) with Outfit/Inter typography.
2.  Initialize the Node.js/Express backend with basic routes and Mongoose models.
