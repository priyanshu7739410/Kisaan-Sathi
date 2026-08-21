# Kisan Sathi Technical System Architecture

This document specifies the technical architecture blueprint for the Kisan Sathi web application and backend system, matching our project constraints.

---

## 1. High-Level Blueprint (Modular Monolith)

Kisan Sathi implements a **Modular Monolith** backend structure in Express.js (Node.js) to limit network latency and infrastructure complexity, while retaining clean domain boundaries (Onboarding, Calendar, Weather, Vision, Chat) inside a single deployable unit.

```mermaid
graph TD
    %% Frontend Layer
    Browser["Web Browser (Chrome/Safari/Firefox)"]
    ReactApp["React + TypeScript Web Client"]
    LocalStorage["Local Storage Cache (Offline Actions)"]
    
    Browser --> ReactApp
    ReactApp -- Sync Action -- LocalStorage

    %% Networking
    ReactApp -- HTTPS / REST APIs -- API_Gateway["Express API Gateway"]
    ReactApp -- WebSocket -- Chat_Stream["Express Chat WS Server"]

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

### Frontend Web Application
*   **Core:** React web app, managed via **Vite (TypeScript)**.
*   **Local Caching:** Web Storage (LocalStorage/IndexedDB) logging offline event actions.
*   **Networking:** Axios client with automated retry and synchronization queues.
*   **Push Notifications:** Web Push API via Service Workers.
*   **Animation System:** React Bits, Motion, and Anime.js.

### Backend Infrastructure
*   **Framework:** **Node.js (Express.js) + TypeScript**. Handles HTTP requests and web socket connections.
*   **Task Queue / Cron:** Standard async handlers and **node-cron** tasks for background updates.
*   **Database:** **MongoDB** accessed via **Mongoose**.
    *   **GeoJSON 2dsphere index:** Used for geospatial polygon coordinates checks.
    *   **Text indexes:** Used for lexical agricultural knowledge search.
*   **Storage:** **S3-compatible object storage** (e.g. AWS S3 or MinIO) for crop leaf images.
*   **Deployment:** **Docker Compose** orchestrating Node.js server, MongoDB, and ObjectStorage containers. Production deployments utilize Render/Railway for Express/Vite, and MongoDB Atlas for the database.
