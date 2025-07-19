// app/components/CategorySidebar.jsx
"use client"; // This is a Client Component as it uses useState and useEffect

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../contexts/ThemeContext'; // For dark mode
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'; // Example icons (install @heroicons/react)

export default function CategorySidebar() {
  const { isDarkMode } = useTheme();
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({}); // State to manage accordion

  useEffect(() => {
    async function fetchData() {
      try {
        // Function to fetch categories (client-side)
        // This still fetches from the external API as no proxy was requested for it.
        async function getCategories() {
            try { // Added try-catch for getCategories as well for consistency
                const res = await fetch("https://api.eyewebmaster.com/api/categories/");
                if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
                const data = await res.json();
                // Extract 'results' and map 'name' to 'title' for consistency
                return Array.isArray(data.results)
                    ? data.results.map(cat => ({
                        id: cat.id,
                        title: cat.name, // Map 'name' from API to 'title'
                        slug: cat.slug,
                        description: cat.description
                    }))
                    : [];
            } catch (error) {
                console.error("Error fetching categories:", error);
                return []; // Ensure an empty array is returned on error
            }
        }

        // Function to fetch posts (client-side)
        // MODIFIED: Now fetching from your local Node.js API proxy server with enhanced error handling
        async function getPosts() {
            try {
                const res = await fetch("https://api.eyewebmaster.com/api/posts/"); // <--- Changed URL to use the proxy
                if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
                const data = await res.json();
                // Extract the 'results' array from the API response
                return Array.isArray(data.results) ? data.results : [];
            } catch (error) {
                console.error("Error fetching posts for sidebar:", error); // Specific message for sidebar
                return []; // Ensure an empty array is returned on error
            }
        }

        // Fetch Categories and Posts concurrently
        const [categoriesData, postsData] = await Promise.all([
          getCategories(),
          getPosts()
        ]);
        
        setCategories(categoriesData);
        setPosts(postsData);

      } catch (err) {
        console.error("Error in fetchData (overall sidebar data):", err); // Catch any errors from Promise.all
        setError("Failed to load sidebar content.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const sidebarClasses = `w-full md:w-64 lg:w-72 p-6 flex-shrink-0 transition-colors duration-300
                          ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}
                          border-r shadow-lg md:sticky md:top-20 md:self-start md:h-[calc(100vh-80px)] overflow-y-auto`;
  
  const categoryHeaderClasses = `flex items-center justify-between w-full py-3 px-2 rounded-md cursor-pointer transition-colors
                                 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} font-semibold`;
  
  const postLinkClasses = `block py-2 px-4 rounded-md transition-colors text-sm
                           ${isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`;

  if (loading) {
    return (
      <div className={sidebarClasses}>
        <p>Loading categories and posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={sidebarClasses}>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <aside className={sidebarClasses}>
      <h2 className="text-2xl font-bold mb-4 font-Ovo">Categories</h2>
      <nav>
        <ul className="space-y-2">
          {Array.isArray(categories) && categories.map (category => (
            <li key={category.id} className="border-b last:border-b-0 border-gray-300 dark:border-gray-600 pb-2">
              <div
                className={categoryHeaderClasses}
                onClick={() => toggleCategory(category.id)}
              >
                <span>{category.title}</span> {/* Now using 'title' which maps from 'name' */}
                {expandedCategories[category.id] ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </div>
              {expandedCategories[category.id] && (
                <ul className="pl-4 pt-2 space-y-1">
                  {/* Filter posts by comparing post.category (string) with category.title (string) */}
                  {posts
                    .filter(post => post.category === category.title)
                    .map(post => (
                      <li key={post.id}>
                        <Link href={`/blog/${post.slug}`} className={postLinkClasses}>
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  {posts.filter(post => post.category === category.title).length === 0 && (
                    <li className="text-sm text-gray-500 dark:text-gray-400 py-2 px-4">No posts in this category.</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
