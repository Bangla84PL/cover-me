# SmartCamp.AI Design System
## Comprehensive Style Guide for LLM Calculator App

---

## 📋 **Table of Contents**
1. [Overview](#overview)
2. [Typography](#typography)
3. [Color System](#color-system)
4. [Layout & Spacing](#layout--spacing)
5. [Background & Visual Identity](#background--visual-identity)
6. [Header Component](#header-component)
7. [Footer Component](#footer-component)
8. [UI Components](#ui-components)
9. [Interactive Elements](#interactive-elements)
10. [Responsive Design](#responsive-design)
11. [Animations & Transitions](#animations--transitions)
12. [Implementation Guidelines](#implementation-guidelines)

---

## 🎯 **Overview**

This design system defines the complete visual language and styling specifications for the SmartCamp.AI LLM Calculator application. It ensures consistency across all UI elements while maintaining the distinctive "jungle tech" aesthetic.

### **Core Design Philosophy**
- **Jungle Tech Aesthetic**: Blend of natural jungle imagery with modern technology
- **Glass Morphism**: Transparent, blurred elements with subtle borders
- **High Contrast**: White text on dark/transparent backgrounds for readability
- **Professional yet Approachable**: Technical functionality with organic visual warmth

---

## 🔤 **Typography**

### **Primary Font Family**
```css
font-family: 'Jost', sans-serif;
```

### **Font Weights Available**
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Semi-Bold**: 600
- **Bold**: 700

### **Typography Scale**

#### **Headings**
```css
/* Main App Title (H1) */
.app-title {
  font-size: 2.25rem; /* 36px */
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.2;
}

/* Card Titles (H3) */
.card-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 600;
  color: #ffffff;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

/* Section Headings */
.section-heading {
  font-size: 1.125rem; /* 18px */
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
}
```

#### **Body Text**
```css
/* Primary Body Text */
.body-text {
  font-size: 1rem; /* 16px */
  font-weight: 400;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

/* Small Text */
.small-text {
  font-size: 0.875rem; /* 14px */
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

/* Labels */
.label-text {
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  color: #ffffff;
}
```

### **Font Loading**
```javascript
// Next.js Google Fonts Integration
import { Jost } from "next/font/google";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
```

---

## 🎨 **Color System**

### **CSS Custom Properties**
```css
:root {
  /* Backgrounds */
  --background: transparent;
  --foreground: #ffffff;
  
  /* Cards & Surfaces */
  --card: rgba(255, 255, 255, 0.15);
  --card-foreground: #ffffff;
  
  /* Interactive Elements */
  --primary: #ffffff;
  --primary-foreground: #1f4d2f;
  --secondary: rgba(255, 255, 255, 0.1);
  --secondary-foreground: #ffffff;
  
  /* Muted Elements */
  --muted: rgba(255, 255, 255, 0.1);
  --muted-foreground: rgba(255, 255, 255, 0.7);
  
  /* Accents */
  --accent: rgba(255, 255, 255, 0.1);
  --accent-foreground: #ffffff;
  
  /* Borders & Inputs */
  --border: rgba(255, 255, 255, 0.2);
  --input: rgba(255, 255, 255, 0.1);
  --ring: rgba(255, 255, 255, 0.5);
  
  /* Semantic Colors */
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  
  /* Border Radius */
  --radius: 0.5rem; /* 8px */
}
```

### **Color Palette**

#### **Primary Colors**
- **Pure White**: `#ffffff` - Primary text and icons
- **Dark Forest**: `#1f4d2f` - Button text on white backgrounds
- **Emerald Accent**: `#10b981` - Hover states and highlights

#### **Transparency Levels**
- **High Transparency**: `rgba(255, 255, 255, 0.1)` - Subtle backgrounds
- **Medium Transparency**: `rgba(255, 255, 255, 0.15)` - Card backgrounds
- **Low Transparency**: `rgba(255, 255, 255, 0.2)` - Borders
- **Text Transparency**: `rgba(255, 255, 255, 0.7)` - Secondary text
- **Muted Text**: `rgba(255, 255, 255, 0.8)` - Body text

#### **Overlay Colors**
- **Header/Footer Overlay**: `rgba(0, 0, 0, 0.3)` - Dark overlay on jungle background
- **Button Overlay**: `rgba(0, 0, 0, 0.4)` - Dark overlay on jungle buttons

---

## 📐 **Layout & Spacing**

### **Container System**
```css
.container {
  max-width: 1200px; /* 6xl */
  margin: 0 auto;
  padding: 0 1rem; /* 16px */
}

/* Calculator specific container */
.calculator-container {
  max-width: 1152px; /* 6xl */
  margin: 0 auto;
  padding: 2rem 1rem; /* 32px 16px */
}
```

### **Spacing Scale**
```css
/* Tailwind CSS spacing scale used throughout */
.space-1 { margin/padding: 0.25rem; } /* 4px */
.space-2 { margin/padding: 0.5rem; }  /* 8px */
.space-4 { margin/padding: 1rem; }    /* 16px */
.space-6 { margin/padding: 1.5rem; }  /* 24px */
.space-8 { margin/padding: 2rem; }    /* 32px */
```

### **Grid System**
```css
/* Main Calculator Layout */
.calculator-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .calculator-grid {
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## 🌿 **Background & Visual Identity**

### **Jungle Background**
```css
.jungle-background {
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
```

### **Background Implementation**
- **Image**: High-resolution jungle scene with coding elements
- **Attachment**: Fixed to create parallax effect
- **Overlay**: Dark overlays (30-40% opacity) for text readability
- **Fallback**: Dark green gradient if image fails to load

### **Glass Morphism Effects**
```css
.glass-effect {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
}

/* Subtle glass effect for inputs */
.glass-subtle {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

---

## 🎯 **Header Component**

### **Structure & Styling**
```css
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* Background */
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.header-overlay {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### **Logo Specifications**
```css
.logo {
  height: 3rem; /* 48px on mobile */
  width: auto;
  transition: all 0.3s ease-in-out;
}

@media (min-width: 640px) {
  .logo {
    height: 3.5rem; /* 56px on tablet */
  }
}

@media (min-width: 768px) {
  .logo {
    height: 4rem; /* 64px on desktop */
  }
}

.logo:hover {
  transform: scale(1.05);
  opacity: 0.9;
}
```

### **Taglines**
```css
.taglines {
  display: none;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.3;
  transition: color 0.2s;
}

.taglines:hover {
  color: #10b981; /* emerald-300 */
}

.taglines-highlight {
  color: #10b981;
  font-weight: 600;
}

@media (min-width: 640px) {
  .taglines {
    display: block;
  }
}
```

---

## 🦶 **Footer Component**

### **Structure & Styling**
```css
.footer {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-top: auto;
  
  /* Background */
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.footer-overlay {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0;
  }
}
```

### **Footer Elements**
```css
/* Newsletter Section */
.footer-newsletter {
  width: 100%;
  max-width: 24rem; /* 384px */
}

/* Logo in Footer */
.footer-logo {
  height: 1.5rem; /* 24px on mobile */
  width: auto;
}

@media (min-width: 640px) {
  .footer-logo {
    height: 2rem; /* 32px on larger screens */
  }
}

/* Copyright Text */
.footer-copyright {
  font-size: 0.75rem; /* 12px */
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

@media (min-width: 1024px) {
  .footer-copyright {
    text-align: left;
  }
}

/* Contact Info */
.footer-contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

@media (min-width: 1024px) {
  .footer-contact {
    align-items: flex-end;
  }
}

.footer-contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.footer-contact-link:hover {
  color: #ffffff;
}

.footer-contact-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
}

.footer-contact-link:hover .footer-contact-icon {
  transform: scale(1.1);
}
```

---

## 🧩 **UI Components**

### **Card Component**
```css
.card {
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
}

.card-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.card-content {
  padding: 1.5rem;
  padding-top: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-top: 0;
}
```

### **Button Component**
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: colors 0.2s;
  
  /* Focus states */
  outline: none;
  ring-offset: 2px;
}

.button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.button:disabled {
  pointer-events: none;
  opacity: 0.5;
}

/* Button Variants */
.button-default {
  background: #ffffff;
  color: #1f4d2f;
  height: 2.5rem;
  padding: 0.5rem 1rem;
}

.button-default:hover {
  background: rgba(255, 255, 255, 0.9);
}

.button-jungle {
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  
  /* Jungle background */
  background-image: url('/jungle background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.button-jungle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: inherit;
}

.button-jungle > * {
  position: relative;
  z-index: 10;
}

.button-jungle:hover {
  opacity: 0.9;
  transition: all 0.2s ease-in-out;
}

/* Button Sizes */
.button-sm {
  height: 2.25rem;
  padding: 0 0.75rem;
  border-radius: 0.375rem;
}

.button-lg {
  height: 2.75rem;
  padding: 0 2rem;
  border-radius: 0.375rem;
}

.button-icon {
  height: 2.5rem;
  width: 2.5rem;
}
```

### **Input Component**
```css
.input {
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  transition: all 0.2s;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.input:focus-visible {
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.input:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

### **Select Component**
```css
.select {
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #ffffff;
  transition: all 0.2s;
}

.select:focus-visible {
  outline: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.select:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.select option {
  background: #1f4d2f;
  color: #ffffff;
}
```

### **Custom Slider Component**
```css
.slider-container {
  position: relative;
  display: flex;
  width: 100%;
  touch-action: none;
  user-select: none;
  align-items: center;
}

.slider-input {
  position: relative;
  height: 0.5rem;
  width: 100%;
  cursor: pointer;
  appearance: none;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.2s;
}

.slider-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

.slider-input:disabled {
  pointer-events: none;
  opacity: 0.5;
}

/* Custom thumb styling */
.slider-input::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  border: none;
  box-shadow: none;
  transition: all 0.2s ease;
  opacity: 0; /* Hidden - replaced by emoji */
}

.slider-input::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  border: none;
  box-shadow: none;
  transition: all 0.2s ease;
  opacity: 0; /* Hidden - replaced by emoji */
}

/* Banana emoji thumb */
.slider-emoji {
  position: absolute;
  font-size: 1.125rem;
  transition: transform 0.2s;
  pointer-events: none;
  z-index: 10;
}

.slider-emoji:hover {
  transform: scale(1.25);
}
```

---

## 🎮 **Interactive Elements**

### **Hover Effects**
```css
/* Standard hover transitions */
.hover-scale {
  transition: transform 0.3s ease-in-out;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-opacity {
  transition: opacity 0.2s ease-in-out;
}

.hover-opacity:hover {
  opacity: 0.9;
}

/* Color transitions */
.hover-color {
  transition: color 0.2s ease-in-out;
}

.hover-emerald:hover {
  color: #10b981;
}
```

### **Focus States**
```css
.focus-ring {
  outline: none;
  transition: all 0.2s;
}

.focus-ring:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.focus-ring-inset:focus-visible {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}
```

### **Loading States**
```css
.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

## 📱 **Responsive Design**

### **Breakpoints**
```css
/* Mobile First Approach */
/* Default: 0px - 639px (Mobile) */

/* Small tablets and large phones */
@media (min-width: 640px) { /* sm */ }

/* Tablets */
@media (min-width: 768px) { /* md */ }

/* Small laptops */
@media (min-width: 1024px) { /* lg */ }

/* Large laptops and desktops */
@media (min-width: 1280px) { /* xl */ }

/* Large desktops */
@media (min-width: 1536px) { /* 2xl */ }
```

### **Responsive Typography**
```css
/* App Title */
.app-title {
  font-size: 2rem; /* 32px mobile */
}

@media (min-width: 640px) {
  .app-title {
    font-size: 2.25rem; /* 36px tablet+ */
  }
}

@media (min-width: 768px) {
  .app-title {
    font-size: 2.5rem; /* 40px desktop */
  }
}
```

### **Responsive Layout**
```css
/* Calculator Grid */
.calculator-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .calculator-layout {
    grid-template-columns: 1fr 1fr;
  }
}

/* Container Padding */
.container-responsive {
  padding: 1rem; /* 16px mobile */
}

@media (min-width: 640px) {
  .container-responsive {
    padding: 1.5rem; /* 24px tablet */
  }
}

@media (min-width: 1024px) {
  .container-responsive {
    padding: 2rem; /* 32px desktop */
  }
}
```

---

## ✨ **Animations & Transitions**

### **Standard Transitions**
```css
/* Default transition for most elements */
.transition-default {
  transition: all 0.2s ease-in-out;
}

/* Slower transition for layout changes */
.transition-slow {
  transition: all 0.3s ease-in-out;
}

/* Fast transition for micro-interactions */
.transition-fast {
  transition: all 0.15s ease-in-out;
}
```

### **Entrance Animations**
```css
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### **Micro-interactions**
```css
.button-press {
  transition: transform 0.1s ease-in-out;
}

.button-press:active {
  transform: scale(0.98);
}

.icon-bounce:hover {
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
}
```

---

## 🛠️ **Implementation Guidelines**

### **Required Assets**
1. **Background Image**: `jungle background.png` (high-resolution jungle scene with tech elements)
2. **Logo**: `SmartCampAIpng.png` (transparent PNG, scalable)
3. **Favicon**: Multiple sizes (16x16, 32x32, apple-touch-icon)
4. **Google Fonts**: Jost font family

### **CSS Framework**
- **Primary**: Tailwind CSS v4.x
- **Custom CSS**: Additional styles for glass morphism and jungle theme
- **CSS Variables**: Extensive use of custom properties for consistency

### **Key Implementation Notes**

#### **Glass Morphism**
- Always use `backdrop-filter: blur()` with transparent backgrounds
- Combine with subtle borders (`rgba(255, 255, 255, 0.2)`)
- Layer transparency levels for depth

#### **Background Handling**
- Jungle background should be applied to body with `background-attachment: fixed`
- Use dark overlays (30-40% opacity) on header/footer for text readability
- Ensure background covers entire viewport (`background-size: cover`)

#### **Accessibility**
- Maintain high contrast ratios (white text on dark backgrounds)
- Ensure focus states are clearly visible
- Use semantic HTML structure
- Provide alternative text for all images

#### **Performance**
- Optimize jungle background image (WebP format recommended)
- Use CSS transforms for animations (hardware accelerated)
- Implement proper image lazy loading
- Minimize custom CSS by leveraging Tailwind utilities

### **Browser Support**
- **Modern Browsers**: Full support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **Backdrop Filter**: Graceful degradation for older browsers
- **CSS Grid**: Fallback to flexbox if needed

### **Development Workflow**
1. Set up Tailwind CSS with custom configuration
2. Implement CSS custom properties for color system
3. Create reusable component library
4. Test responsive design across all breakpoints
5. Validate accessibility compliance
6. Optimize for performance

---

## 📝 **Component Checklist**

When implementing each component, ensure:

- [ ] Uses Jost font family
- [ ] Implements proper color variables
- [ ] Includes glass morphism effects where appropriate
- [ ] Has proper hover and focus states
- [ ] Is fully responsive across all breakpoints
- [ ] Maintains accessibility standards
- [ ] Uses consistent spacing scale
- [ ] Includes proper transitions and animations
- [ ] Handles loading and error states
- [ ] Works with jungle background theme

---

## 🎯 **Final Notes**

This design system represents the complete visual language of the SmartCamp.AI LLM Calculator. Every element has been carefully considered to create a cohesive, professional, and visually striking application that balances technical functionality with organic warmth.

The jungle tech aesthetic is central to the brand identity - ensure this theme is consistently applied across all implementations while maintaining the high-quality user experience standards established in the original application.

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Maintained By**: SmartCamp.AI Development Team