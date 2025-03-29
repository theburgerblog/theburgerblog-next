import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { getServerUser, isAuthenticatedOnServer } from '@/lib/supabase-server';

export const metadata = {
  title: 'Admin Dashboard | TheBurgerBlog',
  description: 'Admin dashboard for TheBurgerBlog',
};

export default async function AdminPage() {
  // Check if user is authenticated
  const isAuthenticated = await isAuthenticatedOnServer();
  
  // If not logged in, redirect to sign-in
  if (!isAuthenticated) {
    redirect('/sign-in');
  }
  
  const user = await getServerUser();
  const posts = getAllPosts();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-600/10 text-center leading-8">
            {user?.profile?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
          </div>
          <span className="text-sm font-medium">
            {user?.profile?.name || user?.email?.split('@')[0] || 'User'}
          </span>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-xl font-semibold">Content Overview</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md border border-gray-200 p-4 text-center">
            <h3 className="text-sm text-gray-500">Total Posts</h3>
            <p className="text-3xl font-bold">{posts.length}</p>
          </div>
          <div className="rounded-md border border-gray-200 p-4 text-center">
            <h3 className="text-sm text-gray-500">Categories</h3>
            <p className="text-3xl font-bold">
              {new Set(posts.flatMap(post => post.categories || [])).size}
            </p>
          </div>
          <div className="rounded-md border border-gray-200 p-4 text-center">
            <h3 className="text-sm text-gray-500">Tags</h3>
            <p className="text-3xl font-bold">
              {new Set(posts.flatMap(post => post.tags || [])).size}
            </p>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link 
            href="/blog" 
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Categories</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.slice(0, 5).map((post) => (
                <tr key={post.slug} className="border-b">
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {post.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {formatDate(post.date)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {post.categories?.slice(0, 2).map((category, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-600/10 px-2 py-0.5 text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 