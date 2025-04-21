import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser} from "@/lib/actions/auth.action";
import {getInterviewsByUserId, getLatestInterviews} from "@/lib/actions/general.action";
import { redirect } from 'next/navigation'; 
import { Metadata } from 'next';

// Add specific metadata for the dashboard page
export const metadata: Metadata = {
  title: "Dashboard – Talk2Job",
  description: "Access your Talk2Job dashboard to view past interviews and start new AI practice sessions.",
};

const DashboardPage = async () => {
    const user = await getCurrentUser();

    if (!user) {
      // This should ideally be handled by middleware or layout group logic,
      // but redirecting here is a fallback.
      redirect('/sign-in'); 
    }

    // Fetch data now that we know user exists
    const [userInterviewsData, latestInterviewsData] = await Promise.all([
        getInterviewsByUserId(user.id),
        getLatestInterviews({ userId: user.id })
    ]);

    // Provide default empty arrays if data is null/undefined
    const userInterviews = userInterviewsData || []; 
    const latestInterviews = latestInterviewsData || [];

    const hasPastInterviews = userInterviews.length > 0;
    const hasUpcomingInterviews = latestInterviews.length > 0;

    return (
      // Outer wrapper for centering and max-width (boxed layout)
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main container for dashboard content with padding */}
        <div className="space-y-12 md:space-y-16 py-6 md:py-8">

          {/* Top Section: CTA/Welcome */}
          {/* Assuming card-cta provides necessary base styles */}
          <section className="card-cta flex flex-col md:flex-row items-center justify-between gap-8 p-6 md:p-8 rounded-xl bg-card border border-border shadow-sm">
            <div className="flex flex-col gap-4 max-w-lg text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold leading-tight">Get Interview-Ready Today!</h2>
              <p className="text-base md:text-lg text-muted-foreground">
                Practice challenging questions with our AI and receive instant, personalized feedback.
              </p>
              <Button size="lg" asChild className="mt-2 w-full md:w-fit">
                <Link href="/interview">Start a New Interview</Link>
              </Button>
            </div>
            {/* Image container with specific styling */}
            <div className="flex-shrink-0 hidden md:block">
              <Image 
                src="/robot.png" 
                alt="AI Assistant Robot" 
                width={250} // Adjusted size
                height={250} // Adjusted size
                className="rounded-lg object-contain" 
              />
            </div>
          </section>

          {/* Section: Your Past Interviews */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Your Past Interviews</h2>
            {/* Assuming interviews-section applies grid/flex styles */}
            <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hasPastInterviews ? (
                userInterviews.map((interview) => (
                  <InterviewCard {...interview} key={interview.id} userId={user.id} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center py-4">You haven&apos;t taken any interviews yet. Start one above!</p>
              )}
            </div>
          </section>

          {/* Section: Available Interviews to Take */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Available Interviews</h2>
            {/* Reusing interviews-section styling */}
            <div className="interviews-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hasUpcomingInterviews ? (
                latestInterviews.map((interview) => (
                  <InterviewCard {...interview} key={interview.id} userId={user.id} />
                ))
              ) : (
                <p className="text-muted-foreground col-span-full text-center py-4">There are no new interviews available at the moment.</p>
              )}
            </div>
          </section>

        </div> {/* // Close main container */}
      </div> // Close outer wrapper
    )
}
export default DashboardPage 