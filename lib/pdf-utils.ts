export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Dynamic import to avoid module loading issues
    const pdf = (await import('pdf-parse')).default
    
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const data = await pdf(buffer)
    return data.text
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

export function extractTextFromImage(file: File): Promise<string> {
  // For now, return a placeholder. In a real implementation,
  // you would use an OCR service like Tesseract.js or Google Vision API
  return Promise.resolve(`[CV content extracted from image: ${file.name}]
  
  This is a placeholder for OCR text extraction. In a real implementation, 
  this would contain the actual text extracted from the CV image using 
  OCR technology.`)
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf'
}