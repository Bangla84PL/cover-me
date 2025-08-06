'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function Home() {
  const [step, setStep] = useState<'hero' | 'form' | 'generating' | 'result'>('hero')
  const [email, setEmail] = useState("")
  const [jobUrl, setJobUrl] = useState("")
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedLetter, setGeneratedLetter] = useState("")
  const [error, setError] = useState("")

  const handleGetStarted = () => {
    setStep('form')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCvFile(file)
    }
  }

  const handleGenerate = async () => {
    if (!email || !jobUrl || !cvFile) return
    
    setGenerating(true)
    setStep('generating')
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
      // First process CV to extract text
      const formData = new FormData()
      formData.append('file', cvFile)

      const cvResponse = await fetch('/api/process-cv', {
        method: 'POST',
        body: formData
      })

      const cvResult = await cvResponse.json()

      if (!cvResponse.ok) {
        throw new Error(cvResult.error || 'Failed to process CV')
      }

      // Then upload to Supabase
      const uploadFormData = new FormData()
      uploadFormData.append('file', cvFile)
      uploadFormData.append('email', email)
      uploadFormData.append('jobUrl', jobUrl)

      const uploadResponse = await fetch('/api/upload-cv', {
        method: 'POST',
        body: uploadFormData
      })

      const uploadResult = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.error || 'Failed to save CV data')
      }

      // Finally generate cover letter
      const generateResponse = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cvText: cvResult.text,
          jobDescription: jobUrl,
          jobTitle: "the position",
          companyName: "the company",
          email: email,
          uploadId: uploadResult.uploadId
        })
      })

      const generateResult = await generateResponse.json()

      if (!generateResponse.ok) {
        throw new Error(generateResult.error || 'Failed to generate cover letter')
      }

      setGeneratedLetter(generateResult.coverLetter)
      setProgress(100)
      setStep('result')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate cover letter')
      setStep('form')
    } finally {
      setGenerating(false)
      clearInterval(progressInterval)
    }
  }

  const handleStartOver = () => {
    setStep('form')
    setEmail("")
    setJobUrl("")
    setCvFile(null)
    setGeneratedLetter("")
    setError("")
    setProgress(0)
  }

  if (step === 'hero') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Cover Letter Generator</h1>
            <div className="space-x-4">
              <Button variant="ghost" onClick={handleGetStarted}>Try Demo</Button>
              <Button onClick={handleGetStarted}>Get Started</Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Generate Professional Cover Letters in Minutes
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your CV and job URLs into personalized, professional cover letters using AI. 
              Simple 3-step process that saves you hours of writing.
            </p>
            <Button size="lg" className="text-lg px-8 py-3" onClick={handleGetStarted}>
              Start Free Trial
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                    Enter Your Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Provide your email address to receive your personalized cover letter.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                    Upload CV & Job Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Upload your CV and paste the job posting URL for AI analysis and personalization.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                    Get Your Letter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receive a personalized, professional cover letter tailored to the specific job.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-8 px-4">
          <div className="container mx-auto text-center text-muted-foreground">
            <p>&copy; 2024 Cover Letter Generator. Built with Next.js and Supabase.</p>
          </div>
        </footer>
      </div>
    )
  }

  if (step === 'form') {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Generate Your Cover Letter</h1>
            <p className="text-muted-foreground">Fill in your details to get started</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                We need your email, CV, and the job you're applying for
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Job URL Field */}
              <div className="space-y-2">
                <Label htmlFor="job-url">Job Posting URL *</Label>
                <Input
                  id="job-url"
                  type="url"
                  placeholder="https://linkedin.com/jobs/..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  required
                />
              </div>

              {/* CV Upload Field */}
              <div className="space-y-2">
                <Label htmlFor="cv-upload">Upload Your CV *</Label>
                <Input
                  id="cv-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  required
                />
                {cvFile && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">✅ Selected: {cvFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Size: {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep('hero')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleGenerate}
                  disabled={!email || !jobUrl || !cvFile || !email.includes('@') || generating}
                  className="flex-1"
                >
                  Generate Cover Letter
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-2xl">
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
                {progress < 30 && "Processing your CV..."}
                {progress >= 30 && progress < 60 && "Analyzing job requirements..."}
                {progress >= 60 && progress < 90 && "Generating personalized content..."}
                {progress >= 90 && "Finalizing your cover letter..."}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 'result') {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-4xl">
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
                <Button variant="outline" onClick={handleStartOver} className="flex-1">
                  Generate Another
                </Button>
                <Button className="flex-1">
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}