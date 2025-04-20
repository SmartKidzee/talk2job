import { NextResponse } from 'next/server';

// Define your base site URL
const siteUrl = "https://talk2job.vercel.app";

// Function to generate XML string from sitemap entries
function generateSiteMapXml(entries: Array<{ url: string; lastModified?: Date; changeFrequency?: string; priority?: number }>) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

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
    xml += `</url>`;
  });

  xml += `</urlset>`;
  return xml;
}

// Export the GET handler
export async function GET() {
  // --- Static Pages ---
  const staticRoutes = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const, 
      priority: 1.0,
    },
    {
      url: `${siteUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, 
      priority: 0.5,
    },
    {
      url: `${siteUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const, 
      priority: 0.5,
    },
    // Add other known static pages if any (e.g., /about, /contact)
  ];

  // --- Dynamic Pages (Placeholder - Needs Data Fetching) ---
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