import { NextRequest, NextResponse } from 'next/server'

// This is a test webhook endpoint that simulates what n8n would receive
// You can use this to test the webhook integration before setting up n8n

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Test webhook received:', {
      fileId: body.fileId,
      fileName: body.fileName,
      filePath: body.filePath,
      fileUrl: body.fileUrl,
      email: body.email,
      jobUrl: body.jobUrl,
      fileSize: body.fileSize,
      fileType: body.fileType,
      uploadedAt: body.uploadedAt
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return success response that mimics what n8n would return
    return NextResponse.json({
      success: true,
      message: 'Webhook received successfully',
      processedBy: 'test-webhook-endpoint',
      willCallback: false, // Set to true when you want to test callbacks
      estimatedProcessingTime: '2-3 minutes'
    })
  } catch (error) {
    console.error('Test webhook error:', error)
    return NextResponse.json(
      { error: 'Test webhook failed' },
      { status: 500 }
    )
  }
}

// GET endpoint to check webhook status
export async function GET() {
  return NextResponse.json({
    message: 'Test webhook endpoint is active',
    usage: 'POST to this endpoint to simulate n8n webhook reception',
    expectedPayload: {
      fileId: 'uuid',
      fileName: 'original-filename.pdf', 
      filePath: 'cv-uploads/uuid.pdf',
      fileUrl: 'public-url-to-file',
      email: 'user@example.com',
      jobUrl: 'https://job-posting-url',
      fileSize: 12345,
      fileType: 'application/pdf',
      uploadedAt: '2024-01-01T00:00:00.000Z'
    }
  })
}