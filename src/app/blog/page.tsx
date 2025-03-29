import { getAllPosts } from '@/lib/mdx';
import PostCard from '@/components/blog/PostCard';

export const metadata = {
  title: 'Blog | TheBurgerBlog',
  description: 'All burger reviews and posts from TheBurgerBlog.',
};

export default function BlogPage() {
  // In a production app, this would be fetched at build time
  const allPosts = getAllPosts();
  
  return (
    <div className="space-y-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Burger Reviews
        </h1>
        <p className="text-xl text-gray-500">
          Our latest burger discoveries and reviews.
        </p>
      </div>
      
      {allPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-lg text-gray-500">No posts found.</p>
          <p className="mt-2">Check back soon for burger reviews!</p>
        </div>
      )}
    </div>
  );
} 