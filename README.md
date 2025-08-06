# SmartCamp.AI Starter Template

A beautiful, responsive Next.js starter template featuring the distinctive SmartCamp.AI design system with jungle tech aesthetic and glass morphism effects.

![SmartCamp.AI Starter Template](public/SmartCampAIpng.png)

## ✨ Features

### 🎨 Design System
- **Jungle Tech Aesthetic**: Unique blend of natural jungle imagery with modern technology
- **Glass Morphism**: Transparent, blurred elements with subtle borders
- **High Contrast**: White text on dark/transparent backgrounds for optimal readability
- **Professional yet Approachable**: Technical functionality with organic visual warmth

### 🏗️ Technical Stack
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Jost Font** from Google Fonts
- **Responsive Design** across all device sizes

### 🧩 Components Included
- **Header Component**: Sticky header with jungle background and logo
- **Footer Component**: Contact information and branding
- **UI Components**: Button, Card, Input, Select, Slider with custom styling
- **Demo Calculator**: Fully functional demo showcasing all components
- **Glass Morphism Effects**: Ready-to-use backdrop blur components

### 📱 Responsive Features
- Mobile-first design approach
- Breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Adaptive layouts and typography scaling
- Touch-friendly interactive elements

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url> my-new-app
   cd my-new-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
smartcamp-starter/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout with header/footer
│   └── page.tsx                 # Main page component
├── components/                   # React components
│   ├── smartcamp-starter.tsx    # Main component showcasing design system
│   └── ui/                      # Reusable UI components
│       ├── button.tsx           # Custom button variants
│       ├── card.tsx             # Glass morphism cards
│       ├── footer.tsx           # Footer with jungle background
│       ├── header.tsx           # Sticky header component
│       ├── input.tsx            # Styled input fields
│       ├── select.tsx           # Custom select dropdowns
│       └── slider.tsx           # Interactive slider with banana emoji
├── public/                      # Static assets
│   ├── jungle background.png   # Main background image
│   ├── SmartCampAIpng.png      # Logo files
│   └── favicon files           # App icons
├── docs/                        # Documentation
│   └── SmartCamp-AI-Design-System.md  # Complete design system guide
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System

The complete design system documentation is available in [`SmartCamp-AI-Design-System.md`](SmartCamp-AI-Design-System.md), including:

- **Typography**: Jost font family with defined scales
- **Color System**: CSS custom properties for consistent theming
- **Layout & Spacing**: Container system and responsive breakpoints
- **Component Guidelines**: Detailed specifications for each UI component
- **Animation & Transitions**: Smooth micro-interactions
- **Accessibility**: WCAG 2.1 AA compliance guidelines

## 🛠️ Customization

### Colors
Update CSS custom properties in `app/globals.css`:
```css
:root {
  --background: transparent;
  --foreground: #ffffff;
  --card: rgba(255, 255, 255, 0.15);
  /* ... more color variables */
}
```

### Components
All components are in `components/ui/` and can be customized:
- Modify existing components
- Add new variants using Tailwind classes
- Extend functionality while maintaining visual consistency

### Background
Replace `public/jungle background.png` with your own background image while maintaining the same filename, or update the background references in:
- `components/ui/header.tsx`
- `components/ui/footer.tsx`
- `app/globals.css`

### Logo & Branding
Replace logo files in `public/` directory:
- `SmartCampAIpng.png` - Main logo
- Favicon files for web app icons

## 🔧 Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## 📦 What's Included vs. Removed

### ✅ Included (Visual Elements)
- Complete design system and styling
- All UI components with full styling
- Responsive layouts and breakpoints
- Header and footer with jungle backgrounds
- Glass morphism effects and animations
- Typography system and color palette
- Demo components showing visual capabilities

### ❌ Removed (Business Logic)
- Database connections and queries
- API routes and server actions
- Form submission handling
- Email functionality
- Analytics tracking
- Authentication systems
- Real data processing

## 🎯 Perfect For

- **SaaS Applications**: Professional look with modern design
- **Landing Pages**: High-impact visual presentation
- **Dashboards**: Clean, organized interface components
- **Portfolio Sites**: Unique aesthetic that stands out
- **Product Demos**: Showcase functionality with style

## 🚀 Deployment

This template works seamlessly with:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any Node.js hosting platform**

Simply connect your repository and deploy!

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This starter template is available for use in your projects. Please maintain attribution to SmartCamp.AI in your footer.

## 🆘 Support

- 📧 Email: hello@smartcamp.ai
- 📞 Phone: +48 518 894 156
- 🌐 Website: [smartcamp.ai](https://smartcamp.ai)

---

**Built with ❤️ by [SmartCamp.AI](https://smartcamp.ai)**

*Transform your ideas into beautiful, functional applications with our proven design system.*