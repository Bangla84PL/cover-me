import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServiceRoleClient()
    const formData = await request.formData()
    
    const file = formData.get('file') as File
    const email = formData.get('email') as string
    const jobUrl = formData.get('jobUrl') as string

    if (!file || !email || !jobUrl) {
      return NextResponse.json(
        { error: 'File, email, and job URL are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
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

    // Generate unique filename
    const fileId = uuidv4()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${fileId}.${fileExtension}`
    const filePath = `cv-uploads/${fileName}`

    // Upload file to Supabase Storage
    const fileBuffer = await file.arrayBuffer()
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cv-uploads')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      )
    }

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('cv-uploads')
      .getPublicUrl(filePath)

    // Prepare data for n8n webhook
    const n8nPayload = {
      fileId: fileId,
      fileName: file.name,
      filePath: filePath,
      fileUrl: urlData.publicUrl,
      email: email,
      jobUrl: jobUrl,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString()
    }

    // Trigger n8n workflow via webhook
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
    
    if (!n8nWebhookUrl) {
      console.error('N8N_WEBHOOK_URL environment variable not set')
      return NextResponse.json(
        { error: 'Webhook configuration missing' },
        { status: 500 }
      )
    }

    try {
      const webhookResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(n8nPayload)
      })

      if (!webhookResponse.ok) {
        throw new Error(`Webhook failed with status: ${webhookResponse.status}`)
      }

      const webhookResult = await webhookResponse.json()

      return NextResponse.json({
        success: true,
        fileId: fileId,
        filePath: filePath,
        fileName: file.name,
        webhookTriggered: true,
        n8nResponse: webhookResult
      })
    } catch (webhookError) {
      console.error('n8n webhook error:', webhookError)
      
      // Even if webhook fails, file was uploaded successfully
      return NextResponse.json({
        success: true,
        fileId: fileId,
        filePath: filePath,
        fileName: file.name,
        webhookTriggered: false,
        error: 'Webhook failed but file uploaded successfully'
      })
    }
  } catch (error) {
    console.error('Upload and webhook trigger error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}