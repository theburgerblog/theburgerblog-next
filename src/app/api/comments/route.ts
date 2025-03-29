import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { z } from 'zod';

// Schema for comment validation
const commentSchema = z.object({
  content: z.string().min(1).max(1000),
  postSlug: z.string().min(1),
});

interface UserProfile {
  id: string;
  name: string | null;
  avatar_url: string | null;
}

// GET handler to fetch comments for a post
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get('postSlug');

  if (!postSlug) {
    return NextResponse.json(
      { error: 'Post slug is required' },
      { status: 400 }
    );
  }

  const supabase = await createServerSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        user_id
      `)
      .eq('post_slug', postSlug)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Get user profiles in a separate query
    const userProfiles: Record<string, UserProfile> = {};
    if (data && data.length > 0) {
      const userIds = [...new Set(data.map(comment => comment.user_id))];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, avatar_url')
        .in('id', userIds);
        
      if (profiles) {
        profiles.forEach((profile: UserProfile) => {
          userProfiles[profile.id] = profile;
        });
      }
    }

    // Format comments to match the expected structure
    const formattedComments = data.map(comment => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.created_at,
      user: {
        name: comment.user_id && userProfiles[comment.user_id]?.name || 'Anonymous',
        image: comment.user_id && userProfiles[comment.user_id]?.avatar_url || null,
      },
    }));

    return NextResponse.json({ comments: formattedComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST handler to create a new comment
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // Validate comment data
    const validationResult = commentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid comment data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { content, postSlug } = validationResult.data;

    // Create the comment
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        content,
        post_slug: postSlug,
        user_id: session.user.id,
        created_at: new Date().toISOString(),
      })
      .select(`
        id,
        content,
        created_at,
        user_id
      `)
      .single();

    if (error) {
      throw error;
    }

    // Get user profile in a separate query
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, avatar_url')
      .eq('id', session.user.id)
      .single();

    // Format comment to match the expected structure
    const formattedComment = {
      id: comment.id,
      content: comment.content,
      createdAt: comment.created_at,
      user: {
        name: profile?.name || 'Anonymous',
        image: profile?.avatar_url || null,
      },
    };

    return NextResponse.json({ comment: formattedComment }, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
} 