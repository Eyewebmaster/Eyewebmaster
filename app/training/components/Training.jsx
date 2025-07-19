"use client"; 
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; 
import { trainingData } from '../../../assets/assets';
import Image from 'next/image'
import { assets } from '../../../assets/assets';
import { motion } from 'motion/react';

const Training = () => {
    const { isDarkMode } = useTheme(); // Call the hook to get the value

    // Use isDarkMode to apply conditional styling
    const divBgClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';

    return (
        <div id="Training" className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-Ovo mt-15'>Our professional team are sharing their individual talents. </h4>
 
        <motion.div initial={{scale: .8}} whileInView = {{scale: 1}} transition = {{duration: 1, type: 'string'}}>
 
        <h2 className='text-center text-5xl font-Ovo'>Our Trainings</h2>
        <p className='pt-5 text-justify'>
         Events and trainings are the start of creativity and growth. With our staff and specialist they can show you the best version to take when dealing with technology and securities. 
        </p>
        <div className='grid grid-cols-4  gap-6 my-10'>
         {trainingData.map(({icon, title, description, link}, index)=>(
             <div key={index}
             className='border border-gray-400 rounded-lg px-8 py-5 hover:shadow-black cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 dark: hover:bg-darkHover dark: hover: shadow-white'>
                 <Image src={icon} alt='' className='w-10'/>
                 <h3 className='text-lg my-4 text-gray-700 dark:text-white' >{title}</h3>
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
    );
  }

export default Training;