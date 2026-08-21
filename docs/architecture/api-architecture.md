# Kisan Sathi API Architecture

REST API Endpoint specification for backend integration.

---

## 1. Authentication & Profiling

### `POST /api/v1/auth/request-otp`
*   **Description:** Initiates registration/login via phone number.
*   **Request Body:**
    ```json
    { "phone": "+919876543210" }
    ```
*   **Response (200 OK):**
    ```json
    { "message": "OTP sent successfully", "session_id": "uuid-temp" }
    ```

### `POST /api/v1/auth/verify-otp`
*   **Description:** Verifies SMS OTP token.
*   **Request Body:**
    ```json
    { "session_id": "uuid-temp", "otp_token": "123456" }
    ```
*   **Response (200 OK):**
    ```json
    { "token": "jwt-token-string", "is_new_user": true }
    ```

---

## 2. Onboarding & Farm Setup

### `POST /api/v1/farms/onboard`
*   **Description:** Uploads initial land photo to detect soil type.
*   **Request Content-Type:** `multipart/form-data`
*   **Request Body:**
    *   `file`: Binary (Land image)
    *   `latitude`: Float (Optional GPS)
    *   `longitude`: Float (Optional GPS)
*   **Response (201 Created):**
    ```json
    {
      "temp_farm_id": "farm-uuid",
      "detected_soil_type": "black_cotton",
      "latitude": 19.0760,
      "longitude": 72.8777
    }
    ```

### `POST /api/v1/farms/confirm`
*   **Description:** Confirms onboarding details.
*   **Request Body:**
    ```json
    {
      "temp_farm_id": "farm-uuid",
      "village_name": "Wadgaon",
      "size_acres": 2.5,
      "water_source": "borewell",
      "confirmed_soil_type": "black_cotton",
      "crops": ["cotton"]
    }
    ```
*   **Response (200 OK):**
    ```json
    { "message": "Farm registered successfully", "farm_id": "farm-uuid" }
    ```

---

## 3. Farm Tracker & Logging

### `POST /api/v1/tracker/logs`
*   **Description:** Logs an agricultural event (supports retroactive dates).
*   **Request Body:**
    ```json
    {
      "crop_cycle_id": "cycle-uuid",
      "activity_type": "fertilizer",
      "logged_date": "2026-06-01T10:00:00Z",
      "details": {
        "fertilizer_name": "Urea",
        "quantity_kg": 50
      }
    }
    ```
*   **Response (201 Created):**
    ```json
    {
      "log_id": "log-uuid",
      "message": "Activity logged",
      "triggered_alerts": [
        {
          "type": "nudge",
          "message": "Apply potash fertilizer on June 15th to complete nutrient cycle.",
          "suggested_date": "2026-06-15"
        }
      ]
    }
    ```

---

## 4. Photo AI Diagnosis

### `POST /api/v1/vision/detect-crop`
*   **Description:** Uploads leaf photo to identify crop type.
*   **Request Content-Type:** `multipart/form-data`
*   **Response (200 OK):**
    ```json
    { "analysis_id": "analysis-uuid", "detected_crop": "cotton" }
    ```

### `POST /api/v1/vision/diagnose`
*   **Description:** Executes disease diagnosis based on verified crop type.
*   **Request Body:**
    ```json
    { "analysis_id": "analysis-uuid", "confirmed_crop": "cotton" }
    ```
*   **Response (200 OK):**
    ```json
    {
      "disease": "Leaf Blight",
      "confidence": 88.5,
      "severity": "medium",
      "treatment": {
        "cultural_control": "Remove infected leaves, improve air circulation.",
        "chemical_citation": {
          "treatment_details": "Spray Copper Oxychloride at 0.3% dosage.",
          "source_manual": "ICAR Cotton Pest Guide 2025",
          "publication_date": "2025-04-12"
        }
      }
    }
    ```

---

## 5. AI Farmer Chatbot (WebSockets)

### `WS /api/v1/chat/ws`
*   **Description:** WebSocket channel for real-time conversation streaming.
*   **Client Message Schema:**
    ```json
    { "text": "Will it rain tomorrow?", "voice_audio_url": null }
    ```
*   **Server Message Schema (Heterogeneous Widget Payload):**
    ```json
    {
      "message_id": "message-uuid",
      "type": "widget",
      "widget_type": "weather",
      "data": {
        "precipitation_probability": 0.85,
        "hourly_forecast": [
          { "time": "09:00", "temp": 28, "condition": "cloudy" },
          { "time": "12:00", "temp": 30, "condition": "rain" }
        ],
        "spraying_alert": "Rain expected at 12:00. Delay pesticide application."
      },
      "source_citations": [
        { "source_name": "IMD Nagpur Feed", "retrieved_at": "2026-08-20T22:00:00Z" }
      ]
    }
    ```

---

## 6. Local Buyer Marketplace

### `POST /api/v1/marketplace/offers`
*   **Description:** Allows registered buyers to post active purchasing rates.
*   **Request Body:**
    ```json
    {
      "commodity": "cotton",
      "variety": "LRA-5166",
      "min_grade": "A",
      "buying_price_per_quintal": 7400.00
    }
    ```
*   **Response (201 Created):**
    ```json
    { "offer_id": "offer-uuid", "message": "Purchase rate posted" }
    ```

### `GET /api/v1/marketplace/offers`
*   **Description:** Fetches active buyer listings sorted by distance from the farmer.
*   **Response (200 OK):**
    ```json
    [
      {
        "offer_id": "offer-uuid",
        "company_name": "Wadgaon Agri Traders",
        "phone": "+919876543222",
        "commodity": "cotton",
        "buying_price_per_quintal": 7400.00,
        "distance_km": 4.2
      }
    ]
    ```

---

## 7. P2P Kisan Community Hub

### `POST /api/v1/community/posts`
*   **Description:** Creates a new post in the forum.
*   **Request Body:**
    ```json
    {
      "title": "Severe leaf damage on Cotton, is this Bollworm?",
      "content": "Seeing red spots on leaves in Hinganghat area. Suggestions?",
      "image_url": "s3-link-to-leaf",
      "crop_category": "cotton"
    }
    ```
*   **Response (201 Created):**
    ```json
    { "post_id": "post-uuid", "message": "Post published to community" }
    ```


