import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Talk2Job – Voice-Based AI Interview Prep",
  description:
    "Talk2Job helps you crack interviews with interactive voice-based AI sessions that simulate real-world scenarios. Practice speaking, get feedback, and boost your confidence.",
  keywords: [
    "AI interview prep",
    "voice-based interview practice",
    "job preparation",
    "AI mock interviews",
    "Talk2Job",
    "interview simulator",
    "AI job coaching",
  ],
  openGraph: {
    title: "Talk2Job – AI Interview Coach",
    description:
      "Boost your confidence with real-time, voice-based AI mock interviews. Get personalized feedback and interview smarter.",
    url: "https://talk2job.vercel.app",
    siteName: "Talk2Job",
    images: [
      {
        url: "https://talk2job.vercel.app/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Talk2Job OG Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talk2Job – Voice-Based AI Interview Prep",
    description:
      "Voice-powered AI that simulates real interview scenarios. Practice anywhere, anytime. Built for ambitious job seekers.",
    images: ["https://talk2job.vercel.app/og-cover.png"],
  },
  metadataBase: new URL("https://talk2job.vercel.app"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="dark hydrated h-full">
      <body className={`${monaSans.className} antialiased pattern bg-background text-foreground transition-colors duration-300 flex flex-col min-h-screen`}>
        {/* === Conditionally Render Logged-In Header === */}
        {user && (
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
              {/* Logo/Brand Link - Always links to dashboard when this header shows */}
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Talk2Job Logo" width={28} height={28} />
                <span className="font-semibold text-primary">Talk2Job</span>
              </Link>
              <LogoutButton />
            </div>
          </header>
        )}
        {/* === End Logged-In Header === */}
        
        {/* The public <Navbar> component is rendered only by app/page.tsx */}

        {/* Main Content Area - Adjust padding based on header presence */}
        <main className={`flex-grow container ${user ? 'pt-6' : 'pt-0'} pb-8`}>
          {children}
        </main>
        
        <Toaster />
        <Footer />
        <Analytics />
        {/* JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              // Add WebSite type for sitelinks search box potential
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                url: "https://talk2job.vercel.app",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://talk2job.vercel.app/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              // Keep the SoftwareApplication type
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Talk2Job",
                operatingSystem: "Web", // Can be more specific like "Windows, macOS, Web"
                applicationCategory: "BusinessApplication", // Or EducationApplication?
                offers: {
                  "@type": "Offer",
                  price: "0.00",
                  priceCurrency: "USD",
                },
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: "4.9", // Placeholder - Update with real data if possible
                  reviewCount: "128", // Placeholder - Update with real data if possible
                },
                author: {
                  "@type": "Person",
                  name: "Shreyas J",
                  url: "https://iamshreyas.live" // Optional: Add author URL
                },
              }
            ])
          }}
        />
      </body>
    </html>
  );
}
