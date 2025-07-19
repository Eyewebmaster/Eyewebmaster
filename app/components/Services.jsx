"use client"; 
import React from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets';

import { serviceData } from '../../assets/assets'
import DarkModeToggle from '../contexts/DarkModeToggle'; // Assuming this path is correct
import { useTheme } from '../contexts/ThemeContext'; // <--- IMPORT THE USETHEME HOOK
import { motion } from 'motion/react';

const Services = () => {
    const {isDarkMode} = useTheme();
  return (
    <div id="Services" className='w-full px-[12%] py-10 scroll-mt-20 '>
       <h4 className='text-center mb-2 text-lg font-Ovo'>What we Offer</h4>

       <motion.div initial={{scale: 0}} whileInView = {{scale: 1}} transition = {{duration: 0.8, type: 'string'}}>

       <h2 className='text-center text-5xl font-Ovo'>Our Services</h2>
       <p>
        Our professional services we provide
       </p>
       <div className='grid grid-cols-auto gap-6 my-10'>
        {serviceData.map(({icon, title, description, link}, index)=>(
            <div key={index}
            className='border border-gray-400 rounded-lg px-8 py-5 hover:shadow-black cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 dark: hover:bg-darkHover dark: hover: shadow-white'>
                <Image src={icon} alt='' className='w-10'/>
                <h3 className='text-lg my-4 text-gray-700 dark:text-white'>{title}</h3>
                <p className='text-sm text-gray-600 leading-5 dark:text-white/80'>
                    {description}
                </p>
                <a href={link} className='flex items-center gap-2 text-sm mt-5'>
                    Readmore <Image src={assets.right_arrow} className='w-4' alt=''/> 
                </a>
            </div>
        )) }
        
       </div>
       </motion.div>
    </div>
  )
}

export default Services
