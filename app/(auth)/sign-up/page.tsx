import AuthForm from "@/components/AuthForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign Up – Talk2Job",
  description: "Create a new account with Talk2Job to start practicing job interviews with AI.",
};

const Page = () => {
    return <AuthForm type="sign-up"/>
}
export default Page
