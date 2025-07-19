// components/Navbar.jsx
"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react'; // Removed useRef as we'll use state for menu visibility
import Link from 'next/link';
import { assets } from '../../assets/assets';
import DarkModeToggle from '../contexts/DarkModeToggle';
import { useTheme } from '../contexts/ThemeContext';
import BlogMegaMenu from './BlogMegaMenu';

const Navbar = () => {
    const [isScroll, setIsScroll] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu
    const { isDarkMode } = useTheme();

    // Simplify open/close functions
    const openMenu = () => {
        setIsMenuOpen(true);
    };
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 45) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Effect to close menu if screen size changes from mobile to desktop
    // This handles cases where user resizes browser without closing menu
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMenuOpen) { // md breakpoint
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]); // Re-run effect if menu state changes

    const navItemClasses = `font-Ovo text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2 px-3 rounded-md`;

    return (
        <>
            {/* Background image conditional on dark mode */}
            <div className='fixed top-0 right-0 w-12/12 -z-10 translate-y-[-20%]'>
                {!isDarkMode && <Image src={assets.header_bg_color} alt='Background Light' className='w-full' />}
            </div>

            <nav className={`w-full fixed px-5 lg:px-4 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm dark:bg-gray-800" : ""}`} >
                <Link href="/">
                    <Image src={assets.logo} alt="Eyewebmaster" className='w-55 cursor-pointer mr-6 ' />
                </Link>

                {/* Desktop Menu */}
                <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 dark:bg-gray-800"}`} >
                    <li><Link className={navItemClasses} href="/#About">About</Link></li>
                    <li><Link className={navItemClasses} href="/#Services">Services</Link></li>
                    <li><Link className={navItemClasses} href="/#Work">Work</Link></li>
                    <li><Link className={navItemClasses} href="/training">Training</Link></li>
                    <BlogMegaMenu />
                </ul>

                <div className='flex items-center gap-0'>
                    <DarkModeToggle />
                   
                    {/* Contact Button (visible on large screens) */}
                    <Link href="/#contact" className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo text-gray-800 dark:border-white dark:text-white '>
                        Contact
                        <Image
                            src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
                            alt="Arrow icon"
                            className='w-3'
                        />
                    </Link>

                    {/* Mobile Menu Button (visible on md and smaller screens) */}
                    <button className='block md:hidden ml-3' onClick={openMenu}>
                        <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='Menu icon' className='w-6' />
                    </button>
                </div>

                {/* Mobile Menu (now controlled by isMenuOpen state) */}
                <ul className={`
                    flex flex-col gap-4 py-20 px-10
                    fixed top-0 bottom-0 w-64 z-50 h-screen
                    bg-rose-50 transition duration-500 ease-in-out
                    dark:bg-gray-800
                    md:hidden ${isMenuOpen ? 'translate-x-0 right-0' : 'translate-x-full right-0'}
                `}>
                    <div className='absolute right-16 top-6' onClick={closeMenu} >
                        <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='Close menu icon' />
                    </div>

                    <li><Link className='font-Ovo text-gray-800 dark:text-white' onClick={closeMenu} href="/">Home</Link></li>
                    <li><Link className='font-Ovo text-gray-800 dark:text-white' onClick={closeMenu} href="/#About">About</Link></li>
                    <li><Link className='font-Ovo text-gray-800 dark:text-white' onClick={closeMenu} href="/#Services">Service</Link></li>
                    <li><Link className='font-Ovo text-gray-800 dark:text-white' onClick={closeMenu} href="/training">Training</Link></li>
                    <li><Link className='font-Ovo text-gray-800 dark:text-white' onClick={closeMenu} href="/blog">Blog</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;