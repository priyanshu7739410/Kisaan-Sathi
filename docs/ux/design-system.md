# Kisan Sathi Design System

A specification for the UI brand elements, components, and design tokens built for mobile accessibility and high readability.

## 1. Brand Concept & Tone
*   **Visual Persona:** Local, warm, custom, and premium. Kisan Sathi bypasses corporate SaaS look-and-feels in favor of a culturally resonant agricultural identity.
*   **Illustration Identity (Folk-Art Outline Sketches):** 
    *   *Style:* Custom, hand-drawn vector sketches inspired by traditional Indian block printing and local folk art.
    *   *Strokes:* High-contrast solid outlines using a dark charcoal stroke (`#2D2926`) to define crops, pests, and tasks.
    *   *Backgrounds:* Outlines sit on top of warm beige background surfaces (`#FAF8F5`) to prevent glares.
*   **Design Constraints:** High contrast for outdoor sunlight readability (minimum 7:1 ratio for text and active outlines), large touch targets (minimum 48dp), simple navigation, local language support.

## 2. Design Tokens

### Color Palette (Theme-specific)
We avoid pure black/white to ensure visual comfort. The color system uses warm, earth-toned hues:

```javascript
export const DesignTokens = {
  colors: {
    // Primary Brand Colors
    primary: '#2E7D32',       // Forest Green (Growth, Agriculture)
    primaryLight: '#4CAF50',  // Soft Leaf Green
    secondary: '#8D6E63',     // Soil Brown (Stability, Earthy)
    
    // UI Feedback Colors
    success: '#388E3C',       // Healthy Crop Green
    warning: '#F57C00',       // Warning / Nudge Orange
    danger: '#D32F2F',        // Pest/Emergency Red
    info: '#1976D2',          // Water / Rain Blue
    
    // Backgrounds & Surfaces
    background: '#FAF8F5',    // Off-white Warm Beige (reduces eye strain)
    surface: '#FFFFFF',       // Clean White
    border: '#E0DCD5',        // Warm Gray Border
    
    // Typography Colors
    text: '#2D2926',          // Dark Charcoal (High Contrast)
    textMuted: '#75706B',     // Soft Gray Text
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  
  elevation: {
    none: 0,
    low: {
      shadowColor: '#2D2926',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    high: {
      shadowColor: '#2D2926',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 8,
    },
  }
};
```

---

## 3. Typography (Android & iOS)
*   **Font Family:** `Outfit` (Primary Brand & Headings), `Inter` (Body & Metadata UI)
*   **Hierarchy:**
    *   `Display Title`: Size 32 / Weight Bold / Line Height 40 (Onboarding headers)
    *   `Heading 1`: Size 24 / Weight SemiBold / Line Height 32 (Screen Titles)
    *   `Heading 2`: Size 18 / Weight Medium / Line Height 24 (Card Titles)
    *   `Body`: Size 16 / Weight Normal / Line Height 22 (Task details, citations, chat)
    *   `Caption`: Size 12 / Weight Light / Line Height 16 (Stale warnings, footnotes)

---

## 4. Components Specifications

### Action Cards (Home & Trackers)
*   **Visual Style:** Light background (`surface`), rounded corners (`radius.md`), border (`border`), and subtle drop shadow (`elevation.low`).
*   **Task Card State Indicator:** A vertical left border colored by activity type (`info` for irrigation, `primary` for fertilizer, `warning` for harvesting).

### The Citation Card (Photo AI & Chat)
*   **Visual Style:** Encased in a soft beige background with a lock icon.
*   **Content Layout:** Show verbatim PDF snippet -> display document source name -> publication date -> verified government seal/marker.
