# Kisan Sathi AI & RAG Architecture

> [!NOTE]
> **Superseded History:** This AI architecture blueprint was written when RAG vector search utilized `pgvector` and the agent pipeline ran on LangChain. It has been superseded by the locked P0 direct model SDK integrations and MongoDB Text Search indexing. Stale RAG database/orchestrator references in this document are preserved for historical context only.

This document specifies the AI processing pipelines, safety checkpoints, and Retrieval-Augmented Generation (RAG) configuration.

---

## 1. AI Orchestrator & Tool Routing

The Chatbot system does not let the LLM execute code directly. It uses an **AI Orchestration Framework** (e.g. LangChain or native Python tool-calling routers) to bind system tools:

```
Farmer Query (Voice/Text)
       │
       ▼
┌──────────────┐
│  FastAPI WS  │
└──────┬───────┘
       │
       ▼
┌──────────────┐      ┌────────────────────┐
│ AI Router    ├─────►│ Tool Router        │
│ (Gemini LLM) │      └────────┬───────────┘
└──────┬───────┘               │
       │                       ▼
       │               [Weather Tool]     -> Call OpenWeather API
       │               [Crop Tracker]     -> Fetch active farm logs
       │               [Knowledge RAG]    -> Vector search manuals
       │               [Scheme Finder]    -> Search SQL database
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
2.  **Widget Message:** If a tool resolves (e.g. weather search), the payload contains structured widget data to be interpreted by native React Native components: `{ "type": "widget", "widget_type": "weather", "data": { ... } }`.

---

## 2. Photo AI Diagnostic Pipeline

The crop leaf diagnostic system enforces the farmer crop confirmation checkpoint to prevent incorrect treatment recommendations:

```
Land/Leaf Photo Uploaded
       │
       ▼
┌──────────────────────────────────────┐
│ Phase 1: On-Device Image Check       │ -> Throw error if offline or upload fails
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
*   **Alternative 1 (MVP Default):** `CloudVisionSolver` uses HTTP requests to send images to Gemini 1.5 Flash Vision models using custom prompts for high-speed diagnostic execution.
*   **Alternative 2 (Production Target):** `LocalONNXWorkerSolver` serializes the task details and pushes it to the Celery Redis queue, where custom ONNX models process inference on dedicated GPU workers.
*   *Switching mechanism:* Configured via a backend environment variable `VISION_SOLVER_MODE=cloud|local`, requiring no alterations to the REST API endpoints or client mobile app code.

---

## 3. Scenario-Based Risk Analysis Engine

The Scenario Decision Engine operates by evaluating the intersection of three inputs: **Active Crop Stage**, **Probabilistic Weather Model**, and **Market Economics**. 

### A. Algorithm Inputs
1.  **Weather Forecast API Data (`W`):** 
    *   Precipitation Probability ($P_{rain}$), expected rainfall volume ($V_{rain}$ in mm).
    *   Minimum Temperature ($T_{min}$ in °C) for frost snaps.
    *   Maximum Temperature ($T_{max}$ in °C) for heatwaves.
    *   Wind Speed ($S_{wind}$ in km/h) for cyclones/storms.
2.  **Crop Cycle Logging Context (`C`):** Crop type, sowing date, and current lifecycle maturity stage ($M_{crop}$ from 0% to 100%).
3.  **Market Price Context (`M`):** Base Mandi Price ($P_{base}$) and loss coefficients based on quality degradation.

### B. Output Payoff Matrix Calculation (By Weather Threat)

#### Threat 1: Rain & Harvest (Wet weather)
*   **Scenario A: Harvest Early (Before Rain):** $U_A = \text{Size} \times \text{Yield} \times M_{crop} \times P_{base}$
*   **Scenario B: Delay Harvest (Rain Occurs):** $U_B = \text{Size} \times \text{Yield} \times P_{base} \times (1 - (V_{rain} \times K_{moisture})) \times (1 - P_{lodging})$
*   **Scenario C: Delay Harvest (Rain Fails):** $U_C = \text{Size} \times \text{Yield} \times 1.0 \times P_{base}$

#### Threat 2: Frost snap ($T_{min} \le 2\text{°C}$)
*   **Scenario A: Irrigate Field Early (Warms Soil):** $U_A = (\text{Size} \times \text{Yield} \times P_{base}) - \text{Cost}_{water} - \text{Cost}_{labor}$ (Saves 95% of yield)
*   **Scenario B: Do nothing (Frost occurs):** $U_B = \text{Size} \times \text{Yield} \times P_{base} \times (1 - K_{frost\_loss})$ (Yield loss coefficient $K_{frost\_loss}$ up to 80%)
*   **Scenario C: Do nothing (Frost fails):** $U_C = \text{Size} \times \text{Yield} \times P_{base}$ (Saves labor/water cost)

