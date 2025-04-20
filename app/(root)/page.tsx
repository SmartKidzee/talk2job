import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser} from "@/lib/actions/auth.action";
import {getInterviewsByUserId, getLatestInterviews} from "@/lib/actions/general.action";
import { redirect } from 'next/navigation'; // Import redirect for server-side redirect

const Page = async () => { // Make async again
    const user = await getCurrentUser();

    if (!user) {
      // Redirect to login if user is not authenticated
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
        <>
            {/* Logout Button is removed */} 

            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className="text-lg">Practice on real interview questions & get instant feedback</p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                
                <Image src="/robot.png" alt="robo dude" width={400} height={400} className="max-sm:hidden xl:bg-transparent rounded-2xl" />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>

                <div className="interviews-section">
                    {hasPastInterviews ? (
                        userInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} userId={user.id} />
                        ))) : (
                            <p>You haven&apos;t taken any interviews yet</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>
                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        latestInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} userId={user.id} />
                        ))) : (
                        <p>There are no new interviews available yet.</p>
                    )}
                </div>
            </section>
        </>
    )
}
export default Page
