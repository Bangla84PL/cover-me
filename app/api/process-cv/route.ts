import { NextRequest, NextResponse } from 'next/server'
import { extractTextFromPDF, extractTextFromImage, isImageFile, isPDFFile } from '@/lib/pdf-utils'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      )
    }

    let extractedText: string

    if (isPDFFile(file)) {
      extractedText = await extractTextFromPDF(file)
    } else if (isImageFile(file)) {
      extractedText = await extractTextFromImage(file)
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF or image files.' },
        { status: 400 }
      )
    }

    if (!extractedText.trim()) {
      return NextResponse.json(
        { error: 'No text could be extracted from the file' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      text: extractedText,
      fileName: file.name,
      fileSize: file.size
    })
  } catch (error) {
    console.error('CV processing error:', error)
    return NextResponse.json(
      { error: 'Failed to process CV file' },
      { status: 500 }
    )
  }
}