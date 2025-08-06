import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabaseServer
      .from('Newsletter-signup')
      .select('email')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database check error:', checkError)
      return NextResponse.json(
        { success: false, message: 'Database error occurred' },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'This email is already subscribed to our newsletter' },
        { status: 409 }
      )
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
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      data
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// Test endpoint
export async function GET() {
  try {
    const { count, error } = await supabaseServer
      .from('Newsletter-signup')
      .select('*', { count: 'exact', head: true })

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Database connection failed', error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      count: count
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Connection test failed', error: String(error) },
      { status: 500 }
    )
  }
}