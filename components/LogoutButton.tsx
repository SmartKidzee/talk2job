'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. Sign out from Firebase client-side
      await signOut(auth);
      toast.info('Signing out...'); // Give feedback

      // 2. Call the API route to clear the server-side session cookie
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to clear session.');
      }

      toast.success('Logged out successfully');
      
      // 3. Redirect to sign-in page
      // Use window.location.replace for a full page refresh after logout if needed,
      // otherwise router.push is usually fine.
      router.push('/sign-in');
      router.refresh(); // Force refresh to ensure layout updates based on auth state

    } catch (error: any) {
      console.error("Logout Error:", error);
      toast.error(error.message || 'Failed to log out. Please try again.');
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="text-muted-foreground hover:text-primary"
    >
      <LogOut className="mr-2 size-4" /> Logout
    </Button>
  );
};

export default LogoutButton; 