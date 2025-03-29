import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import type { PostMeta } from '@/lib/mdx';

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  // Find header image if it exists
  const headerImage = post.images?.find(img => img.type === 'header');
  
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        {headerImage ? (
          <Image
            src={headerImage.url}
            alt={headerImage.alt || post.title}
            fill
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="h-full w-full bg-gray-100"></div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex gap-2">
          {post.categories?.slice(0, 2).map((category, idx) => (
            <span
              key={idx}
              className="inline-flex items-center rounded-full bg-blue-600/10 px-2.5 py-0.5 text-xs font-medium text-blue-600"
            >
              {category}
            </span>
          ))}
        </div>
        <h2 className="mb-2 text-xl font-semibold tracking-tight text-foreground">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="mb-4 flex-1 text-sm text-gray-500 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime?.text || '5 min read'}</span>
        </div>
      </div>
    </article>
  );
} 