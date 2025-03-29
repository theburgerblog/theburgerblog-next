import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import RatingCard from '@/components/blog/RatingCard';
import CommentSection from '@/components/blog/CommentSection';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import MDXComponents from '@/components/blog/MDXComponents';

interface PageParams {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageParams) {
  try {
    const post = getPostBySlug(params.slug);
    
    return {
      title: `${post.title} | TheBurgerBlog`,
      description: post.excerpt || `Review of ${post.title}`,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        url: `https://theburgerblog.at/blog/${post.slug}`,
        images: post.images?.length
          ? [{ url: post.images[0].url, alt: post.images[0].alt }]
          : [],
      },
    };
  } catch (_error) {
    return {
      title: 'Post Not Found | TheBurgerBlog',
      description: 'The requested post could not be found.',
    };
  }
}

export default async function PostPage({ params }: PageParams) {
  let post;
  
  try {
    post = getPostBySlug(params.slug);
  } catch (_error) {
    notFound();
  }
  
  // Find header image
  const headerImage = post.images?.find(img => img.type === 'header');
  
  // Get gallery images
  const galleryImages = post.images?.filter(img => img.type === 'gallery') || [];
  
  // Get comments from Supabase
  let comments = [];
  
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        profiles (
          name,
          avatar_url
        )
      `)
      .eq('post_slug', params.slug)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Format comments
    comments = data.map(comment => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.created_at,
      user: {
        name: comment.profiles?.name || 'Anonymous',
        image: comment.profiles?.avatar_url || null,
      },
    }));
  } catch (commentError) {
    console.error('Error fetching comments:', commentError);
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/blog" className="mb-8 flex items-center text-sm text-gray-500 hover:text-foreground">
        ← Back to all posts
      </Link>
      
      <div className="mb-8">
        <div className="mb-4 flex gap-2">
          {post.categories?.map((category, idx) => (
            <span
              key={idx}
              className="rounded-full bg-blue-600/10 px-2.5 py-0.5 text-xs font-medium text-blue-600"
            >
              {category}
            </span>
          ))}
        </div>
        
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        
        <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime?.text || '5 min read'}</span>
        </div>
      </div>
      
      {headerImage && (
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-lg sm:h-96">
          <Image
            src={headerImage.url}
            alt={headerImage.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      <div className="blog-content">
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>
      
      {galleryImages.length > 0 && (
        <div className="my-8">
          <h2 className="mb-4 text-2xl font-bold">Gallery</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative h-48 overflow-hidden rounded-lg">
                <Image
                  src={image.url}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {post.ratings && Object.keys(post.ratings).length > 0 && (
        <div className="my-8">
          <RatingCard ratings={post.ratings} />
        </div>
      )}
      
      <div className="my-8 border-t border-gray-200 pt-8">
        <CommentSection postSlug={post.slug} initialComments={comments} />
      </div>
    </article>
  );
} 