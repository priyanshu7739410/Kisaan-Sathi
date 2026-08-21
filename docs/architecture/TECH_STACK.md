# Kisan Sathi Technology Stack

This document locks the technology stack parameters for the Kisan Sathi MERN-style mobile platform.

| Layer | Technology | P0/P1/P2 | Decision |
| :--- | :--- | :--- | :--- |
| **Mobile Client** | React Native | P0 | LOCKED |
| **Mobile Runtime** | Expo | P0 | LOCKED |
| **Language** | TypeScript | P0 | LOCKED |
| **Backend** | Node.js | P0 | REQUIRED |
| **API** | Express.js | P0 | REQUIRED |
| **Database** | MongoDB (Mongoose ORM) | P0 | REQUIRED |
| **Server State** | TanStack Query | P0 | REQUIRED |
| **Client State** | Zustand | P0 | REQUIRED |
| **Validation** | Zod | P0 | REQUIRED |
| **Authentication** | Phone OTP (JWT Tokens) | P0 | REQUIRED |
| **AI** | Configurable Provider Abstraction | P0 | REQUIRED |
| **Vision** | CropVisionProvider | P0 | REQUIRED |
| **Search** | MongoDB Text Indexes | P0 | REQUIRED |
| **Storage** | S3-compatible Object Storage | P0 | REQUIRED |
| **Maps** | MapLibre (Expo) + GeoJSON | P0 | REQUIRED |
| **Notifications** | Expo Notifications | P0 | REQUIRED |
| **Animation** | Moti (Reanimated-backed) | P0 | REQUIRED |
| **Charts** | Victory Native + SVG | P0 | REQUIRED |
| **Testing** | Jest + Vitest + Supertest | P0 | REQUIRED |
| **Deployment** | EAS (Mobile) + Docker / Render (Backend) + MongoDB Atlas | P0 | REQUIRED |

---

## Technical Rationales

### 1. Database Access Layer: Mongoose
We select **Mongoose** over the official raw MongoDB driver for P0:
*   **Structured Schemas:** Provides built-in declarative schema definitions and strong type safety when combined with TypeScript.
*   **Validation hooks:** Zod can be used at boundary endpoints while Mongoose validates native database constraints.
*   **Middleware:** Allows easy integration of pre/post hooks (e.g. automatically updating `updatedAt` keys or hashing tokens).

### 2. Localization: i18next & react-i18next
*   UI translations are stored locally as static JSON files in the Expo bundle.
*   Dynamic entity content is resolved from the MongoDB `localized_translations` collection.

### 3. Server State: TanStack Query
*   Used for caching server requests, pagination, automatic retries, and managing offline synchronization flows.
