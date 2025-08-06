import { NextRequest, NextResponse } from 'next/server'
import { generateCoverLetter } from '@/lib/claude'

export async function POST(request: NextRequest) {
  try {
    const { cvText, jobDescription, jobTitle, companyName } = await request.json()

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