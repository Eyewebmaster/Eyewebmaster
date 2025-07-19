"use client"; 
import Image from 'next/image';
import React from 'react';
import { assets } from '../../assets/assets';
import DarkModeToggle from '../contexts/DarkModeToggle'; 
import { useTheme } from '../contexts/ThemeContext'; 

const Footer = () => {
  return (
    <div className='mt-20'>
      <div className='text-center'>
        <Image src={assets.logo} alt='' className="w-36 m-auto" />
        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={assets.mail_icon} alt='' className='w-6' />
            eyewebmaster@gmail.com

        </div>
      </div>
      <div className='text-center sm:flex items-center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
        <p className='items-center'>&copy; 2025. All Rights Reserve</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a target="_blank" href="#">Github</a></li>
            <li><a target="_blank" href="https://www.linkedin.com/company/eyewebmaster">Linkedin</a></li>
            <li><a target="_blank" href="https://fb.com/eyewebmaster">Facebook</a></li>
            

        </ul>
      </div>
    </div>
  )
}

export default Footer
