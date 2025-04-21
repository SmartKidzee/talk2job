"use client";

import React from 'react';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';

// This layout applies specifically to routes within the /dashboard segment.
// It does NOT render the header defined in the root app/layout.tsx.
// It still inherits the html and body tags from the root layout.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Flickering grid background */}
      <div className="absolute inset-0 z-0">
        <FlickeringGrid 
          color="rgb(99, 179, 237)" 
          maxOpacity={0.2}
        />
      </div>
      
      {/* Content with relative positioning to appear above the grid */}
      <div className="relative z-10">
        {children}
      </div>
      {/* The root layout's <Footer> and <Toaster> will still apply */}
    </div>
  );
} 