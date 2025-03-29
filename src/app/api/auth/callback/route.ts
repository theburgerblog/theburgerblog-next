import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { searchParams } = requestUrl;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const error_description = searchParams.get('error_description');

  // If there was an error, log it and redirect to sign-in with an error message
  if (error) {
    console.error('Auth callback error:', error, error_description);
    return NextResponse.redirect(
      new URL(`/sign-in?error=${encodeURIComponent(error_description || error)}`, requestUrl)
    );
  }

  try {
    if (code) {
      // Use the code to exchange for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Auth code exchange error:', error);
        return NextResponse.redirect(
          new URL(`/sign-in?error=${encodeURIComponent(error.message)}`, requestUrl)
        );
      }

      if (data.session) {
        console.log('Authentication successful, session created');
      }
    }
  } catch (err) {
    console.error('Unexpected auth callback error:', err);
    return NextResponse.redirect(
      new URL('/sign-in?error=Unexpected+authentication+error', requestUrl)
    );
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/sign-in', requestUrl));
} 