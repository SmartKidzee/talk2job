import Link from 'next/link';
import React from 'react';
import { Metadata } from 'next';

// Add metadata export
export const metadata: Metadata = {
  title: "Terms & Conditions – Talk2Job",
  description: "Read the Terms and Conditions for using the Talk2Job AI interview preparation platform.",
};

const TermsPage = () => {
  const projectName = "Talk2Job";
  const authorName = "Shreyas J";
  const contactEmail = "shreyassmart123@gmail.com";
  const websiteUrl = "https://talk2job.vercel.app";
  const effectiveDate = "April 22, 2025"; // Update with actual date

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 lg:p-16 font-sans">
      <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-md border border-border">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">{projectName} - Terms and Conditions</h1>
        <p className="mb-4 text-muted-foreground">Effective Date: {effectiveDate}</p>

        <p className="mb-6">
          Welcome to {projectName}! These Terms and Conditions ("Terms") govern your use of our website located at {websiteUrl} (the "Service") operated by {authorName} ("us", "we", or "our"). Please read these Terms carefully before using the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Service Description</h2>
        <p className="mb-4">
          {projectName} is an AI-powered platform designed to help users practice for technical and behavioral job interviews using voice interaction. The Service provides simulated interview scenarios, feedback, and analysis based on user responses.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. User Accounts</h2>
        <p className="mb-4">
          To access certain features of the Service, you may need to create an account. You are responsible for safeguarding your account password and for any activities or actions under your account. You agree to notify us immediately upon becoming aware of any breach of security or unauthorized use of your account. You must provide information that is accurate, complete, and current at all times.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. User Obligations</h2>
        <p className="mb-4">
          You agree not to use the Service:
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
            <li>To impersonate or attempt to impersonate {projectName}, an employee, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm {projectName} or users of the Service or expose them to liability.</li>
          </ul>
        </p>

         <h2 className="text-2xl font-semibold mt-6 mb-3">5. Intellectual Property</h2>
         <p className="mb-4">
           The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of {authorName} and its licensors. The Service is protected by copyright, trademark, and other laws of both the relevant jurisdictions and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of {authorName}.
         </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Third-Party Services</h2>
        <p className="mb-4">
          {projectName} utilizes third-party services to provide its functionality, including but not limited to:
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Firebase (Google): For authentication, database, and hosting services. Your use of these aspects is also subject to Google's terms and policies.</li>
            <li>Google Gemini API: For AI-powered analysis and interaction. Usage data may be processed by Google according to their API terms and privacy policies.</li>
            <li>Vapi: For voice interaction capabilities. Voice data processing is subject to Vapi's terms and privacy policies.</li>
          </ul>
          We are not responsible for the practices employed by these third-party services. We recommend you review their terms and privacy policies.
        </p>


        <h2 className="text-2xl font-semibold mt-6 mb-3">7. Termination</h2>
        <p className="mb-4">
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">8. Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall {authorName}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">9. Disclaimer</h2>
        <p className="mb-4">
          Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance. {projectName} does not guarantee that the AI feedback is perfectly accurate or suitable for all situations. It is intended as a preparatory tool.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">10. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of the jurisdiction where {authorName} resides (please specify, e.g., India, California, USA), without regard to its conflict of law provisions.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">11. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">12. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at: {contactEmail}
        </p>

        <div className="mt-8 text-center">
            <Link href="/" className="text-primary hover:underline">
              &larr; Back to Homepage
            </Link>
          </div>
      </div>
    </div>
  );
};

export default TermsPage; 