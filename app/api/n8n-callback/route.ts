import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServiceRoleClient()
    const body = await request.json()
    
    const { 
      fileId, 
      pdfUrl, 
      coverLetterText, 
      email,
      status,
      error: processError 
    } = body

    if (!fileId) {
      return NextResponse.json(
        { error: 'fileId is required' },
        { status: 400 }
      )
    }

    // Log the callback for debugging
    console.log('n8n callback received:', {
      fileId,
      pdfUrl: pdfUrl ? 'URL provided' : 'No URL',
      coverLetterText: coverLetterText ? 'Text provided' : 'No text',
      email,
      status,
      error: processError
    })

    if (status === 'success' && pdfUrl) {
      // Download the PDF from n8n and upload to Supabase
      try {
        const pdfResponse = await fetch(pdfUrl)
        if (!pdfResponse.ok) {
          throw new Error(`Failed to download PDF: ${pdfResponse.status}`)
        }

        const pdfBuffer = await pdfResponse.arrayBuffer()
        const pdfPath = `generated-pdfs/${fileId}.pdf`

        // Upload PDF to Supabase storage
        const { data: pdfUploadData, error: pdfUploadError } = await supabase.storage
          .from('cv-uploads')
          .upload(pdfPath, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true
          })

        if (pdfUploadError) {
          console.error('PDF upload error:', pdfUploadError)
        } else {
          console.log('PDF uploaded successfully:', pdfPath)
        }

        // Get public URL for the PDF
        const { data: pdfUrlData } = supabase.storage
          .from('cv-uploads')
          .getPublicUrl(pdfPath)

        return NextResponse.json({
          success: true,
          message: 'PDF processed and stored successfully',
          pdfPath: pdfPath,
          pdfUrl: pdfUrlData.publicUrl,
          coverLetterText: coverLetterText
        })
      } catch (pdfError) {
        console.error('PDF processing error:', pdfError)
        return NextResponse.json(
          { error: 'Failed to process PDF from n8n' },
          { status: 500 }
        )
      }
    } else {
      // Handle error case
      console.error('n8n workflow failed:', processError)
      return NextResponse.json({
        success: false,
        message: 'n8n workflow failed',
        error: processError
      })
    }
  } catch (error) {
    console.error('n8n callback error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}