# Kisan Sathi Pre-Implementation Audit

> [!NOTE]
> **Superseded History:** This audit was performed when the backend architecture was specified as Python/FastAPI/Postgres. It has since been superseded by the locked P0 MERN-style architecture (Node.js/Express + MongoDB). The recommendations here served as the catalyst for the stack migration and are preserved for historical context.

This audit evaluates the previous Kisan Sathi specifications to identify architectural bottlenecks, over-engineered modules, data dependencies, and safety gaps prior to codebase initialization.

---

## Executive Summary
Kisan Sathi is specified as an AI-powered agricultural intelligence platform. However, the current specifications introduce significant architectural complexity—such as self-hosted GPU ONNX containers, P2P community boards, and real-time scrapers—that are not viable or necessary for an MVP. 

To ensure a successful and reliable launch, we must strip away speculative features, simplify the AI stack, and enforce absolute safety boundaries around agricultural recommendations.

---

## Critical Issues
1.  **Premature Infrastructure Scaling:** Hosting self-hosted ONNX models on dedicated GPU Celery workers introduces severe deployment complexity (CUDA drivers, GPU VMs) for an MVP.
2.  **API Data Dependency (Agmarknet):** The official government portal has no reliable API. Relying on web scraping ASP.NET forms in production will result in frequent service outages.
3.  **Chatbot Over-Engineering (LangChain):** Using LangChain adds an unnecessary orchestration abstraction for simple, single-prompt tool routing.
4.  **Database Over-Engineering (pgvector):** Spinning up a specialized vector indexing system for a tiny corpus of crop manuals is unnecessary when standard PostgreSQL text search (`tsvector`) suffices for the MVP.
5.  **Multi-Language Voice Latency:** Translating regional voice notes (e.g., Marathi/Telugu speech) to English, running RAG, and generating TTS responses in the same thread will result in >10-second response latency.
6.  **P2P Forum Liability:** Allowing unmoderated community posts on crop chemicals introduces severe crop loss risks and legal liabilities for the platform.

---

## Product Gaps
*   **Offline Failure Modes:** The specs lack detail on what the user sees when offline during diagnostic uploads (e.g., local image caching and queue retries).
*   **Agronomist Review Workflow:** The "low confidence expert escalation" has API payloads but no defined dashboard layout or notifications system for the reviewing expert.

---

## MVP Recommendation
We recommend a **strictly constrained vertical slice (P0 MVP)** focusing on the core value loop:
`Farmer Profile -> GPS Location -> Crop Cycle -> Weather Threat Alert -> AI Scenario Simulation -> Actionable Task`.

### What the MVP Proves:
*   That farmers can input data and receive immediate, actionable recommendations during weather threats.
*   That leaf-photo disease classification works with a verified confidence checkpoint.

### What the MVP Excludes:
*   P2P Farmer Forum / Reddit Board.
*   Buyer Offer Marketplace / Trader Registration.
*   Self-hosted GPU Workers.

---

## Feature Map Corrections
*   **Downgrade to P2/P3:** `Local Buyer Marketplace` and `P2P Kisan Community Hub`.
*   **Upgrade to P0:** Local image background sync queues for offline captures.

---

## UX Corrections
*   **Offline Mode:** Enforce local compression of leaf images to <500KB before upload to handle poor 2G/3G network contexts.
*   **Accessibility:** Replace nested tabs with flat, button-driven layouts.

---

## Architecture Corrections
*   **Consolidate Backend:** Eliminate the GPU Celery worker pool. Route all vision inference directly through a cloud vision API handler (Alternative 1) for the MVP.
*   **Simplified RAG:** Store crop manual text chunks in standard SQL tables and query them using PostgreSQL Full-Text Search (`tsvector`) instead of `pgvector`.

---

## AI Corrections
| Technology | Status | Recommendation |
| :--- | :--- | :--- |
| **LangChain** | REMOVE | Use native Python SDK functions. |
| **ONNX Workers** | USE LATER | Re-evaluate post-MVP validation. |
| **pgvector** | REMOVE | Use simple `tsvector` queries. |
| **Gemini 1.5 Flash**| USE NOW | Ideal for high-speed vision & RAG text. |

---

## Data Source Corrections
*   **Market Prices:** Use static, monthly-updated regional baseline prices rather than live government portal scrapers.
*   **Weather:** Rely on the OpenWeatherMap OneCall API (3-hour forecasts are highly reliable).

---

## Multilingual Corrections
*   **Translation Layer:** Store UI translation files (`json`) locally in the app bundle.
*   **Speech-to-Text:** Use on-device Android/iOS native transcription engines rather than streaming raw audio payloads to cloud APIs.

---

## Safety Corrections
*   **Dosage Protection:** The backend system must pass all AI outputs through a regex parser. If the output recommends a chemical/dosage not found verbatim in our manual registry, the response is blocked and replaced with a fallback: *"Consult your local agricultural extension office."*

---

## Database Corrections
*   **Remove Entities:** `buyer_profiles`, `buyer_offers`, `community_posts`, `community_comments`.
*   **Retain Entities:** `users`, `farms`, `crop_cycles`, `activity_logs`, `weather_scenarios`.

---

## API Corrections
*   **Deprecate Endpoints:** `/marketplace/*`, `/community/*`.
*   **Consolidate Endpoints:** Simplify vision checks into a single transaction payload.

---

## UI Library Corrections
*   **Moti / Reanimated:** USE NOW (Standard animations).
*   **React Bits / Anime.js:** REMOVE (Not compatible with React Native).

---

## Performance Corrections
*   **Storage Optimization:** Compress image assets using `expo-image-manipulator` on-device before hitting HTTP boundaries.

---

## Security Corrections
*   **Geospatial Privacy:** Truncate coordinate inputs to 3 decimal places (~100m precision) before storing to prevent leaking exact farm locations.

---

## Architecture Decisions To Revisit
*   **Revisit ADR-001 (ONNX Inference):** Change target execution mode exclusively to `cloud` for the MVP.
*   **Revisit ADR-003 (Scenario-Based Risk Engine):** Keep math calculations on the backend FastAPI server; do not calculate weights in frontend components.

---

## Decisions Required From User
1.  **Do you approve deprecating the P2P Forum and Buyer Marketplace for the MVP?**
2.  **Do you approve using Gemini 1.5 Flash directly without LangChain or pgvector?**

---

## Recommended Final Architecture
A clean **FastAPI Monolith + React Native Expo Client** using PostgreSQL (without pgvector) and the Gemini Cloud SDK for prompt tool routing.

---

## Recommended Implementation Order
1.  Initialize React Native Expo shell with basic theme tokens.
2.  Initialize FastAPI backend with core routing and Gemini client SDK wrapper.
3.  Implement Local database (SQLite) cache sync queues.

---

## Go / No-Go Decision
# NO-GO

There are critical unresolved decisions (listed below) that must be answered before initializing the code repositories.
