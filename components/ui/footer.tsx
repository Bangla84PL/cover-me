'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useI18n } from '@/lib/i18n/context'

// Dynamically import the newsletter component to avoid hydration issues
const NewsletterSignup = dynamic(() => import('./newsletter-signup'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white/60 animate-pulse">
        Loading...
      </div>
      <div className="bg-emerald-600/50 px-4 py-2 rounded-md text-white font-medium animate-pulse whitespace-nowrap">
        Subscribe
      </div>
    </div>
  )
})

export default function Footer() {
  const { t } = useI18n()
  
  return (
    <footer className="w-full border-t border-white/20 shadow-md mt-auto" style={{
      backgroundImage: "url('/jungle background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-2 py-1">
          <div className="flex flex-col lg:flex-row lg:items-center space-y-1 lg:space-y-0">
            {/* Monkey graphic with copyright - left side */}
            <div className="flex flex-col items-center lg:items-start lg:flex-shrink-0 space-y-1">
              <Link 
                href="https://smartcamp.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg"
              >
                <Image
                  src="/Monkey_SmartCampAI-no-background.png"
                  alt="SmartCamp AI Monkey - Visit SmartCamp.ai"
                  width={240}
                  height={240}
                  className="h-40 w-40 sm:h-48 sm:w-48 object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
                />
              </Link>
              
              {/* Copyright */}
              <div className="text-center lg:text-left text-xs text-white/70">
                <p>&copy; 2025 <Link 
                    href="https://smartcamp.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    SmartCamp AI
                  </Link>. {t('footer.copyright')}</p>
              </div>
            </div>

            {/* Main footer content - more centered */}
            <div className="flex flex-col items-center space-y-1 lg:flex-1 lg:px-2">
              {/* Newsletter Section */}
              <div className="w-full lg:max-w-sm">
                <div className="text-center mb-1">
                  <p className="text-sm text-white/80 mb-0.5">
                    {t('newsletterTitle')}
                  </p>
                  <p className="text-xs text-white/60 mb-1">
                    {t('newsletterDescription')}
                  </p>
                </div>
                <NewsletterSignup />
              </div>
            </div>

            {/* Contact Info - right side on desktop, centered on mobile */}
            <div className="flex flex-col items-center lg:items-end space-y-1 text-sm text-white/80 lg:flex-shrink-0">
              {/* Email */}
              <Link
                href="mailto:hello@smartcamp.ai"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 group"
              >
                <svg 
                  className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>hello@smartcamp.ai</span>
              </Link>

              {/* Phone */}
              <Link
                href="tel:+48518894156"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 group"
              >
                <svg 
                  className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+48 518 894 156</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}