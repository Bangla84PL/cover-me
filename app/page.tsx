import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Cover Letter Generator</h1>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
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
          <Link href="/auth/register">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Free Trial
            </Button>
          </Link>
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
                  Upload Your CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload your CV in PDF or image format. Our AI will analyze your experience and skills.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                  Paste Job URL
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Provide the job posting URL from LinkedIn, Indeed, or company websites for analysis.
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
  );
}
