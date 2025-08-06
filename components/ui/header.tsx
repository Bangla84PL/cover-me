'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import the language selector to avoid hydration issues
const LanguageSelector = dynamic(() => import('./language-selector'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white/10 backdrop-blur border border-white/20 text-white animate-pulse">
      <span className="text-lg">🇺🇸</span>
      <span className="text-sm font-medium hidden sm:block">Loading...</span>
    </div>
  )
})

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 shadow-md" style={{
      backgroundImage: "url('/jungle background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and taglines on the left */}
          <div className="flex items-center space-x-4">
            <Link 
              href="https://smartcamp.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
            >
              <Image
                src="/SmartCampAIpng.png"
                alt="SmartCamp AI"
                width={160}
                height={80}
                className="h-12 w-auto sm:h-14 md:h-16"
                priority
              />
            </Link>
            
            {/* Taglines */}
            <Link 
              href="https://smartcamp.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block text-white hover:text-emerald-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            >
              <div className="text-sm font-medium leading-tight">
                <div>AI | Automations | Web Dev</div>
                <div className="text-emerald-300 font-semibold">You are the Future!</div>
              </div>
            </Link>
          </div>
          
          {/* Navigation and Language Selector */}
          <nav className="flex items-center space-x-4">
            <div className="text-white/80 text-sm hidden md:block">
              Starter Template
            </div>
            <LanguageSelector />
          </nav>
        </div>
        </div>
      </div>
    </header>
  )
}