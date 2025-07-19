// This is a Server Component by default (no "use client" directive)
// Server Components can directly use `await` for data fetching.

import { notFound } from 'next/navigation';
import Image from 'next/image';

export const dynamic = 'force-dynamic'; // Ensures fresh data every time (no cache)

// --- Fetch a post by slug ---
async function getPostBySlug(slug) {
  try {
    // MODIFIED: Changed API URL to use the local Node.js proxy server
    // This assumes your proxy (nodejs-api-proxy) is running on http://localhost:3000
    // and correctly forwards the `?slug=` query parameter to the external API.
    const res = await fetch(`https://api.eyewebmaster.com/api/posts/?slug=${slug}`, {
      cache: 'no-store', // Ensures fresh data
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch post from proxy: ${res.status} - ${errorText}`);
      // If the proxy returns a 404 or other error, trigger Next.js 404 page
      notFound();
    }

    const data = await res.json();
    const post = Array.isArray(data.results) && data.results.length > 0 ? data.results[0] : null;

    if (!post) {
      console.warn(`No post found for slug: ${slug} after fetching from proxy.`);
      // If the proxy returns data but no matching post, trigger Next.js 404 page
      notFound();
    }

    return post;
  } catch (err) {
    console.error('Error fetching post (network or proxy issue):', err);
    // Catch any network errors or issues with the proxy itself
    notFound();
  }
}

// --- Blog Post Page ---
export default async function BlogPostPage({ params }) {
  // MODIFIED: Await params directly as per the error message.
  // Although this is a Server Component, Next.js can sometimes treat `params` as a Promise
  // especially with `dynamic = 'force-dynamic'` or specific rendering paths.
  const awaitedParams = await params;
  const slug = awaitedParams.slug; 

  // Fetch the post data using the helper function
  const post = await getPostBySlug(slug);

  // The `notFound()` calls are handled within `getPostBySlug`

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
              {/* This handles cases where category might be a string or an object with a 'name' property */}
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
