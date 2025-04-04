'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/supabase';

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      console.log('Attempting sign up with:', { email, name, password: '****' });
      const result = await signUp({ email, password, name });
      console.log('Sign up result:', JSON.stringify(result, null, 2));
      
      if (result.error) {
        console.error('Sign up error details:', result.error);
        setError(`Error: ${result.error.message} (code: ${result.error.status || 'unknown'})`);
        return;
      }
      
      if (!result.data?.user) {
        setError('No user was created. Please try again.');
        return;
      }
      
      if (result.data?.user?.identities?.length === 0) {
        // User already exists
        setError('A user with this email already exists. Please sign in instead.');
        return;
      }

      // Success - email confirmation sent
      setMessage(`Account created for ${email}! ${result.data.user.email_confirmed_at ? 'You can now sign in.' : 'Check your email for the confirmation link.'}`);
      
      // After sign up, redirect to sign in
      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
      
    } catch (err: any) {
      console.error('Sign up exception details:', err);
      setError(`Sign up failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 p-8">
      <h2 className="mb-6 text-center text-2xl font-bold">Create Account</h2>
      
      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}
      
      {message && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-600">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-background p-2 text-foreground"
            required
          />
        </div>
        
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
            minLength={6}
          />
          <p className="mt-1 text-xs text-gray-500">
            Password must be at least 6 characters
          </p>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-600/90 disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
} 