#### Threat 3: Heatwave & Drought ($T_{max} \ge 40\text{°C}$)
*   **Scenario A: Apply Straw Mulch & Deep Watering:** $U_A = (\text{Size} \times \text{Yield} \times P_{base}) - \text{Cost}_{mulch} - \text{Cost}_{irrigation}$
*   **Scenario B: Do nothing (Heatwave occurs):** $U_B = \text{Size} \times \text{Yield} \times P_{base} \times (1 - K_{wilting})$ (Yield loss due to wilting and transpiration drop)
*   **Scenario C: Do nothing (Heatwave fails):** $U_C = \text{Size} \times \text{Yield} \times P_{base}$

#### Threat 4: High Winds / Storm ($S_{wind} \ge 40\text{ km/h}$)
*   **Scenario A: Stake Crops & Postpone Spraying:** $U_A = (\text{Size} \times \text{Yield} \times P_{base}) - \text{Cost}_{staking\_labor}$ (Prevents stem breakage and chemical drift drift waste)
*   **Scenario B: Do nothing (Storm occurs):** $U_B = \text{Size} \times \text{Yield} \times P_{base} \times (1 - K_{wind\_lodging}) - \text{Cost}_{drift\_waste}$
*   **Scenario C: Do nothing (Storm fails):** $U_C = \text{Size} \times \text{Yield} \times P_{base}$

### C. LLM Explanation Generation
Once the selected weather threat matrix is computed, the values are fed into the LLM context prompt:
```
System Prompt: Translate the following payoff matrix into a clear, local-language recommendation for the farmer. Focus on actionable trade-offs (e.g. costs of early action vs. crop loss risks). Under no circumstances fabricate weather percentages.
Payoff Data: [Scenario A utility, Scenario B utility, Scenario C utility]
```

---

## 4. Knowledge RAG Ingestion Pipeline

To support reliable Chat responses, crop manuals and government scheme documents are processed via a strict chunking and retrieval flow:

1.  **Ingestion:** Scrape and parse official PDF documents (ICAR manuals, state university guides).
2.  **Cleaning:** Strip formatting, isolate tables (tables are transformed to Markdown tables to preserve structure).
3.  **Chunking:** Parent-Child chunking strategy. Primary chunks: 512 tokens with 10% overlap. Child chunks: 128 tokens for exact matches.
4.  **Embeddings:** Generate vector representations using `text-embedding-3-small` or equivalent.
5.  **Storage:** Store vector embeddings in PostgreSQL using the `pgvector` index (`HNSW` index for fast retrieval).
6.  **Citations:** Every retrieved chunk holds metadata: `{source_pdf_name: "Cotton_Manual_ICAR.pdf", page: 12, last_updated: "2026-03-01"}`.
7.  **Official Translation Enforcement:** Technical agricultural terminology matches official government multilingual databases, preventing local dialect confusion.

---

## 5. AI Community Anomaly & Safety Scanner

To balance peer-to-peer open communication with platform liability safety, the forum uses a hybrid moderation pipeline:

### A. Automatic Advice Disclaimers
When the frontend displays any post categorized under *Advice*, it automatically appends a standard, visual disclaimer tag:
> **Peer Suggestion Disclaimer:** The following advice is posted by a community member and is not verified by agronomists. For officially approved treatments, check the Photo AI tab or consult standard crop guides.

### B. AI Background Anomaly Scan
When a comment or post is created, the system triggers a background Celery task to scan the text using our RAG/Pest manuals database:
1.  **Chemical & Quantity Extraction:** A lightweight Named Entity Recognition (NER) model extracts chemical names, application rates, and units (e.g., *Glyphosate*, *10 Liters*, *per acre*).
2.  **RAG Guideline Comparison:** The system queries the `rag_documents` vector database for standard guidelines relating to that chemical.
3.  **Mismatch Flagging:** 
    *   If the extracted quantity deviates significantly from the ICAR baseline (e.g. over $3\times$ the recommended dose, or a mismatch in water mixing ratios), the post's database entry is updated: `has_anomaly_warning = true`.
    *   The frontend displays a bright warning badge inline on the comment:
        > ⚠️ **Warning:** The suggested quantity deviates significantly from standard guidelines ($1\text{ L/acre}$). Double check before applying.
    *   The post is flagged in the Admin moderating queue for review by Persona E.

