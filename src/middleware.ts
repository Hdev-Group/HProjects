// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware((req) => {
  return NextResponse.next();
});

// Configuring middleware to run for all routes or specific ones
export const config = {
  matcher: ['/((?!api/public|sign-in|sign-up).*)'], // Match all routes except public, sign-in, and sign-up
};
