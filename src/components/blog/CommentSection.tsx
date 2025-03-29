'use client';

import React, { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface CommentSectionProps {
  postSlug: string;
  initialComments: Comment[];
}

export default function CommentSection({ postSlug, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Check authentication status
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
    }
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        checkAuth();
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isSignedIn) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          postSlug,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const data = await response.json();
      setComments([data.comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>

      {isSignedIn ? (
        <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-foreground"
            >
              Leave a comment as {userName}
            </label>
            <div className="mt-1">
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="block w-full rounded-md border border-gray-200 bg-background p-2 text-foreground shadow-sm focus:border-primary focus:ring-primary"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-6 rounded-md bg-gray-100/50 p-4 text-sm">
          <p>
            Please{' '}
            <a href="/sign-in" className="text-blue-600 hover:underline">
              sign in
            </a>{' '}
            to leave a comment.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="rounded-md border border-gray-200 p-4">
              <div className="mb-2 flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-600/10 text-center leading-8">
                  {comment.user.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">
                    {comment.user.name || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <div className="prose prose-sm mt-2 text-foreground">
                <p>{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
} 