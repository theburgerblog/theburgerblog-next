import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Export a supabase client configured for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get user profile
export async function getUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Get user profile from profile table
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return {
    ...user,
    profile: data || {},
  };
}

// Helper functions for authentication
export const signIn = async ({ email, password }: { email: string; password: string }) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  // We don't need to manually create a profile record because the database has a trigger
  // that automatically creates a profile when a new user is created
  return supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: { name }
    }
  });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

// Check if user is authenticated
export async function isAuthenticated() {
  const { data: { session } } = await supabase.auth.getSession();
  return session !== null;
} 