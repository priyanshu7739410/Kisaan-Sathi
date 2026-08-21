# Kisan Sathi Technology Stack

This document locks the technology stack parameters for the Kisan Sathi MERN-style web platform.

| Layer | Technology | P0/P1/P2 | Decision |
| :--- | :--- | :--- | :--- |
| **Web Client Framework** | React + TypeScript | P0 | LOCKED |
| **Styling** | Vanilla CSS (Tailwind CSS only if explicitly requested) | P0 | LOCKED |
| **Build Tooling** | Vite | P0 | LOCKED |
| **Backend Framework** | Node.js + Express.js + TypeScript | P0 | REQUIRED |
| **Database** | MongoDB (Mongoose ODM) | P0 | REQUIRED |
| **Server State** | TanStack Query (React Query) | P0 | REQUIRED |
| **Client State** | Zustand | P0 | REQUIRED |
| **Validation** | Zod | P0 | REQUIRED |
| **Authentication** | Phone OTP (JWT Tokens) | P0 | REQUIRED |
| **AI Integration** | Configurable Provider Abstraction (Google Gemini API via Model Cloud SDK) | P0 | REQUIRED |
| **Vision Diagnosis** | CropVisionProvider (Gemini Pro Vision / Flash abstraction) | P0 | REQUIRED |
| **Search Engine** | MongoDB Text Indexes | P0 | REQUIRED |
| **Object Storage** | S3-compatible Object Storage | P0 | REQUIRED |
| **Maps** | MapLibre GL JS + GeoJSON | P0 | REQUIRED |
| **Notifications** | Web Push API (Service Workers) | P0 | REQUIRED |
| **Animation/Motion** | React Bits, Motion (formerly Framer Motion), Anime.js | P0 | REQUIRED |
| **Charts/Visuals** | Recharts (SVG based) | P0 | REQUIRED |
| **Testing** | Jest + Vitest + Supertest | P0 | REQUIRED |
| **Deployment** | Docker containers, Render/Railway (Web/Server) + MongoDB Atlas | P0 | REQUIRED |

---

## Technical Rationales & Strategy

### 1. Database Access Layer: Mongoose
We select **Mongoose** over the official raw MongoDB driver for P0:
*   **Structured Schemas:** Provides built-in declarative schema definitions and strong type safety when combined with TypeScript.
*   **Validation hooks:** Zod is used at HTTP boundaries while Mongoose validates database constraints.
*   **Middleware:** Easy integration of hooks (e.g., updating timestamps or hashing secrets).

### 2. Localization: i18next & react-i18next
*   UI translations are stored in static JSON files served with the web client.
*   Dynamic entity content is resolved from the MongoDB `localized_translations` collection.

### 3. Server State: TanStack Query
*   Used for caching, pagination, automatic retries, and managing offline synchronization flows.

### 4. Responsive Web & Accessibility Strategy
*   **Mobile-First Responsive Design:** The app must be fully responsive, scaling seamlessly from low-end mobile browsers to desktop displays.
*   **Accessibility (WCAG 2.1):** Enforce high contrast ratios (minimum 4.5:1, target 7:1 for outdoor sunlight use), clear typography, and keyboard accessibility. Respect platform-level reduced motion settings.
*   **Progressive Enhancement:** Core pages (Weather, Calendar) must function under slower connections (2G/3G networks) and degrade gracefully if advanced animations or scripts are unavailable.
