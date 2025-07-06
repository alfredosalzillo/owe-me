export default {
  siteName: "OweMe",
  siteDescription:
    "A modern web application for splitting and managing shared expenses within groups. Built with Next.js, React, and Supabase.\n",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  },
};
