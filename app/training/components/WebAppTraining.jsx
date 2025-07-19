"use client"; 
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; 
import Image from 'next/image'
import { assets } from '../../../assets/assets';
import { motion } from 'motion/react';

const Training_Content = () => {
    const { isDarkMode } = useTheme(); // Call the hook to get the value

    // Use isDarkMode to apply conditional styling
    const divBgClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';

    return (
        <div id="WebAppTraining" className='w-full px-[12%] py-10 scroll-mt-10'>
        <h4 className='text-center mb-2 text-lg font-Ovo mt-15'>Our professional team are sharing their individual talents. </h4>
 
        <motion.div initial={{scale: .8}} whileInView = {{scale: 1}} transition = {{duration: 1, type: 'string'}}>
 
        <h2 className='text-center text-5xl font-Ovo'>Web App Trainings</h2>
        <p className='pt-5 text-justify'>
            Our Web App Training Program is designed to equip aspiring developers, professionals, and teams with the skills needed to build powerful, scalable, and modern web applications. Whether you're starting from scratch or looking to enhance your current skills, this training provides a hands-on, project-based learning experience.
        </p>
        <div className='grid grid-cols-1  gap-6 my-10'>
             <div className='border border-gray-400 rounded-lg px-8 py-5 hover:shadow-black cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 dark: hover:bg-darkHover dark: hover: shadow-white'>
                 
                 <h3 id='#WebAppTraining' className='text-lg my-4 text-gray-700 dark:text-white' >Web App Development Training</h3>
                 <b>Build the Future, One Web App at a Time</b>
                 <p className='text-m text-gray-600 leading-5 dark:text-white/80'>
                 Our Web App Training Program is designed to equip aspiring developers, professionals, and teams with the skills needed to build powerful, scalable, and modern web applications. Whether you're starting from scratch or looking to enhance your current skills, this training provides a hands-on, project-based learning experience.
                 </p>
                 <b>Training Objectives</b>
                 <p>By the end of this training, participants will be able to:</p>
                 <ul className='pl-10.5 text-m list-disc '>
                    <li>Understand the core principles of web application architecture.</li>
                    <li>Build full-stack web applications using modern tools and frameworks.</li>
                    <li>Master front-end technologies (HTML5, CSS3, JavaScript, React or Vue).</li>
                    <li>Develop and integrate RESTful APIs using Django or Node.js.</li>
                    <li>Manage databases with PostgreSQL or MongoDB.</li>
                    <li>Deploy web apps to cloud platforms (Vercel, Heroku, DigitalOcean, etc.).</li>
                    <li>Implement version control and team collaboration via Git and GitHub.</li>
                    <li>Follow best practices in security, performance, and scalability.</li>

                 </ul>
                 <a href='#' className='flex items-center gap-2 text-sm mt-5'>
                     Join Now <Image src={assets.right_arrow} className='w-4' alt=''/> 
                 </a>
                 
             </div>
         
         
        </div>
        </motion.div>
     </div>
    );
  }

export default Training_Content;