"use client"; 
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext'; 
import Image from 'next/image'
import { assets } from '../../../assets/assets';
import { motion } from 'motion/react';

const GraphicsAdsMarketing = () => {
    const { isDarkMode } = useTheme(); // Call the hook to get the value

    // Use isDarkMode to apply conditional styling
    const divBgClass = isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';

    return (
        <div id="GraphAdsMarketing" className='w-full px-[12%] py-10 scroll-mt-10'>
            <h4 className='text-center mb-2 text-lg font-Ovo mt-15'>Meet our professional team designer who are sharing their individual talents. </h4>
        <motion.div initial={{scale: .8}} whileInView = {{scale: 1}} transition = {{duration: 1, type: 'string'}}>
 
        <h2 className='text-center text-5xl font-Ovo'>Graphics and Ads Marketing</h2>
        <p className='pt-5 text-justify'>
            Our Web App Training Program is designed to equip aspiring developers, professionals, and teams with the skills needed to build powerful, scalable, and modern web applications. Whether you're starting from scratch or looking to enhance your current skills, this training provides a hands-on, project-based learning experience.
        </p>
        <div className='grid grid-cols-1  gap-6 my-10'>
             <div className='border border-gray-400 rounded-lg px-8 py-5 hover:shadow-black cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 dark: hover:bg-darkHover dark: hover: shadow-white'>
                 
                 <h3 id='#WebAppTraining' className='text-lg my-4 text-gray-700 dark:text-white' >Web App Development Training</h3>
                 <b>Build the Future, One Web App at a Time</b>
                 <p className='text-m text-gray-600 leading-5 dark:text-white/80'>
                 Learn how to design compelling visuals and create marketing campaigns that drive engagement, brand recognition, and sales. This training is tailored for aspiring graphic designers, social media managers, business owners, and marketers who want to master the art and science of visual marketing.

                 </p>
                 <b>Training Objectives</b>
                 <p>By the end of this training, participants will be able to:</p>
                 <ul className='pl-10.5 text-m list-disc '>
                    <li>Understand the principles of visual communication and brand identity.</li>
                    <li>Create high-converting ads for Facebook, Instagram, Google, and YouTube.</li>
                    <li>Design professional graphics using tools like Canva, Photoshop, and Illustrator.</li>
                    <li>Build consistent branding across social media platforms.</li>
                    <li>Develop ad strategies based on audience targeting and analytics.</li>
                    <li>Learn how to A/B test and optimize visual ads for better ROI.</li>
                 </ul>
                 <b>Who Should Join?</b>
                 <ul className='pl-10.5 text-m list-disc '>
                    <li>Small business owners and entrepreneurs</li>
                    <li>Freelance graphic designers and creatives</li>
                    <li>Marketing professionals and social media managers</li>
                    <li>Content creators and influencers</li>
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

export default GraphicsAdsMarketing;