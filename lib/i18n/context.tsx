"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
] as const

export type SupportedLanguageCode = typeof SUPPORTED_LANGUAGES[number]['code']

// Interface for translations that can contain nested objects
interface NestedTranslations {
  [key: string]: string | NestedTranslations
}
type TranslationsType = NestedTranslations

interface I18nContextType {
  language: SupportedLanguageCode
  setLanguage: (lang: SupportedLanguageCode) => void
  resetToDetectedLanguage: () => void
  t: (key: string) => string
  isLoading: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Browser language detection function
function detectBrowserLanguage(): SupportedLanguageCode {
  if (typeof window === 'undefined') return 'en' // SSR fallback
  
  // Get browser languages in order of preference
  const browserLanguages = navigator.languages || [navigator.language]
  
  for (const browserLang of browserLanguages) {
    // Extract language code (e.g., 'en-US' -> 'en', 'pl-PL' -> 'pl')
    const langCode = browserLang.toLowerCase().split('-')[0]
    
    // Check if we support this language
    const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode)
    if (supportedLang) {
      return supportedLang.code
    }
  }
  
  // Fallback to English if no supported language found
  return 'en'
}

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState<SupportedLanguageCode>('en')
  const [translations, setTranslations] = useState<TranslationsType>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize language on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isManuallySelected = localStorage.getItem('smartcamp-language-manual') === 'true'
      const savedLanguage = localStorage.getItem('smartcamp-language') as SupportedLanguageCode
      
      if (isManuallySelected && savedLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === savedLanguage)) {
        // User manually selected this language, respect their choice
        setLanguageState(savedLanguage)
      } else {
        // No manual selection or invalid saved language, detect browser language
        const detectedLanguage = detectBrowserLanguage()
        setLanguageState(detectedLanguage)
      }
      setIsInitialized(true)
    } else {
      // SSR fallback
      setLanguageState('en')
      setIsInitialized(true)
    }
  }, [])

  // Load translations when language changes and is initialized
  useEffect(() => {
    if (!isInitialized) return

    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        const { default: newTranslations } = await import(`./translations/${language}.json`)
        setTranslations(newTranslations)
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error)
        // Fallback to English translations
        try {
          const { default: englishTranslations } = await import(`./translations/en.json`)
          setTranslations(englishTranslations)
        } catch (fallbackError) {
          console.error('Failed to load English fallback translations:', fallbackError)
          setTranslations({})
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [language, isInitialized])

  const setLanguage = (lang: SupportedLanguageCode) => {
    setLanguageState(lang)
    // Save to localStorage only when user manually selects a specific language
    if (typeof window !== 'undefined') {
      localStorage.setItem('smartcamp-language', lang)
      localStorage.setItem('smartcamp-language-manual', 'true')
    }
  }

  const resetToDetectedLanguage = () => {
    // Clear localStorage and reset to browser-detected language
    if (typeof window !== 'undefined') {
      localStorage.removeItem('smartcamp-language')
      localStorage.removeItem('smartcamp-language-manual')
      const detectedLanguage = detectBrowserLanguage()
      setLanguageState(detectedLanguage)
    }
  }

  // Translation function with support for nested keys
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: string | NestedTranslations | undefined = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  const value: I18nContextType = {
    language,
    setLanguage,
    resetToDetectedLanguage,
    t,
    isLoading
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}