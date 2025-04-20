import React from 'react'
import AuthForm from "@/components/AuthForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In – Talk2Job",
  description: "Sign in to your Talk2Job account to access AI-powered interview practice and feedback.",
};

const Page = () => {
    return <AuthForm type="sign-in"/>
}
export default Page
