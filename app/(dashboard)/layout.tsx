import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl font-bold text-foreground">Cover Letter Generator</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/dashboard" className="text-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/dashboard/generate" className="text-foreground hover:text-primary">
              Generate
            </Link>
            <Link href="/dashboard/history" className="text-foreground hover:text-primary">
              History
            </Link>
          </nav>
          <Button variant="ghost">
            Sign Out
          </Button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}