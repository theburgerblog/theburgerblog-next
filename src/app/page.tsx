import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import PostCard from '@/components/blog/PostCard';

export default function Home() {
  // In production, this would use getStaticProps
  // For simplicity in this example, we'll use direct imports
  // This makes the page non-static, but it's fine for our prototype
  const posts = getAllPosts().slice(0, 6);
  
  return (
    <div className="space-y-12">
      <section className="flex flex-col items-center text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          The Burger Blog
        </h1>
        <p className="mb-6 max-w-2xl text-xl text-gray-500">
          Exploring the best burger spots in Vienna and beyond. Join us on our quest to find the perfect burger.
        </p>
        <div className="flex gap-4">
          <Link
            href="/blog"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-600/90"
          >
            View All Posts
          </Link>
          <Link
            href="/about"
            className="rounded-md border border-gray-200 px-4 py-2 hover:bg-gray-100"
          >
            About Us
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Latest Reviews</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length > 0 && (
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="rounded-md border border-gray-200 px-4 py-2 hover:bg-gray-100"
            >
              View All Reviews
            </Link>
          </div>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-gray-100/10 p-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="md:w-1/2">
            <h2 className="mb-4 text-2xl font-bold">About The Burger Blog</h2>
            <p className="mb-4 text-gray-500">
              The Burger Blog was founded with a simple mission: to find and share the best burger experiences in Vienna and beyond. 
              We rate each burger on taste, consistency, price, satiation, and appearance to help you find your perfect burger.
            </p>
            <Link
              href="/about"
              className="text-blue-600 hover:underline"
            >
              Learn more about us →
            </Link>
          </div>
          <div className="flex-shrink-0 md:w-1/2">
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src="/images/posts/kenks_header.jpeg"
                alt="A delicious burger"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
