# Getting Started with SmartCamp.AI Starter Template

## 🎯 Overview

This starter template gives you everything you need to build beautiful applications with the SmartCamp.AI design system. It includes all visual components, styling, and responsive behavior while removing business logic so you can focus on building your unique functionality.

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
pnpm install
# or npm install
```

### 2. Start Development
```bash
pnpm dev
# or npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:3000` to see the demo

## 🎨 Understanding the Demo

The demo calculator showcases all the visual components and design patterns:

- **Glass morphism cards** with backdrop blur effects
- **Responsive grid layouts** that adapt to screen size
- **Interactive components** (sliders, dropdowns, buttons)
- **Consistent color palette** and typography
- **Smooth animations** and hover effects

## 🔧 Building Your App

### Replace Demo Content

1. **Update the main page** (`app/page.tsx`):
   ```tsx
   import YourComponent from '@/components/your-component'
   
   export default function Home() {
     return <YourComponent />
   }
   ```

2. **Create your components** in `components/` directory:
   ```tsx
   import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
   import { Button } from '@/components/ui/button'
   
   export default function YourComponent() {
     return (
       <div className="container mx-auto px-4 py-8 max-w-6xl">
         <Card className="bg-white/15 backdrop-blur border-white/20">
           <CardHeader>
             <CardTitle>Your App Title</CardTitle>
           </CardHeader>
           <CardContent>
             {/* Your content here */}
           </CardContent>
         </Card>
       </div>
     )
   }
   ```

### Use the Design System

All components follow the established design patterns:

- **Cards**: `bg-white/15 backdrop-blur border-white/20`
- **Buttons**: Use `variant="jungle"` for the signature style
- **Text**: White text with opacity variations for hierarchy
- **Spacing**: Consistent padding and margins using Tailwind classes

### Add Your Logic

1. **API Routes**: Create in `app/api/` directory
2. **Database**: Add your preferred database solution
3. **State Management**: Use React hooks or your preferred solution
4. **Forms**: Integrate with React Hook Form or similar

## 📱 Responsive Design

The template is mobile-first with these breakpoints:
- **Mobile**: 0-639px
- **Tablet**: 640-767px
- **Desktop**: 768px+
- **Large**: 1024px+
- **XL**: 1280px+

## 🎨 Customizing Colors

Update CSS variables in `app/globals.css`:

```css
:root {
  /* Change primary colors */
  --primary: #your-color;
  --accent: #your-accent;
  
  /* Adjust transparency levels */
  --card: rgba(255, 255, 255, 0.15);
  --border: rgba(255, 255, 255, 0.2);
}
```

## 🖼️ Customizing Background

1. Replace `public/jungle background.png` with your image
2. Or update background references in:
   - `app/globals.css` (`.jungle-background`)
   - `components/ui/header.tsx`
   - `components/ui/footer.tsx`

## 🏷️ Customizing Branding

1. **Logo**: Replace files in `public/` directory
2. **Favicon**: Update favicon files
3. **Metadata**: Edit `app/layout.tsx`
4. **Footer**: Update contact info in `components/ui/footer.tsx`

## 🧩 Available Components

### Basic Components
- `Button` - Multiple variants including signature "jungle" style
- `Card` - Glass morphism containers
- `Input` - Styled form inputs
- `Select` - Custom dropdowns

### Layout Components  
- `Header` - Sticky header with jungle background
- `Footer` - Contact info and branding

### Interactive Components
- `Slider` - Custom slider with banana emoji thumb
- Form components with consistent styling

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- Any Node.js hosting

## 🔍 Troubleshooting

### Common Issues

**Build errors about missing components**
- Make sure all imports are correct
- Check that you're not importing removed business logic

**Styling not working**
- Ensure Tailwind CSS is properly configured
- Check that custom CSS variables are defined

**Images not loading**
- Verify image files are in `public/` directory
- Check file paths and names match exactly

## 📚 Next Steps

1. **Explore the design system**: Read `SmartCamp-AI-Design-System.md`
2. **Build your features**: Add your unique functionality
3. **Customize styling**: Make it match your brand
4. **Deploy**: Share your creation with the world

## 🆘 Need Help?

- 📧 Email: hello@smartcamp.ai
- 🌐 Website: [smartcamp.ai](https://smartcamp.ai)
- 📖 Full documentation in project files

---

**Happy building! 🚀**