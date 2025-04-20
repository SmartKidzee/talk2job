"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Image

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-8 py-3 shadow-lg border-b border-cyan-900/30 backdrop-blur-lg bg-black/60 sticky top-0 z-50">
      {/* Logo/Brand */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="Talk2Job Logo" width={32} height={32} className="rounded-md" />
        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Talk2Job
        </span>
      </Link>
      
      {/* Auth Buttons */}
      <div className="space-x-2 md:space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
        <Button className="bg-cyan-500 hover:bg-cyan-400/90 text-black font-semibold shadow-cyan-500/30 shadow-md rounded-full px-5"
                asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
} 