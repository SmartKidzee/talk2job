import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"; // Assuming component paths
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
// Footer is likely rendered in the root layout, so omitting here

export default function HomePage() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session");

  if (sessionCookie) {
    // If the session cookie exists, redirect to the dashboard
    redirect("/dashboard");
  }

  // If no session cookie, render the public homepage
  return (
    <div className="flex flex-col min-h-screen bg-black"> {/* Use flex-col */} 
      <Navbar />
      <main className="flex-grow"> {/* Add flex-grow to main */} 
        <Hero />
        <Features />
        <CTA />
      </main>
      {/* Footer is rendered via app/layout.tsx */}
    </div>
  );
} 