"use client"; // This must be a Client Component

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

// Function to fetch categories (client-side)
async function getCategories() {
    try {
        const res = await fetch("https://api.eyewebmaster.com/api/categories/");
        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
        const data = await res.json();
        // Extract 'results' and map 'name' to 'title' for consistency with frontend
        const formattedCategories = Array.isArray(data.results)
            ? data.results.map(cat => ({
                id: cat.id,
                title: cat.name, // Map 'name' from API to 'title' for consistency
                slug: cat.slug,
                description: cat.description // Include other properties if needed
            }))
            : [];
        return formattedCategories;
    } catch (error) {
        console.error("Error fetching categories for mega menu:", error);
        return []; // Ensure an empty array is returned on error
    }
}

// Function to fetch posts (client-side)
async function getPosts() {
    try {
        const res = await fetch("https://api.eyewebmaster.com/api/posts/");
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
        const data = await res.json();
        // Extract the 'results' array from the API response
        return Array.isArray(data.results) ? data.results : [];
    } catch (error) {
        console.error("Error fetching posts for mega menu:", error);
        return []; // Ensure an empty array is returned on error
    }
}

export default function BlogMegaMenu() {
    const { isDarkMode } = useTheme();
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loadingMegaMenu, setLoadingMegaMenu] = useState(true);
    const [errorMegaMenu, setErrorMegaMenu] = useState(null);
    const megaMenuRef = useRef(null);

    useEffect(() => {
        async function fetchMegaMenuData() {
            setLoadingMegaMenu(true);
            try {
                const [categoriesData, postsData] = await Promise.all([
                    getCategories(),
                    getPosts()
                ]);
                setCategories(categoriesData);
                setPosts(postsData);
            } catch (err) {
                setErrorMegaMenu("Failed to load mega menu data.");
            } finally {
                setLoadingMegaMenu(false);
            }
        }
        fetchMegaMenuData();

        // Close mega menu on outside click
        const handleClickOutside = (event) => {
            if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
                setIsMegaMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Create a map for quick lookup of category objects by their 'name' (from post.category string)
    // This handles the case where post.category is a string like "Server" instead of an object.
    const categoryNameMap = categories.reduce((map, category) => {
        map[category.title] = category; // Using category.title because we mapped 'name' to 'title'
        return map;
    }, {});

    // Group posts by category for easier rendering in mega menu
    // Now reliably using the 'posts' array.
    const postsByCategory = posts.reduce((acc, post) => {
        // Find the full category object using the post.category string name
        const categoryObject = categoryNameMap[post.category];
        
        if (categoryObject && categoryObject.id) { // Ensure a valid category object is found
            if (!acc[categoryObject.id]) {
                acc[categoryObject.id] = {
                    title: categoryObject.title,
                    slug: categoryObject.slug,
                    posts: []
                };
            }
            acc[categoryObject.id].posts.push(post);
        }
        return acc;
    }, {});

    const megaMenuTriggerClasses = `font-Ovo text-lg py-3 px-5 rounded-md
                                    ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}
                                    flex items-center gap-2 cursor-pointer transition-colors`;
    
    const megaMenuDropdownClasses = `absolute top-full left-0 right-0 py-8 px-[8%] transition-all duration-300 transform origin-top
                                     ${isDarkMode ? 'bg-gray-800 text-white shadow-lg border-t border-gray-700' : 'bg-white text-gray-800 shadow-xl border-t border-gray-200'}
                                     ${isMegaMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'} z-30`; // Lower z-index than main Navbar

    return (
        <div 
            className="fix w-full border-b border-gray-200 dark:border-gray-700" 
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
            ref={megaMenuRef}
        >
            <div className={`container mx-auto flex items-center justify-center`}>
                <span className={megaMenuTriggerClasses}>
                    Blog
                    {isMegaMenuOpen ? (
                        <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                    )}
                </span>
            </div>

            <div className={megaMenuDropdownClasses}>
                {loadingMegaMenu ? (
                    <p className="text-center">Loading categories...</p>
                ) : errorMegaMenu ? (
                    <p className="text-center text-red-500">{errorMegaMenu}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map(category => (
                            <div key={category.id} className="p-2">
                                <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                    {/* Use category.slug for the link */}
                                    <Link href={`/blog?category=${category.slug}`} className="hover:underline">
                                        {category.title}
                                    </Link>
                                </h3>
                                <ul className="space-y-1">
                                    {postsByCategory[category.id] && postsByCategory[category.id].posts.length > 0 ? (
                                        postsByCategory[category.id].posts.slice(0, 3).map(post => ( // Show top 3 posts
                                            <li key={post.id}>
                                                <Link href={`/blog/${post.slug}`} className={`block text-sm py-1 ${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-500'}`}>
                                                    - {post.title}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-sm text-gray-500 dark:text-gray-400">No posts.</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
