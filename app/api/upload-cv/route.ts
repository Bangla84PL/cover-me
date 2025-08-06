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

    // Insert record into cv_uploads table
    const { data: insertData, error: insertError } = await supabase
      .from('cv_uploads')
      .insert({
        id: fileId,
        email: email,
        job_url: jobUrl,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: file.type,
        uploaded_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      // If database insert fails, clean up the uploaded file
      await supabase.storage
        .from('cv-uploads')
        .remove([filePath])
      
      console.error('Database insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to save upload record' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      uploadId: fileId,
      filePath: filePath,
      fileName: file.name
    })
  } catch (error) {
    console.error('CV upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}