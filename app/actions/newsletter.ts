'use server'

import { supabaseServer } from '@/lib/supabase/server'

export async function subscribeToNewsletter(email: string) {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      }
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabaseServer
      .from('Newsletter-signup')
      .select('email')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError)
      return {
        success: false,
        message: 'Database error occurred'
      }
    }

    if (existingUser) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter'
      }
    }

    // Insert new subscriber
    const { data, error } = await supabaseServer
      .from('Newsletter-signup')
      .insert([
        {
          email: email.toLowerCase().trim(),
          source: 'starter',
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Newsletter signup error:', error)
      return {
        success: false,
        message: 'Failed to subscribe. Please try again.'
      }
    }

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred'
    }
  }
}