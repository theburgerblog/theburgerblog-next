import Link from 'next/link';
import { redirect } from 'next/navigation';
import SignUpForm from '@/components/auth/SignUpForm';
import { isAuthenticatedOnServer } from '@/lib/supabase-server';

export const metadata = {
  title: 'Sign Up | TheBurgerBlog',
  description: 'Create an account for TheBurgerBlog',
};

export default async function SignUpPage() {
  // Redirect to admin if already authenticated
  const isAuthenticated = await isAuthenticatedOnServer();
  if (isAuthenticated) {
    redirect('/admin');
  }
  
  return (
    <div className="mx-auto max-w-md py-12">
      <SignUpForm />
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-500">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign in
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