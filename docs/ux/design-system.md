# Kisan Sathi Design System

A specification for the UI brand elements, components, and design tokens built for responsive web accessibility and high readability.

## 1. Brand Concept & Tone
*   **Visual Persona:** Local, warm, custom, and premium. Kisan Sathi bypasses corporate SaaS looks in favor of a culturally resonant agricultural identity.
*   **Illustration Identity (Folk-Art Outline Sketches):** 
    *   *Style:* Custom, hand-drawn vector sketches inspired by traditional Indian block printing and local folk art.
    *   *Strokes:* High-contrast solid outlines using a dark charcoal stroke (`#2D2926`) to define crops, pests, and tasks.
    *   *Backgrounds:* Outlines sit on top of warm beige background surfaces (`#FAF8F5`) to prevent glares.
*   **Design Constraints:** High contrast for outdoor sunlight readability (minimum 7:1 ratio for text and active outlines), large touch targets (minimum 48px), simple navigation, local language support.

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
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px',
  },
  
  shadows: {
    none: 'none',
    low: '0px 2px 4px rgba(45, 41, 38, 0.05)',
    high: '0px 8px 16px rgba(45, 41, 38, 0.1)',
  }
};
```

---

## 3. Typography (Web & Mobile Browsers)
*   **Font Family:** `Outfit` (Primary Brand & Headings), `Inter` (Body & Metadata UI)
*   **Hierarchy:**
    *   `Display Title`: Size 2rem / Weight Bold / Line Height 2.5rem (Onboarding headers)
    *   `Heading 1`: Size 1.5rem / Weight SemiBold / Line Height 2rem (Page Titles)
    *   `Heading 2`: Size 1.125rem / Weight Medium / Line Height 1.5rem (Card Titles)
    *   `Body`: Size 1rem / Weight Normal / Line Height 1.4rem (Task details, citations, chat)
    *   `Caption`: Size 0.75rem / Weight Light / Line Height 1rem (Stale warnings, footnotes)

---

## 4. Component Specifications

### Action Cards (Home & Trackers)
*   **Visual Style:** Light background (`surface`), rounded corners (`radius.md`), border (`border`), and subtle drop shadow (`shadows.low`).
*   **Task Card State Indicator:** A vertical left border colored by activity type (`info` for irrigation, `primary` for fertilizer, `warning` for harvesting).

### The Citation Card (Photo AI & Chat)
*   **Visual Style:** Encased in a soft beige background with a lock icon.
*   **Content Layout:** Show verbatim PDF snippet → display document source name → publication date → verified government seal/marker.
