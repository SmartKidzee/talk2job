import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-t from-black via-gray-900 to-black">
      <div className="container mx-auto max-w-4xl text-center bg-gradient-to-br from-cyan-900/30 via-gray-900/40 to-blue-900/30 p-10 md:p-16 rounded-2xl border border-cyan-700/30 shadow-xl relative overflow-hidden">
        {/* Optional decorative elements */}
        <div className="absolute -top-10 -left-10 size-40 bg-cyan-500/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute -bottom-10 -right-10 size-40 bg-blue-500/10 rounded-full filter blur-3xl -z-10"></div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-100">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Stop guessing, start practicing. Sign up now and gain the confidence to ace any interview.
        </p>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-full px-10 py-3 hover:scale-105 hover:shadow-cyan-400/50 transition-all duration-300 shadow-lg text-base"
          asChild
        >
          <Link href="/sign-up">Start Practicing Now</Link>
        </Button>
      </div>
    </section>
  );
} 