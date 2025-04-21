"use client";

import { auth, googleProvider } from "@/firebase/client";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // optional if you want toast feedback
import { signIn, signUp } from "@/lib/actions/auth.action"; // Import auth actions

interface Props {
  mode: "login" | "signup";
  disabled?: boolean;
}

export default function GoogleAuthButton({ mode, disabled }: Props) {
  const router = useRouter();

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const idToken = await user.getIdToken();

      console.log(`${mode === "signup" ? "Signed up" : "Logged in"} with Google:`, user.displayName);
      toast.info("Processing authentication...");

      let serverAuthResult;
      if (mode === 'signup') {
        // Call signUp to create user record in DB if needed
        serverAuthResult = await signUp({
          uid: user.uid,
          email: user.email!,
          name: user.displayName || user.email!, // Use display name or fallback to email
          // Password isn't needed/stored for Google Auth in our DB record
        } as SignUpParams);
        // If signUp succeeds (or user already exists), proceed to set session via signIn
        if(serverAuthResult?.success || serverAuthResult?.message?.includes('User already exists')) {
           console.log('User record verified/created, setting session...');
           serverAuthResult = await signIn({
            email: user.email!,
            idToken: idToken,
          });
        } 
      } else {
        // If logging in, just call signIn to verify and set session
        serverAuthResult = await signIn({
          email: user.email!,
          idToken: idToken,
        });
      }

      // Check final auth result (should be from signIn call)
      if (!serverAuthResult?.success) {
        await auth.signOut();
        toast.error(serverAuthResult?.message || "Server authentication failed.");
        return; 
      }

      toast.success(`${mode === "signup" ? "Signed up" : "Logged in"} successfully as ${user.displayName}`);
      router.push("/dashboard");
      router.refresh();

    } catch (error: any) {
      console.error("Google Auth Error:", error);
      let errorMessage = "Google authentication failed.";
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Authentication cancelled.";
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        errorMessage = "An account already exists with this email using a different sign-in method.";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Button onClick={handleGoogleAuth} variant="outline" className="flex items-center gap-2 w-full border-border hover:bg-muted/50 cursor-pointer" disabled={disabled}>
      {/* Ensure you have google-icon.svg in your public folder */}
      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
      Continue with Google {mode === "signup" ? "" : ""} {/* Text adjusted slightly */}
    </Button>
  );
} 