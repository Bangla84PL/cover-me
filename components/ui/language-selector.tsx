"use client"

import { useState } from 'react'
import { useI18n, SUPPORTED_LANGUAGES } from '@/lib/i18n/context'

export default function LanguageSelector() {
  const { language, setLanguage } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === language)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-200 text-white whitespace-nowrap"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium hidden sm:block">{currentLanguage?.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-1 py-1 border border-white/20 rounded-md shadow-xl z-[100] min-w-[120px] max-w-[180px] whitespace-nowrap"
          style={{
            backgroundImage: "url('/jungle background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-md">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-white/20 transition-colors duration-150 ${
                  language === lang.code ? 'bg-white/30 text-white font-medium' : 'text-white'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[90]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}