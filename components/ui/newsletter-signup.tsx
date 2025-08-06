"use client"

import { useState } from 'react'
import { subscribeToNewsletter } from '@/app/actions/newsletter'
import { useI18n } from '@/lib/i18n/context'

export default function NewsletterSignup() {
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await subscribeToNewsletter(email)
      
      if (result.success) {
        setMessage({ type: 'success', text: result.message })
        setEmail('')
      } else {
        setMessage({ type: 'error', text: result.message })
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="px-4 py-2 text-white font-medium rounded-md border border-white/30 relative overflow-hidden hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-out hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap"
          style={{ 
            backgroundImage: "url('/jungle background.png')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-md transition-all duration-300 hover:bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">{isSubmitting ? t('subscribing') : t('subscribeButton')}</span>
        </button>
      </form>
      
      {message && (
        <div className={`text-xs px-2 py-1 rounded ${
          message.type === 'success' 
            ? 'bg-green-600/20 text-green-200 border border-green-500/30' 
            : 'bg-red-600/20 text-red-200 border border-red-500/30'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  )
}