import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to handle Supabase authentication
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a Supabase client for the middleware
  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh session if expired - required for Supabase auth
  await supabase.auth.getSession();
  
  return res;
}

export const config = {
  matcher: [
    // Match all paths except for:
    // - API routes that don't require auth
    // - Static files such as favicon, images, etc
    // - Next.js internals
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 