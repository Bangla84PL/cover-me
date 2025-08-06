// Basic Claude API integration
export interface GenerateCoverLetterRequest {
  cvText: string
  jobDescription: string
  jobTitle?: string
  companyName?: string
}

export interface GenerateCoverLetterResponse {
  success: boolean
  coverLetter?: string
  error?: string
}

export async function generateCoverLetter({
  cvText,
  jobDescription,
  jobTitle = "the position",
  companyName = "your company"
}: GenerateCoverLetterRequest): Promise<GenerateCoverLetterResponse> {
  try {
    const prompt = `You are a professional cover letter writer. Create a personalized, professional cover letter based on the following information:

CV/Resume Content:
${cvText}

Job Description:
${jobDescription}

Job Title: ${jobTitle}
Company: ${companyName}

Instructions:
1. Write a professional cover letter that highlights relevant experience from the CV
2. Tailor the content to match the job requirements
3. Keep it concise (3-4 paragraphs)
4. Use a professional but engaging tone
5. Include specific examples from the CV that relate to the job
6. End with a strong call to action

Format the letter as a standard business letter without the header (no addresses/dates), starting with "Dear Hiring Manager," or "Dear [Company] Team," and ending with "Sincerely," followed by a placeholder for the candidate's name.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const coverLetter = data.content[0]?.text

    if (!coverLetter) {
      throw new Error('No cover letter generated')
    }

    return {
      success: true,
      coverLetter
    }
  } catch (error) {
    console.error('Cover letter generation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate cover letter'
    }
  }
}