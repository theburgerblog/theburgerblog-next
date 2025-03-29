'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import SignOutButton from '@/components/auth/SignOutButton';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(session !== null);
      
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single();
          
        setUserName(data?.name || session.user.email?.split('@')[0] || null);
      }
      
      setLoading(false);
    }
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        checkAuth();
        router.refresh();
      } else if (event === 'SIGNED_OUT') {
        setIsSignedIn(false);
        setUserName(null);
        router.refresh();
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">TheBurgerBlog</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-md font-medium transition-colors hover:text-foreground/80 ${
                  pathname === item.path ? 'text-foreground' : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!loading && (
              isSignedIn ? (
                <>
                  <Link 
                    href="/admin" 
                    className="text-md font-medium transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    Admin
                  </Link>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-600/10 text-center leading-8">
                      {userName?.[0]?.toUpperCase() || '?'}
                    </div>
                    <SignOutButton />
                  </div>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-600/90"
                >
                  Sign In
                </Link>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
} 