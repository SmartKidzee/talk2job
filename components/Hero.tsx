"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-24 pb-16 md:pt-32 md:pb-24 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-black via-gray-900/80 to-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 -mx-6 sm:-mx-10 lg:-mx-20">
        <FlickeringGrid 
          color="rgb(99, 179, 237)" 
          maxOpacity={0.3}
          width={2000}
          height={1200}
          squareSize={6}
          gridGap={8}
          flickerChance={0.4}
        />
      </div>
      
      <div className="w-full max-w-[1600px] relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight \
                      bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent mb-6 animate-gradient-x">
          Ace Interviews with AI-Powered Voice Practice
        </h1>
        <div className="text-2xl md:text-3xl font-bold mt-2 mb-8 max-w-3xl mx-auto flex flex-col gap-4">
          <p className="text-white">Not just ready. Interview-ready.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="flex items-center">
              <p className="text-2xl md:text-3xl">Real&nbsp;</p>
              <SparklesText className="text-2xl md:text-3xl">questions.</SparklesText>
            </div>
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl">Real&nbsp;</span>
              <AuroraText className="text-2xl md:text-3xl">pressure.</AuroraText>
            </div>
            <div className="flex items-center">
              <span className="text-2xl md:text-3xl">Real&nbsp;</span>
              <LineShadowText className="text-2xl md:text-3xl" shadowColor="#3F84F8">results.</LineShadowText>
            </div>
          </div>
        </div>
        <p className="text-lg md:text-xl text-gray-300 mt-4 mb-8 max-w-2xl mx-auto">
          Talk2Job simulates real-world Q&A sessions using voice. Get instant AI feedback, practice speaking clearly, and boost your confidence.
        </p>
        <div className="mt-10 mb-16 space-x-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-full px-8 py-3 hover:scale-105 hover:shadow-cyan-400/40 transition-all duration-300 shadow-lg"
            asChild
          >
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
          {/* Optional secondary button */}
          {/* <Button 
            size="lg" 
            variant="outline"
            className="border-cyan-500 text-cyan-400 rounded-full px-8 py-3 hover:bg-cyan-900/30 hover:text-cyan-300 transition-colors duration-300"
            asChild
          >
            <Link href="/sign-in">Login</Link> 
          </Button> */} 
        </div>

        {/* OG Cover Image */}
        <div className="w-full max-w-4xl px-4">
          <Image 
            src="/og-cover.png" 
            alt="Talk2Job Platform Showcase" 
            width={1200} 
            height={630} 
            className="rounded-lg shadow-2xl border border-cyan-800/30 object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}

// CSS for animation should be placed in globals.css
/*
@keyframes gradient-x {
    0%, 100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}
.animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 5s ease infinite;
}
*/ 