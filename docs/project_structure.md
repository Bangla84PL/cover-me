# Project Structure - Cover Letter Generator

## Root Directory Overview

```
cover-me/
├── app/                          # Next.js 15 App Router pages and layouts
├── components/                   # Reusable React components
├── lib/                          # Utility functions and configurations
├── types/                        # TypeScript type definitions
├── hooks/                        # Custom React hooks
├── providers/                    # React context providers
├── middleware.ts                 # Next.js middleware for auth/routing
├── docs/                         # Project documentation
├── public/                       # Static assets
├── supabase/                     # Supabase migrations and functions
└── n8n-workflows/                # n8n workflow definitions
```

## App Directory Structure

```
app/
├── (auth)/                       # Authentication route group
│   ├── login/page.tsx            # Login page
│   ├── register/page.tsx         # Registration page
│   └── layout.tsx                # Auth-specific layout
├── (dashboard)/                  # Protected route group
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── generate/page.tsx         # Cover letter generation
│   └── layout.tsx                # Dashboard layout
├── api/                          # Server-side API routes
│   ├── auth/                     # Authentication endpoints
│   ├── upload/                   # File upload handling
│   ├── generate/                 # Cover letter generation
│   └── n8n/                      # n8n webhook endpoints
├── globals.css                   # TailwindCSS v4 configuration
├── layout.tsx                    # Root layout with providers
└── page.tsx                      # Landing page
```

## Components Organization

```
components/
├── ui/                           # shadcn/ui base components
├── forms/                        # Form-specific components
├── dashboard/                    # Dashboard-specific components
├── generation/                   # Cover letter generation flow
├── layout/                       # Layout components
└── common/                       # Common reusable components
```

## Library Structure

```
lib/
├── supabase/                     # Supabase configurations
├── ai/                           # AI integration (Claude API)
├── n8n/                          # n8n integration
├── utils/                        # General utility functions
├── validations/                  # Zod schemas and validation
└── errors/                       # Error handling utilities
```

## Configuration Files

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLAUDE_API_KEY=
N8N_WEBHOOK_URL=
N8N_API_KEY=
```

### TailwindCSS v4 Setup (globals.css)
```css
@import "tailwindcss";

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

## File Naming Conventions

- **Components**: PascalCase (`CvUploadForm.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Hooks**: kebab-case with prefix (`use-auth.ts`)
- **API Routes**: kebab-case directories (`/api/cover-letter/`)

## Key Architectural Principles

1. **Next.js 15 App Router** for modern routing and RSC support
2. **TypeScript** for type safety across the application
3. **Modular structure** for easy maintenance and scaling
4. **Clear separation** between UI, business logic, and data layers
5. **Supabase integration** for authentication, database, and storage
6. **n8n workflows** for automation and AI processing
7. **shadcn/ui** for consistent component library