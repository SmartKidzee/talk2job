import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const authorName = "Shreyas J";

  return (
    <footer className="w-full border-t border-border mt-12 py-6 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p className="text-center md:text-left mb-2 md:mb-0">
          &copy; {currentYear} {authorName}. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href="/legal/terms" className="hover:text-primary hover:underline transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/legal/privacy" className="hover:text-primary hover:underline transition-colors">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer; 