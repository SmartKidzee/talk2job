import { NextResponse } from 'next/server';

// Define your base site URL
const siteUrl = "https://talk2job.vercel.app";

// Function to generate XML string from sitemap entries
function generateSiteMapXml(entries: Array<{ url: string; lastModified?: Date; changeFrequency?: string; priority?: number }>) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
                http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">`;

  entries.forEach(entry => {
    xml += `<url>`;
    xml += `<loc>${entry.url}</loc>`;
    if (entry.lastModified) {
      xml += `<lastmod>${entry.lastModified.toISOString()}</lastmod>`;
    }
    if (entry.changeFrequency) {
      xml += `<changefreq>${entry.changeFrequency}</changefreq>`;
    }
    if (entry.priority !== undefined) {
      xml += `<priority>${entry.priority.toFixed(1)}</priority>`;
    }
    
    // Add image for pages that should feature OG image
    if (entry.url === siteUrl || 
        entry.url === `${siteUrl}/sign-in` || 
        entry.url === `${siteUrl}/sign-up` || 
        entry.url === `${siteUrl}/interview`) {
      xml += `<image:image>
        <image:loc>${siteUrl}/og-cover.png</image:loc>
        <image:title>Talk2Job – AI Interview Coach</image:title>
        <image:caption>Boost your confidence with real-time, voice-based AI mock interviews</image:caption>
      </image:image>`;
    }
    
    xml += `</url>`;
  });

  xml += `</urlset>`;
  return xml;
}

// Export the GET handler
export async function GET() {
  const today = new Date();
  
  // --- Static Pages ---
  const staticRoutes = [
    // Main pages
    {
      url: siteUrl,
      lastModified: today,
      changeFrequency: 'weekly' as const, 
      priority: 1.0,
    },
    {
      url: `${siteUrl}/dashboard`,
      lastModified: today,
      changeFrequency: 'daily' as const, 
      priority: 0.9,
    },
    {
      url: `${siteUrl}/interview`,
      lastModified: today,
      changeFrequency: 'weekly' as const, 
      priority: 0.9,
    },
    
    // Authentication pages
    {
      url: `${siteUrl}/sign-in`,
      lastModified: today,
      changeFrequency: 'monthly' as const, 
      priority: 0.7,
    },
    {
      url: `${siteUrl}/sign-up`,
      lastModified: today,
      changeFrequency: 'monthly' as const, 
      priority: 0.7,
    },
    {
      url: `${siteUrl}/forgot-password`,
      lastModified: today,
      changeFrequency: 'yearly' as const, 
      priority: 0.3,
    },
    
    // Legal pages
    {
      url: `${siteUrl}/legal/terms`,
      lastModified: today,
      changeFrequency: 'monthly' as const, 
      priority: 0.5,
    },
    {
      url: `${siteUrl}/legal/privacy`,
      lastModified: today,
      changeFrequency: 'monthly' as const, 
      priority: 0.5,
    },
    
    // Error pages
    {
      url: `${siteUrl}/404`,
      lastModified: today,
      changeFrequency: 'yearly' as const, 
      priority: 0.1,
    },
  ];

  // --- Dynamic Pages (Placeholder) ---
  // In a production environment, you would fetch dynamic routes from your database
  // const dynamicInterviewRoutes = await fetchDynamicInterviewUrls(); 
  // const dynamicFeedbackRoutes = await fetchDynamicFeedbackUrls();

  const allEntries = [
    ...staticRoutes,
    // ...dynamicInterviewRoutes, 
    // ...dynamicFeedbackRoutes, 
  ];

  const body = generateSiteMapXml(allEntries);

  return new NextResponse(body, {
    status: 200,
    headers: {
      'Cache-control': 'stale-while-revalidate, s-maxage=3600', // Cache for 1 hour
      'Content-Type': 'application/xml',
    },
  });
} 