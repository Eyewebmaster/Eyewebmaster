"use client"; 
import React from 'react';
import { assets, infoList, toolsData } from '../../assets/assets';
import Image from 'next/image';
import { useTheme } from '../contexts/ThemeContext'; 
import { motion } from 'motion/react';

const About = () => { 
  const { isDarkMode } = useTheme();
  return (
    <div id='About' className='w-full px-[12%] py-10 scroll-mt-20 '>
      <h4 className='text-center mb-2 text-lg font-Ovo text-gray-800 dark:text-white'>Introduction</h4>
      <h2 className='text-center text-5xl font-Ovo text-gray-800 dark:text-white'>About Us</h2>
    
    <div className='flex w-full flex-col lg:flex-row items-center'>
        <div className='w-90 sm:w-80 rounded-3xl max-w-none'>
        <motion.div initial={{scale: 1.5}} whileInView = {{scale: 1}} transition = {{duration: 0.8, type: 'string'}}>
            <Image src={assets.user_image} alt='User' className='w-full rounded-3xl p-2'/>
        </motion.div>
        </div>
        <div className='flex-1'>
            <p className='mb-10 max-w-2xl font-Ovo text-gray-800 dark:text-white'>"We are professional app developers with over a decade of experience. Our team has collaborated with numerous organizations, contributing to their growth and success through innovative web applications." </p>
            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                {infoList.map(({icon, iconDark, title, description}, index)=>(
                    <li className='border-[.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 hover:shadow-2xs dark:border-white dark:hover:shadow-white dark:hover:bg-dark-hover/50'  key={index}>
                        {/* isDarkMode is now correctly obtained from the hook */}
                        <Image src={isDarkMode ? iconDark : icon }  alt={title} className='w-7 mt-3'/>
                        <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                        {/* Corrected: Removed non-existent dark:text-shadow-white */}
                        <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
                    </li>

                ))}
            </ul>
            <h4 className='my-6 text-gray-700 font-Ovo dark:text-white'>Tools We Use</h4>
            <ul className='flex items-center gap-3 sm:gap-5'> {/* Corrected: item-center to items-center */}
               {toolsData.map((tool, index)=>(
                <li className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500' key={index} >
                    <Image src={tool} alt='Tool' className='w-5 sm:w-7' />
                </li>

               ))}
            </ul>
        </div>
    </div>
    
    </div>
  )
}

export default About;