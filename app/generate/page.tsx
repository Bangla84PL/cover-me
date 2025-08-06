'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function GeneratePage() {
  const [step, setStep] = useState(1)
  const [uploading, setUploading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvText, setCvText] = useState("")
  const [jobUrl, setJobUrl] = useState("")
  const [email, setEmail] = useState("")
  const [generatedLetter, setGeneratedLetter] = useState("")
  const [error, setError] = useState("")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCvFile(file)
    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/process-cv', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process CV')
      }

      setCvText(result.text)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process CV')
      setCvFile(null)
    } finally {
      setUploading(false)
    }
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleGenerate = async () => {
    if (!cvText || !jobUrl || !email || !cvFile) return
    
    setGenerating(true)
    setProgress(0)
    setError("")

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 500)

    try {
      // First upload CV file and save record to Supabase
      const formData = new FormData()
      formData.append('file', cvFile)
      formData.append('email', email)
      formData.append('jobUrl', jobUrl)

      const uploadResponse = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData
      })

      const uploadResult = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error || 'Failed to save CV data')
      }

      // Then generate cover letter
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cvText,
          jobDescription: jobUrl,
          jobTitle: "the position",
          companyName: "the company",
          email: email,
          uploadId: uploadResult.uploadId
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate cover letter')
      }

      setGeneratedLetter(result.coverLetter)
      setProgress(100)
      setStep(4)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate cover letter')
    } finally {
      setGenerating(false)
      clearInterval(progressInterval)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Generate Cover Letter</h1>
          <p className="text-muted-foreground">Create a professional cover letter in 4 simple steps</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-6">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {stepNumber}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepNumber ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {stepNumber === 1 && 'Upload CV'}
                  {stepNumber === 2 && 'Job Details'}
                  {stepNumber === 3 && 'Your Email'}
                  {stepNumber === 4 && 'Generate'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Upload CV */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Your CV</CardTitle>
              <CardDescription>
                Upload your CV in PDF or image format for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cv-upload">Choose CV File</Label>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </div>
              
              {uploading && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">Processing your CV...</p>
                </div>
              )}
              
              {cvFile && !uploading && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">✅ Processed: {cvFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Size: {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
              
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}
              
              <Button 
                onClick={handleNextStep} 
                disabled={!cvFile || uploading || !cvText}
                className="w-full"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Job Details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Paste the job posting URL or enter job details manually
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="job-url">Job Posting URL</Label>
                <Input
                  id="job-url"
                  type="url"
                  placeholder="https://linkedin.com/jobs/..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!jobUrl}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Email Collection */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Email Address</CardTitle>
              <CardDescription>
                We'll send you a copy of your cover letter and save your progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleGenerate}
                  disabled={!email || generating || !email.includes('@')}
                  className="flex-1"
                >
                  {generating ? 'Generating...' : 'Generate Cover Letter'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generation Progress */}
        {generating && (
          <Card>
            <CardHeader>
              <CardTitle>Generating Your Cover Letter</CardTitle>
              <CardDescription>
                Our AI is analyzing your CV and the job posting...
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="text-center text-sm text-muted-foreground">
                {progress < 30 && "Analyzing your CV..."}
                {progress >= 30 && progress < 60 && "Extracting job requirements..."}
                {progress >= 60 && progress < 90 && "Generating personalized content..."}
                {progress >= 90 && "Finalizing your cover letter..."}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && !generating && (
          <Card>
            <CardContent className="pt-6">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive">{error}</p>
              </div>
              <div className="flex space-x-4 mt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Start Over
                </Button>
                <Button onClick={handleGenerate} className="flex-1">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Generated Letter */}
        {step === 4 && generatedLetter && (
          <Card>
            <CardHeader>
              <CardTitle>Your Generated Cover Letter</CardTitle>
              <CardDescription>
                Review and download your personalized cover letter
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">{generatedLetter}</pre>
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Generate Another
                </Button>
                <Button className="flex-1">
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}