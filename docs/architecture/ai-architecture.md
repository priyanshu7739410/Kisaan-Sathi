# Kisan Sathi AI & RAG Architecture

This document specifies the AI processing pipelines, safety checkpoints, and Retrieval-Augmented Generation (RAG) configuration on the MERN Web stack.

---

## 1. AI Orchestrator & Tool Routing

The Chatbot system does not let the LLM execute code directly. It uses an **AI Orchestration Layer** running on the Node/Express server (integrated directly using the Model Cloud SDK) to bind system tools:

```
Farmer Query (Voice/Text)
       │
       ▼
┌──────────────┐
│ Express Port │
└──────┬───────┘
       │
       ▼
┌──────────────┐      ┌────────────────────┐
│ AI Router    ├─────►│ Tool Router        │
│ (Gemini LLM) │      └────────┬───────────┘
│  Node SDK    │               │
└──────┬───────┘               ▼
       │               [Weather Tool]     -> Call OpenWeather API
       │               [Crop Tracker]     -> Fetch active farm logs
       │               [Knowledge RAG]    -> Text search manuals (MongoDB)
       │               [Scheme Finder]    -> Search Schemes collection
       ▼
┌──────────────┐
│ Safety Agent │◄───── Verify output contains no hallucinated dosages
└──────┬───────┘
       │
       ▼
Farmer Response (Heterogeneous JSON)
```

### Heterogeneous Response Schema
When a tool is executed, the AI Orchestrator does not return pure markdown text. Instead, it responds with a structured JSON payload:
1.  **Text Message:** If no tool is triggered, the payload contains standard text: `{ "type": "text", "body": "How can I help you today?" }`.
2.  **Widget Message:** If a tool resolves (e.g. weather search), the payload contains structured widget data to be interpreted by React frontend components: `{ "type": "widget", "widget_type": "weather", "data": { ... } }`.

---

## 2. Photo AI Diagnostic Pipeline

The crop leaf diagnostic system enforces the farmer crop confirmation checkpoint to prevent incorrect treatment recommendations:

```
Land/Leaf Photo Uploaded
       │
       ▼
┌──────────────────────────────────────┐
│ Phase 1: On-Device Image Check       │ -> Verify size (<500KB) and upload
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 2: Server-Side Crop Detection  │ -> Identify Crop type (e.g. Cotton)
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 3: Farmer Crop Confirmation    │ -> Farmer validates crop type in UI
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Phase 4: Disease Diagnosis Model     │ -> Vision Model classifies disease
└──────────────────┬───────────────────┘
                   │
                   ├─── Confidence >= 75% ──► [Retrieve Verbatim ICAR Citation]
                   │
                   └─── Confidence < 75%  ──► [Create Expert Escalation Ticket]
```

### Abstract Vision Solver Interface
To guarantee seamless migration from the cloud API to self-hosted models, Phase 4 executes through an abstract **`CropVisionSolver`** class:
*   `diagnose_leaf_image(image_bytes, crop_type) -> DiagnosticResult`:
*   **Alternative 1 (MVP Default):** `CloudVisionSolver` uses the Model Cloud SDK (Gemini 1.5 Flash) to process images.
*   **Alternative 2 (Production Target):** `LocalONNXWorkerSolver` processes inference locally via ONNX Runtime inside Node.js worker threads.
*   *Switching mechanism:* Configured via a backend environment variable `VISION_SOLVER_MODE=cloud|local`, requiring no alterations to the client web application code.

---

## 3. Scenario-Based Risk Analysis Engine

The Scenario Decision Engine operates by evaluating the intersection of three inputs: **Active Crop Stage**, **Probabilistic Weather Model**, and **Market Economics**. 

### Payne Matrix Utility calculations
Identical formulas apply for calculating the payoffs of various farmer scenarios (e.g., harvesting early, irrigating before frost, applying straw mulch, or staking crops) based on incoming weather forecast temperature and wind parameters. The computed payload is formatted by the Express backend and presented as responsive web cards to the farmer.

---

## 4. Knowledge RAG Ingestion Pipeline

To support reliable Chat responses, crop manuals and government scheme documents are processed via a strict chunking and retrieval flow:

1.  **Ingestion:** Scrape and parse official PDF documents (ICAR manuals, state university guides).
2.  **Cleaning:** Strip formatting, isolate tables (tables are transformed to Markdown tables to preserve structure).
3.  **Chunking:** Parent-Child chunking strategy. Primary chunks: 512 tokens with 10% overlap. Child chunks: 128 tokens for exact matches.
4.  **Storage & Indexing:** Chunks are saved in the `knowledge_chunks` collection in MongoDB. Lexical search is implemented via **MongoDB Text Indexes**.
5.  **Citations:** Every retrieved chunk holds metadata: `{source_pdf_name: "Cotton_Manual_ICAR.pdf", page: 12, last_updated: "2026-03-01"}`.

---

## 5. AI Community Anomaly & Safety Scanner

*   **P2P Peer Suggestions:** When the React web client displays comments or posts categorized under *Advice*, it automatically appends a standard, visual disclaimer tag.
*   **Background Scanning:** Creating comments triggers a background async function (via Node.js event emitter or async queues) to extract chemical names and application rates. If the dosage deviates significantly from the recommended ICAR baseline in MongoDB, a safety warning badge (`has_anomaly_warning = true`) is updated and rendered on the post.

---

## 6. SUPERSEDED / HISTORICAL (AI References)

> [!NOTE]
> The following technologies are **superseded** and listed for historical tracking:
> *   **LangChain / Custom Agent Libraries:** Replaced by direct Model Cloud SDK integrations in Node.js to keep execution logic lightweight.
> *   **pgvector / HNSW vector indexing:** Replaced by MongoDB Text Search for lexical agricultural matching.
> *   **Celery / Redis Queues:** Replaced by standard Node async event flows.
