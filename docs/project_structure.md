# Project Structure - LLM Hardware Calculator

## Root Directory Structure

```
llm-calc/
├── app/                          # Next.js App Router directory
│   ├── (calculator)/            # Route group for calculator pages
│   │   ├── page.tsx             # Main calculator page
│   │   └── components/          # Page-specific components
│   ├── api/                     # API routes (if needed for future features)
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout component
│   ├── loading.tsx              # Global loading UI
│   ├── error.tsx                # Global error UI
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── radio-group.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── alert.tsx
│   │   ├── progress.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   └── index.ts             # Barrel exports
│   ├── calculator/              # Calculator-specific components
│   │   ├── ModelSelector.tsx
│   │   ├── QuantizationSelector.tsx
│   │   ├── PerformanceSlider.tsx
│   │   ├── BudgetInput.tsx
│   │   ├── HardwareRecommendations.tsx
│   │   ├── VPSAlternatives.tsx
│   │   ├── CostBreakdown.tsx
│   │   └── ResultsDisplay.tsx
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── ThemeProvider.tsx
│   └── common/                  # Common utility components
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       ├── SEOHead.tsx
│       └── AnalyticsProvider.tsx
├── lib/                         # Utility functions and configurations
│   ├── utils.ts                 # General utility functions
│   ├── calculator.ts            # Calculator logic and algorithms
│   ├── data.ts                  # Data access layer
│   ├── validation.ts            # Zod schemas and validation
│   ├── constants.ts             # Application constants
│   ├── types.ts                 # TypeScript type definitions
│   └── analytics.ts             # Analytics tracking functions
├── data/                        # Static data files
│   ├── models.json              # LLM model specifications
│   ├── gpus.json                # GPU specifications and pricing
│   ├── vps-providers.json       # VPS provider information
│   └── currency.json            # Currency and pricing data
├── hooks/                       # Custom React hooks
│   ├── useCalculator.ts         # Main calculator logic hook
│   ├── useLocalStorage.ts       # Persistent state management
│   ├── useDebounce.ts           # Debouncing utility hook
│   └── useMediaQuery.ts         # Responsive design hook
├── styles/                      # Style-related files
│   ├── components.css           # Component-specific styles
│   └── utilities.css            # Custom utility classes
├── public/                      # Static assets
│   ├── icons/                   # Icon files
│   │   ├── gpu-brands/          # GPU manufacturer icons
│   │   └── model-logos/         # LLM model logos
│   ├── images/                  # Image assets
│   └── manifest.json            # PWA manifest
├── tests/                       # Test files
│   ├── __mocks__/               # Mock files
│   ├── components/              # Component tests
│   ├── lib/                     # Library function tests
│   └── setup.ts                 # Test setup configuration
├── docs/                        # Documentation
│   ├── Implementation.md        # Implementation guide
│   ├── project_structure.md     # This file
│   ├── UI_UX_doc.md            # UI/UX specifications
│   └── Bug_tracking.md          # Bug tracking and solutions
├── .env.local                   # Environment variables
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── .cursorrules                 # Cursor AI rules
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies
├── pnpm-lock.yaml              # Package lock file
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vitest.config.ts            # Vitest testing configuration
└── README.md                   # Project documentation
```

## Detailed Directory Explanations

### `/app` Directory (Next.js App Router)
The main application directory following Next.js 15 App Router conventions:
- **Route Groups**: `(calculator)` groups related pages without affecting URL structure
- **Special Files**: `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` for handling UI states
- **Page Components**: Each page.tsx represents a route in the application

### `/components` Directory
Organized by purpose and reusability:

#### `/components/ui`
- Contains all shadcn/ui components
- Each component follows the shadcn/ui pattern with proper TypeScript types
- Barrel exports in `index.ts` for clean imports

#### `/components/calculator`
- Calculator-specific business logic components
- Each component handles a specific part of the calculator interface
- Designed for reusability and maintainability

#### `/components/layout`
- Layout-related components that wrap content
- Theme provider for dark/light mode switching
- Navigation and structural components

#### `/components/common`
- Utility components used across the application
- Error handling and loading states
- SEO and analytics components

### `/lib` Directory
Core business logic and utilities:
- **utils.ts**: General utility functions (class merging, formatting, etc.)
- **calculator.ts**: Core calculator algorithms and hardware requirement calculations
- **data.ts**: Data access layer with functions to retrieve and manipulate hardware data
- **validation.ts**: Zod schemas for form validation and type safety
- **types.ts**: TypeScript type definitions for the entire application

### `/data` Directory
Static JSON files containing:
- **models.json**: LLM model specifications (parameters, memory requirements, quantization options)
- **gpus.json**: GPU specifications (VRAM, performance metrics, pricing)
- **vps-providers.json**: VPS provider information and pricing
- **currency.json**: Currency conversion and pricing data

### `/hooks` Directory
Custom React hooks for:
- **useCalculator.ts**: Main calculator state management and logic
- **useLocalStorage.ts**: Persistent storage for user preferences
- **useDebounce.ts**: Performance optimization for input handling
- **useMediaQuery.ts**: Responsive design breakpoint detection

### `/tests` Directory
Testing infrastructure:
- Component unit tests using Vitest and React Testing Library
- Library function tests for calculator logic
- Mock files for external dependencies
- Setup configuration for testing environment

## File Naming Conventions

### React Components
- **PascalCase** for component files: `ModelSelector.tsx`
- **Index files** for barrel exports: `index.ts`
- **Test files** with `.test.tsx` suffix: `ModelSelector.test.tsx`

### Utility Functions
- **camelCase** for utility files: `calculator.ts`
- **kebab-case** for data files: `vps-providers.json`
- **Test files** with `.test.ts` suffix: `calculator.test.ts`

### Styling
- **kebab-case** for CSS files: `components.css`
- **Component-specific** styles should be co-located or use CSS modules if needed

## Module Organization Patterns

### Barrel Exports
```typescript
// components/ui/index.ts
export { Button } from './button'
export { Input } from './input'
export { Select } from './select'
// ... other exports
```

### Type Definitions
```typescript
// lib/types.ts
export interface LLMModel {
  id: string
  name: string
  parameters: number
  baseMemoryGB: number
  quantization: QuantizationOptions
}

export interface GPUSpec {
  id: string
  name: string
  vram: number
  price: number
  performance: number
}
```

### Configuration Files

#### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... custom color palette
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

#### TypeScript Path Mapping
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/data/*": ["./data/*"]
    }
  }
}
```

## Asset Organization

### Public Assets
- **Icons**: Organized by category (gpu-brands, model-logos)
- **Images**: Product images, logos, and graphics
- **Manifest**: PWA configuration for installability

### Static Data Structure
```json
{
  "models": {
    "llama-7b": {
      "id": "llama-7b",
      "name": "Llama 7B",
      "parameters": 7000000000,
      "baseMemoryGB": 14,
      "quantization": {
        "fp16": { "multiplier": 1.0, "quality": "highest" },
        "q8": { "multiplier": 0.75, "quality": "high" },
        "q4": { "multiplier": 0.5, "quality": "good" }
      }
    }
  }
}
```

## Build and Deployment Structure

### Development Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "type-check": "tsc --noEmit"
  }
}
```

### Environment Configuration
- **Development**: `.env.local` for local development variables
- **Production**: Environment variables configured in Vercel dashboard
- **Example**: `.env.example` template for required variables

This structure provides a solid foundation for the LLM Hardware Calculator, ensuring maintainability, scalability, and developer productivity while following Next.js and React best practices.