"use client";

import Image from 'next/image';
import { useTheme } from './ThemeContext'; // <--- Import useTheme hook
import { assets } from '../../assets/assets';
export default function DarkModeToggle() {
  // Consume the state and function from the context hook
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} id='moon' className='flex items-center gap-0'>
      <Image
        src={isDarkMode ? assets.sun_icon : assets.moon_icon}
        alt={isDarkMode ? 'Sun icon for light mode' : 'Moon icon for dark mode'}
        className='w-6'
      />
    </button>
  );
}