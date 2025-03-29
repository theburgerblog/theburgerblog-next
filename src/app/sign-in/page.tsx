import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignInForm from '@/components/auth/SignInForm';
import { isAuthenticatedOnServer } from '@/lib/supabase-server';

export const metadata = {
  title: 'Sign In | TheBurgerBlog',
  description: 'Sign in to your TheBurgerBlog account',
};

export default async function SignInPage() {
  // Redirect to admin if already authenticated
  const isAuthenticated = await isAuthenticatedOnServer();
  if (isAuthenticated) {
    redirect('/admin');
  }
  
  return (
    <div className="mx-auto max-w-md py-12">
      <SignInForm />
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-500">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="mt-3 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
} 