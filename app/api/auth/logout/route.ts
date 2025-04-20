import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  // No need to await cookies() here, it returns the store directly in Route Handlers
  const cookieStore = cookies();

  try {
    // Clear the session cookie by deleting it
    cookieStore.delete('session');

    // Optionally, set it again with expiry in the past (belt and suspenders)
    cookieStore.set('session', '', {
      maxAge: 0, // Expire immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax'
    });

    return NextResponse.json({ success: true, message: 'Logged out successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Logout API Error:', error);
    return NextResponse.json({ success: false, message: 'Failed to logout.' }, { status: 500 });
  }
} 