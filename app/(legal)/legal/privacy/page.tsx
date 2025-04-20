import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

// Add metadata export
export const metadata: Metadata = {
  title: "Privacy Policy – Talk2Job",
  description: "Understand how Talk2Job collects, uses, and protects your data in our Privacy Policy.",
};

const PrivacyPage = () => {
  const projectName = "Talk2Job";
  const authorName = "Shreyas J";
  const contactEmail = "shreyassmart123@gmail.com";
  const websiteUrl = "https://talk2job.vercel.app";
  const effectiveDate = "October 26, 2024"; // Update with actual date

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 lg:p-16 font-sans">
      <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-md border border-border">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">{projectName} - Privacy Policy</h1>
        <p className="mb-4 text-muted-foreground">Effective Date: {effectiveDate}</p>

        <p className="mb-6">
          {authorName} ("us", "we", or "our") operates the {websiteUrl} website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">1. Information Collection and Use</h2>
        <p className="mb-4">
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-2">Types of Data Collected</h3>
        <p className="mb-2"><strong>Personal Data:</strong></p>
        <p className="mb-4">
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Email address</li>
            <li>First name and last name (or display name)</li>
            <li>Account credentials (password is hashed)</li>
            <li>Cookies and Usage Data</li>
          </ul>
        </p>

        <p className="mb-2"><strong>Usage Data:</strong></p>
        <p className="mb-4">
          We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
        </p>

        <p className="mb-2"><strong>Voice Data:</strong></p>
        <p className="mb-4">
          As a core feature, {projectName} processes your voice input during simulated interviews. This voice data is processed by our third-party provider (Vapi) to enable voice interaction and by the Google Gemini API for analysis and feedback generation. We do not permanently store raw audio recordings after the session analysis is complete, unless necessary for debugging or service improvement with explicit notice.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Use of Data</h2>
        <p className="mb-4">
          {projectName} uses the collected data for various purposes:
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To provide AI-driven feedback and analysis on your interview performance</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">3. Data Transfer and Third-Party Services</h2>
        <p className="mb-4">
          Your information, including Personal Data and Voice Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those from your jurisdiction.
        </p>
        <p className="mb-4">
          We use third-party services to operate {projectName}:
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li><strong>Firebase (Google):</strong> For authentication, database storage (including user info and interview results/feedback), and hosting. Data is stored and processed according to Google's Privacy Policy.</li>
            <li><strong>Google Gemini API:</strong> User voice input (transcribed) and interaction context are sent to the Google Gemini API for processing to generate AI responses and feedback. This usage is subject to Google's API Privacy Policy.</li>
            <li><strong>Vapi:</strong> Handles the real-time voice-to-text and text-to-voice functionality. Voice data is processed by Vapi according to their Privacy Policy.</li>
          </ul>
          Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer and processing.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">4. Disclosure of Data</h2>
        <p className="mb-4">
          We may disclose your Personal Data in the good faith belief that such action is necessary to:
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>To comply with a legal obligation</li>
            <li>To protect and defend the rights or property of {authorName}</li>
            <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>To protect the personal safety of users of the Service or the public</li>
            <li>To protect against legal liability</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">5. Data Security</h2>
        <p className="mb-4">
          The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. We use commercially acceptable means to protect your Personal Data (such as hashing passwords and using secure connections via HTTPS), but we cannot guarantee its absolute security. We rely on the security practices of our third-party providers (Google Cloud/Firebase, Vapi) for infrastructure security.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">6. Your Data Protection Rights (GDPR & Others)</h2>
        <p className="mb-4">
          Depending on your location, you may have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.
          <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
            <li><strong>Right to Access:</strong> You have the right to access information we hold about you.</li>
            <li><strong>Right to Rectification:</strong> You have the right to have your information rectified if that information is inaccurate or incomplete.</li>
            <li><strong>Right to Erasure:</strong> You have the right to have your Personal Data deleted under certain conditions.</li>
            <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information.</li>
            <li><strong>Right to Data Portability:</strong> You have the right to be provided with a copy of the information we have on you in a structured, machine-readable and commonly used format.</li>
            <li><strong>Right to Object:</strong> You have the right to object to our processing of your Personal Data.</li>
            <li><strong>Right to Withdraw Consent:</strong> You also have the right to withdraw your consent at any time where {projectName} relied on your consent to process your personal information.</li>
          </ul>
          Please contact us at {contactEmail} to make such requests. We may ask you to verify your identity before responding.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">7. Cookies</h2>
        <p className="mb-4">
          We may use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">8. Children's Privacy</h2>
        <p className="mb-4">
          Our Service does not address anyone under the age of 13 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">9. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at: {contactEmail}
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

export default PrivacyPage; 