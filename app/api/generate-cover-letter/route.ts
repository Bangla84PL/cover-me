import { NextRequest, NextResponse } from 'next/server'
import { generateCoverLetter } from '@/lib/claude'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { cvText, jobDescription, jobTitle, companyName, email, uploadId } = await request.json()

    if (!cvText || !jobDescription) {
      return NextResponse.json(
        { error: 'CV text and job description are required' },
        { status: 400 }
      )
    }

    const result = await generateCoverLetter({
      cvText,
      jobDescription,
      jobTitle,
      companyName
    })

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    // If we have an uploadId, update the cv_uploads record with the generated cover letter
    if (uploadId && email) {
      try {
        const supabase = await createClient()
        await supabase
          .from('cv_uploads')
          .update({
            cover_letter: result.coverLetter,
            generated_at: new Date().toISOString()
          })
          .eq('id', uploadId)
          .eq('email', email) // Extra security check
      } catch (dbError) {
        console.error('Failed to save cover letter to database:', dbError)
        // Don't fail the request if database update fails
      }
    }

    return NextResponse.json({
      success: true,
      coverLetter: result.coverLetter
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}