import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { I18nProvider } from "@/lib/i18n/context";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SmartCamp.AI - AI | Automations | Web Dev",
  description: "AI | Automations | Web Dev - SmartCamp.AI",
  keywords: ["AI", "Artificial Intelligence", "Automations", "Web Development", "SmartCamp", "Technology", "Innovation"],
  authors: [{ name: "SmartCamp.AI" }],
  creator: "SmartCamp.AI",
  publisher: "SmartCamp.AI",
  
  // Open Graph / Facebook
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smartcamp.ai',
    siteName: 'SmartCamp.AI',
    title: 'SmartCamp.AI - AI | Automations | Web Dev',
    description: 'AI | Automations | Web Dev - SmartCamp.AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartCamp.AI - AI, Automations & Web Development',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@SmartCampAI',
    creator: '@SmartCampAI',
    title: 'SmartCamp.AI - AI | Automations | Web Dev',
    description: 'AI | Automations | Web Dev - SmartCamp.AI',
    images: ['/og-image.png'],
  },
  
  // Additional meta tags for other platforms
  other: {
    // Telegram
    'telegram:channel': '@SmartCampAI',
    // LinkedIn 
    'article:author': 'SmartCamp.AI',
    // WhatsApp / General
    'og:image:alt': 'SmartCamp.AI - AI, Automations & Web Development',
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} antialiased min-h-screen flex flex-col jungle-background font-jost`}
      >
        <I18nProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}