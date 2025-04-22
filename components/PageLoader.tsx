"use client";

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
// Removed Spinner import as it's not found
// import { Spinner } from '@/components/ui/spinner';

// Simple inline SVG Spinner component
function SimpleSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export default function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // If the pathname changes, start loading
    if (previousPathname.current !== pathname) {
      setIsLoading(true);
      previousPathname.current = pathname; // Update the ref *after* setting loading
    }
  }, [pathname]);

  useEffect(() => {
    // This effect runs whenever the component related to the *new* pathname renders.
    // We set loading to false here.
    // Adding a slight delay can sometimes help ensure it's visible briefly,
    // but usually, the time between the path change and this effect running is sufficient.
    if (isLoading) {
       // Optional: Small delay to ensure spinner is visible for very fast transitions
       // const timer = setTimeout(() => setIsLoading(false), 50); 
       // return () => clearTimeout(timer);
       
       // Hide loader immediately when the new page component tree renders
       setIsLoading(false); 
    }
    // We only want this effect to run when isLoading becomes true or pathname changes
    // If we only depend on isLoading, it might turn off too early.
    // Depending on pathname ensures it re-evaluates after navigation completes.
  }, [pathname, isLoading]); 

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Using text-cyan-500 as the theme color */}
      <SimpleSpinner className="h-12 w-12 text-cyan-500" />
    </div>
  );
} 