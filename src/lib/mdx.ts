import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';

// Define types for our blog post metadata
export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  images: {
    url: string;
    alt: string;
    type: string;
  }[];
  ratings: Record<string, number>;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface Post extends PostMeta {
  content: string;
}

// Paths for our MDX content
const POSTS_PATH = path.join(process.cwd(), 'content/posts');

// Get list of all post slugs
export const getPostSlugs = (): string[] => {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ''));
};

// Read a post by slug
export const getPostBySlug = (slug: string): Post => {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    ...(data as PostMeta),
    content,
    slug,
    readingTime: readingTime(content),
  };
};

// Get all posts with optional sorting
export const getAllPosts = (sort: 'asc' | 'desc' = 'desc'): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));

  // Sort posts by date
  return posts.sort((post1, post2) => {
    const date1 = new Date(post1.date).getTime();
    const date2 = new Date(post2.date).getTime();
    return sort === 'asc' ? date1 - date2 : date2 - date1;
  });
};

// Serialize post content for rendering with MDX
export const serializePost = async (post: Post) => {
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
  });

  return {
    ...post,
    content: mdxSource,
  };
}; 