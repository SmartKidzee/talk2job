import { MetadataRoute } from 'next';

// Define your base site URL
const siteUrl = "https://talk2job.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
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

  // --- Dynamic Pages (Example - Needs Data Fetching) ---
  // In a real app, you would fetch dynamic data here (e.g., interview IDs)
  // const interviews = await fetchInterviewIdsFromDB(); // Replace with your actual fetch logic
  // const dynamicInterviewRoutes = interviews.map((interview) => ({
  //   url: `${siteUrl}/interview/${interview.id}`,
  //   lastModified: new Date(), // Or interview.updatedAt
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }));
  // const dynamicFeedbackRoutes = interviews.map((interview) => ({
  //   url: `${siteUrl}/interview/${interview.id}/feedback`,
  //   lastModified: new Date(), // Or feedback.updatedAt
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticRoutes,
    // ...dynamicInterviewRoutes, // Uncomment when data fetching is added
    // ...dynamicFeedbackRoutes, // Uncomment when data fetching is added
  ];
} 