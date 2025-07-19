"use client"; // This directive makes it a Client Component

import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { notFound } from 'next/navigation';
import Image from 'next/image';

// `dynamic = 'force-dynamic'` is typically for Server Components, removed for Client Component
// export const dynamic = 'force-dynamic'; 

// --- Helper to fetch post by slug ---
// This function itself can remain async, but its call needs to be in useEffect
async function getPostBySlug(slug) {
  try {
    // MODIFIED: Changed API URL to the correct external API endpoint
    const res = await fetch(`https://api.eyewebmaster.com/posts/?slug=${slug}`, { // <--- UPDATED URL HERE
      cache: 'no-store', // Ensures fresh data
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch post directly from API: ${res.status} - ${errorText}`);
      // In a client component, we don't call notFound() directly here.
      // Instead, we return an error state and let the component handle it.
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const data = await res.json();

    const post = Array.isArray(data.results)
      ? data.results.find(p => p.slug === slug)
      : null;

    if (!post) {
      console.warn(`No post found for slug: ${slug} after fetching from API or filtering.`);
      // Again, throw an error to be caught by the useEffect's catch block
      throw new Error(`Post not found for slug: ${slug}`);
    }

    return post;
  } catch (err) {
    console.error('Error in getPostBySlug:', err);
    throw err; // Re-throw to be caught by the useEffect
  }
}

// --- Blog Post Page (now a Client Component) ---
export default function BlogPostPage({ params }) {
  // State to manage post data, loading status, and errors
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true); // Ensure loading state is reset on re-fetch attempts
      setError(null);   // Clear previous errors

      try {
        // Await params to ensure it's resolved if it's a Promise
        const awaitedParams = await params; 
        const slug = awaitedParams.slug;

        // Crucial check to ensure slug is defined before fetching
        if (!slug) {
          console.warn("Slug is undefined, cannot fetch post. Triggering 404.");
          setLoading(false);
          notFound(); // Trigger Next.js 404 page if slug is missing
          return; // Stop execution if slug is undefined
        }

        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
      } catch (err) {
        setError(err);
        // If a specific post is not found, we can still use notFound()
        // but it must be called from a React context (e.g., directly in the component body
        // if the error is immediately known, or after a state update in useEffect).
        // For now, we'll just show an error message.
        if (err.message.includes("Post not found")) {
          notFound(); // This will trigger Next.js 404 page
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params]); // Depend on params to re-fetch if slug changes (e.g., via client-side navigation)

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300 text-xl">Loading post...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500 text-xl">Error loading post: {error.message}</p>
      </main>
    );
  }

  // If post is null after loading and no error, it means notFound() was called.
  // This check is mostly for clarity, as notFound() would have already interrupted rendering.
  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300 text-xl">Post not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20 pb-10 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl font-Ovo">
        {post.featured_image && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden shadow-md">
            <Image
              src={post.featured_image}
              alt={post.title || 'Featured Image'}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 700px"
              className="rounded-lg"
            />
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Published: {new Date(post.date_published).toLocaleDateString()}
          {post.category && (
            <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold dark:bg-blue-900 dark:text-blue-200">
              {typeof post.category === 'string' ? post.category : post.category.name}
            </span>
          )}
        </p>

        <div
          className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}
