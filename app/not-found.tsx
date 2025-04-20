import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 text-foreground p-6 text-center animate-fadeIn">
      {/* Animated 404 Text */}
      <div className="relative mb-8">
        <h1 className="text-8xl md:text-9xl font-bold text-primary/80 opacity-80 animate-pulse ">
          404
        </h1>
        {/* Optional: Subtle background shape/glow */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="size-48 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        It seems the page you were looking for doesn't exist or has been moved.
        Don't worry, let's get you back on track.
      </p>

      {/* Go Home Button */}
      <Button asChild size="lg">
        <Link href="/">
          <ArrowLeft className="mr-2 size-5" /> Go Back to Homepage
        </Link>
      </Button>
    </div>
  );
}

// Optional: Add keyframes for fadeIn in globals.css if not already present
/*
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
*/ 