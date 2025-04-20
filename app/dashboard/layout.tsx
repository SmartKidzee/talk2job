import React from 'react';

// This layout applies specifically to routes within the /dashboard segment.
// It does NOT render the header defined in the root app/layout.tsx.
// It still inherits the html and body tags from the root layout.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* We don't include the <header> here */}
      {/* The main padding/container logic is now in app/dashboard/page.tsx */}
      {children}
      {/* The root layout's <Footer> and <Toaster> will still apply */}
    </>
  );
} 