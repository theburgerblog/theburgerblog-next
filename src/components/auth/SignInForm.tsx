'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from '@/lib/supabase';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check for error in URL query params (from auth callback)
  useEffect(() => {
    const errorParam = searchParams?.get('error');
    if (errorParam) {
      setError(`Authentication error: ${decodeURIComponent(errorParam)}`);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('Attempting sign in with:', { email, password: '****' });
      const result = await signIn({ email, password });
      console.log('Sign in result:', JSON.stringify({
        error: result.error,
        session: result.data.session ? 'Session exists' : 'No session',
        user: result.data.user ? 'User exists' : 'No user'
      }, null, 2));
      
      if (result.error) {
        console.error('Sign in error details:', result.error);
        setError(`Error: ${result.error.message} (code: ${result.error.status || 'unknown'})`);
        return;
      }
      
      if (!result.data?.session) {
        setError('Authentication failed: No session was created');
        return;
      }
      
      // Redirect to admin page after successful login
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      console.error('Sign in exception details:', err);
      setError(`Sign in failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 p-8">
      <h2 className="mb-6 text-center text-2xl font-bold">Sign In</h2>
      
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-background p-2 text-foreground"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-background p-2 text-foreground"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-600/90 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
} 