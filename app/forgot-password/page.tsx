"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(`Password reset email sent to ${email}. Please check your inbox (and spam folder).`);
    } catch (error: any) {
      console.error("Password Reset Error:", error);
      let message = "Failed to send reset email. Please try again.";
      if (error.code === 'auth/invalid-email') {
        message = "Please enter a valid email address.";
      } else if (error.code === 'auth/user-not-found') {
        message = "If an account exists for this email, a reset link has been sent."; 
        toast.success(message);
        setIsSubmitting(false);
        return;
      }
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-xl border border-border">
        <h1 className="text-2xl font-semibold text-center text-foreground">Reset Your Password</h1>
        <p className="text-center text-muted-foreground text-sm">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="h-11"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-11" 
            disabled={isSubmitting}
            size="lg"
           > 
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        <div className="text-center mt-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="mr-1 size-4"/> Back to Sign In
              </Link>
            </Button>
          </div>
      </div>
    </div>
  );
} 