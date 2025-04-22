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
import PageLoader from "@/components/PageLoader";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

// Use absolute URL for OG image
const ogImageUrl = "https://talk2job.vercel.app/og-cover.png";

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
  // OpenGraph metadata for most platforms including WhatsApp
  openGraph: {
    title: "Talk2Job – AI Interview Coach",
    description:
      "Boost your confidence with real-time, voice-based AI mock interviews. Get personalized feedback and interview smarter.",
    url: "https://talk2job.vercel.app",
    siteName: "Talk2Job",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Talk2Job OG Banner",
        type: "image/png", // Explicitly specify image type
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card metadata - using X's specific requirements
  twitter: {
    card: "summary_large_image",
    title: "Talk2Job – Voice-Based AI Interview Prep",
    description:
      "Voice-powered AI that simulates real interview scenarios. Practice anywhere, anytime.",
    site: "@talk2job", // If you have a Twitter handle
    creator: "@talk2job", // If you have a Twitter handle
    images: [
      {
        url: ogImageUrl,
        alt: "Talk2Job Preview Image",
        width: 1200,
        height: 630,
      },
    ],
  },
  // Additional meta tags for better compatibility
  metadataBase: new URL("https://talk2job.vercel.app"),
  alternates: {
    canonical: "https://talk2job.vercel.app",
  },
  other: {
    "twitter:image": ogImageUrl, // Fallback for older Twitter card implementations
    "og:image:secure_url": ogImageUrl, // HTTPS version of the image URL
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "Talk2Job – AI Interview Coach",
    "og:image:type": "image/png", // Explicitly set image MIME type
  },
  verification: {
    google: "your-google-site-verification", // Add this if you have it
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="dark hydrated h-full w-full">
      <head>
        {/* Manually added meta tags for additional platforms */}
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:secure_url" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Talk2Job – AI Interview Coach" />
        <meta property="og:image:type" content="image/png" />
        
        {/* WhatsApp specific meta tags */}
        <meta property="og:site_name" content="Talk2Job" />
        <meta property="og:title" content="Talk2Job – AI Interview Coach" />
        <meta property="og:description" content="Boost your confidence with real-time, voice-based AI mock interviews." />
        
        {/* Twitter/X specific tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:title" content="Talk2Job – Voice-Based AI Interview Prep" />
        <meta name="twitter:description" content="Voice-powered AI that simulates real interview scenarios." />
      </head>
      <body className={`${monaSans.className} antialiased pattern bg-background text-foreground transition-colors duration-300 flex flex-col min-h-screen w-full overflow-x-hidden`}>
        <PageLoader />
        {/* === Conditionally Render Logged-In Header === */}
        {user && (
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 sm:px-10 lg:px-16 py-4">
            <div className="flex h-14 items-center justify-between">
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

        {/* Main Content Area - Added w-full */}
        <main className={`flex-grow ${user ? 'pt-6' : 'pt-0'} pb-8 w-full`}>
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
                name: "Talk2Job",
                description: "Voice-Based AI Interview Prep",
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
