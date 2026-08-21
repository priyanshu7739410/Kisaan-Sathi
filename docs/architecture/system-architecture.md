# Kisan Sathi Technical System Architecture

This document specifies the technical architecture blueprint for the Kisan Sathi mobile app and backend system, matching our project constraints.

---

## 1. High-Level Blueprint (Modular Monolith)

Kisan Sathi implements a **Modular Monolith** backend structure in Express.js (Node.js) to limit network latency and infrastructure complexity, while retaining clean domain boundaries (Onboarding, Calendar, Weather, Vision, Chat) inside a single deployable unit.

```mermaid
graph TD
    %% Frontend Layer
    RN["React Native / Expo App (TS)"]
    SQLite["Local SQLite Cache (Offline Log)"]
    RN -- Local Cache -- SQLite

    %% Networking
    RN -- HTTPS / REST APIs -- API_Gateway["Express API Gateway"]
    RN -- WebSocket -- Chat_Stream["Express Chat WS Server"]

    %% Backend Monolith
    subgraph "Express Backend (Modular Monolith)"
        API_Gateway
        Chat_Stream
        AuthMod["Auth & Profile Module"]
        TrackMod["Crop Calendar Module"]
        WeathMod["Weather Intelligence Module"]
        VisionMod["Photo AI / Vision Module"]
        RAGMod["RAG / Chat Module"]
    end
    
    %% Storage & Database
    AuthMod -- Read/Write -- DB["MongoDB + GeoJSON"]
    TrackMod -- Read/Write -- DB
    RAGMod -- Text Query -- DB
    
    %% External API Integrations
    WeathMod -- Fetch Forecast -- OpenWeather["OpenWeather API"]
    VisionMod -- Fetch image -- S3["S3 Object Storage"]
```

---

## 2. Component Technology Stack

### Frontend Mobile Application
*   **Core:** React Native, managed via **Expo (TypeScript)**.
*   **Local Caching:** SQLite database (via `expo-sqlite`) logging offline event actions.
*   **Networking:** Axios client with automated retry and synchronization queues.
*   **Push Notifications:** Firebase Cloud Messaging (FCM) via Expo Notifications.

### Backend Infrastructure
*   **Framework:** **Node.js (Express.js) + TypeScript**. Handles HTTP requests and web socket connections.
*   **Task Queue / Cron:** Standard async handlers and **node-cron** tasks for background updates.
*   **Database:** **MongoDB** accessed via **Mongoose**.
    *   **GeoJSON 2dsphere index:** Used for geospatial polygon coordinates checks.
    *   **Text indexes:** Used for lexical agricultural knowledge search.
*   **Storage:** **S3-compatible object storage** (e.g. AWS S3 or MinIO) for crop leaf images.
*   **Deployment:** **Docker Compose** orchestrating Node.js server, MongoDB, and ObjectStorage containers. Production deployments utilize EAS for mobile app, Render/Railway for Express, and MongoDB Atlas for database.
