import React from 'react'
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Metadata } from 'next'; // Import Metadata

// Add metadata export
export const metadata: Metadata = {
  title: "Start Interview – Talk2Job",
  description: "Choose an interview type and start practicing with the Talk2Job AI coach.",
};

const Page = async () => {
    const user = await getCurrentUser();

    return (
        <>
            <h3>Interview generation</h3>

            <Agent
                userName={user?.name!}
                userId={user?.id}
                type="generate"
            />
        </>
    );
};

export default Page;