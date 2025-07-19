"use client"; 
import React from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets';

import { serviceData } from '../../assets/assets'
import DarkModeToggle from '../contexts/DarkModeToggle'; // Assuming this path is correct
import { useTheme } from '../contexts/ThemeContext'; // <--- IMPORT THE USETHEME HOOK
import { motion } from 'motion/react';



const Header = () => {
    const {isDarkMode} = useTheme();
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-r'>
      <div>
        <motion.div initial={{scale: 0}} whileInView = {{scale: 1}} transition = {{duration: 0.8, type: 'string'}}>
        <Image src={assets.profile_img} alt='' className='rounded-full w-42' />
        </motion.div>
      </div>
        <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo ' >Hi We are App Developers <Image src={assets.hand_icon} alt='' className='w-15' /></h3>
        <h1 className='text:3xl sm:text-6xl lg:text-[66px] font-Ovo'>
            in Cebu</h1>
            <p className='max-w-2xl mx-auto font-Ovo'>
            "With years of experience in design and web application development, we combine expertise and creativity to help shape your future in today’s fast-moving digital world."
            </p>
            <div className='flex flex-col sm:flex-row item-center gap-4 mt-4'>
                <a href="#contact" className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 hover:bg-light-hover hover:-translate-y-1 duration-500 hover:shadow-2xs dark:border-white dark: hover:shadow-white dark: hover: bg-darkHover/50'>Contact Us  <Image src={isDarkMode ? assets.right_arrow_white : assets.right_arrow_bold} alt='' className='w-4' /> </a>
                <a href="#Work" className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 hover:bg-pink-200 hover:bg-light-hover hover:-translate-y-1 duration-500 hover:shadow-2xs dark:border-white dark: hover:shadow-white dark: hover: bg-darkHover/50'>Work <Image src={assets.download_icon } alt='' className='w-4' /></a>

            </div>
        
    </div>
  )
}

export default Header
