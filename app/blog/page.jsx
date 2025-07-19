// app/blog/page.jsx (for example)
import Link from 'next/link';

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export default async function BlogList() {
  const res = await fetch('https://api.eyewebmaster.com/api/posts/', {
    next: { revalidate: 60 },
  });
  const posts = await res.json();

  return (
    <div className="prose mx-auto">
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${slugify(post.title)}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
