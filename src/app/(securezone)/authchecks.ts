import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { userId } = getAuth(req);

  const url = req.nextUrl.clone();
  
  if (!userId) {
    url.pathname = '/sign-in'; // Redirect to sign-in if not authenticated
    return NextResponse.redirect(url);
  }
  

  return NextResponse.next(); // Proceed if authenticated
}

export const config = {
  matcher: ['/securezone/:path*', '/another-secure-area/:path*'], // Protect these routes
};