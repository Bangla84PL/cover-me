# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cover Me** is an AI-powered cover letter generator that transforms CV uploads and job URLs into personalized, professional cover letters. Built on the SmartCamp.AI design system featuring jungle tech aesthetic and glass morphism effects.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Supabase

## Development Commands

### Essential Commands
- `pnpm dev` - Start development server with Turbopack (always runs on port 3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

**Critical:** Always use `pnpm` exclusively (never npm or yarn). The development server is always running on port 3000.

## Architecture & Code Organization

### Core Directory Structure
```
app/                    # Next.js App Router pages and API routes
├── actions/           # Server actions (e.g., newsletter.ts)
├── api/              # API routes
├── globals.css       # Global styles, Tailwind imports, CSS variables
├── layout.tsx        # Root layout with header/footer
└── page.tsx          # Main page component

components/            # React components organized by use case
└── ui/               # Reusable UI components (build all new components from these)

lib/                   # Utility functions and configurations
├── supabase/         # Supabase client configuration
│   ├── client.ts    # Client-side Supabase client
│   └── server.ts    # Server-side Supabase client (service role)
└── i18n/            # Internationalization
    ├── context.tsx  # i18n provider and hooks
    └── translations/ # Language files (en, pl, es, zh)

docs/                  # Project documentation (reference before implementing)
├── Implementation.md  # Main task reference and implementation stages
├── prd.md            # Product Requirements Document
├── project_structure.md # Project structure guidelines
├── UI_UX_doc.md      # Design system and UI/UX specifications
└── Bug_tracking.md   # Known issues and solutions
```

### Key Architectural Patterns

**Supabase Integration:**
- Always use `lib/supabase/server.ts` for server-side operations (API routes, server actions)
- Use `lib/supabase/client.ts` for client-side operations
- Never access Supabase directly in components; use server actions or API routes
- Row Level Security (RLS) is enabled

**Internationalization:**
- 4 supported languages: English (en), Polish (pl), Spanish (es), Chinese (zh)
- Uses custom i18n context provider (`useI18n()` hook)
- Automatic browser language detection with manual override
- Translation files in `lib/i18n/translations/`

**Component Organization:**
- Place all components in `app/components/` directory
- Group components by use case in subdirectories
- Always use existing components from `components/ui/` to build new features
- Follow shadcn/ui + Radix UI component patterns

## Critical Development Workflow

### Before Starting Any Task
1. **Consult documentation first:**
   - Check `/docs/Implementation.md` for current stage and available tasks
   - Review `/docs/Bug_tracking.md` for similar issues before fixing
   - Check dependencies and prerequisites

2. **For UI/UX work:**
   - Always consult `/docs/UI_UX_doc.md` before implementing any UI elements
   - Follow SmartCamp.AI design system specifications
   - Use glass morphism patterns: `bg-white/15 backdrop-blur border-white/20`
   - Maintain jungle tech aesthetic with responsive design

3. **For structural changes:**
   - Check `/docs/project_structure.md` before:
     - Running commands
     - Creating files/folders
     - Adding dependencies
     - Making structural changes

### Task Completion Criteria
Only mark tasks complete when:
- All functionality implemented correctly
- Code follows project structure guidelines
- UI/UX matches specifications (if applicable)
- No errors or warnings remain
- All checklist items completed

## Design System Essentials

### SmartCamp.AI Visual Style
- **Glass Morphism Cards:** `bg-white/15 backdrop-blur border-white/20`
- **Buttons:** Use `variant="jungle"` for signature style
- **Typography:** White text with opacity variations for hierarchy (Jost font from Google Fonts)
- **Background:** Jungle background with high contrast white text
- **Responsive:** Mobile-first design (breakpoints: 640px, 768px, 1024px, 1280px, 1536px)

### Color System (CSS Variables)
Defined in `app/globals.css`:
- `--background: transparent`
- `--foreground: #ffffff`
- `--card: rgba(255, 255, 255, 0.15)`
- See full palette in globals.css

## Code Standards & Best Practices

### TypeScript & Code Style
- All code must be TypeScript (strict mode enabled)
- Use interfaces for props and data models (avoid types for objects)
- Use functional components with typed props
- Avoid `any`; use `unknown` or explicit types
- Use descriptive variable names with auxiliary verbs (`isLoading`, `hasError`)
- Prefer functional and declarative patterns over classes
- Add comments to explain technical concepts and functions

### File Naming Conventions
- Directories: lowercase with dashes (e.g., `components/auth-wizard`)
- Components: Named exports (PascalCase)
- Utilities: camelCase for files (e.g., `calculator.ts`)

### React & Next.js Patterns
- Minimize `'use client'`, `useEffect`, and `setState`
- Prefer React Server Components and Server Actions
- Wrap client components in `<Suspense>` with fallbacks
- Use `useFormState` and `useFormStatus` with server actions
- Use `useOptimistic` for lightweight interactive state
- Avoid global state libraries unless necessary

### Performance & Optimization
- Lazy load non-critical components
- Optimize images: WebP format, include width/height, lazy-load
- Code splitting for better bundle size
- Optimize Core Web Vitals (LCP, CLS, FID)

### Security Requirements
- **Environment Variables:** Never expose secrets in browser; use `.env.local`
- **Supabase RLS:** Always enabled on every table with `auth.uid()` validation
- **Auth Guards:** Server-side validation for sensitive logic
- **Supabase Keys:**
  - `anon` key only in client components for safe queries
  - `service_role` key only on server
- **Validation:** Use Zod for all input validation

## Testing & Quality

- ESLint, Prettier, and TypeScript strict mode enabled
- Validate all inputs with Zod schemas
- Ensure proper ARIA labels, focus handling, keyboard support
- Test across all device sizes and breakpoints
- `pnpm dev` should start cleanly with no TypeScript errors

## Important Notes

- **Don't install packages unless asked** - suggest performance improvements instead
- **Prefer iteration and modularization over code duplication**
- **Point out potential security issues** and suggest solutions
- **Fetch logs from the console** when debugging
- **Never skip documentation consultation** - it's part of the workflow
- **Document errors and solutions** in Bug_tracking.md

## Git Workflow

Current branch: `claude/init-project-011CUcBiii8dvRmpHzn25DMd`

When committing:
- Follow existing commit message style (check `git log` first)
- Include clear descriptions of changes
- Run linting before committing

## Additional Resources

- Full design system: `docs/SmartCamp-AI-Design-System.md`
- Product requirements: `docs/prd.md`
- Getting started guide: `GETTING-STARTED.md`
- Implementation stages: `docs/Implementation.md`
