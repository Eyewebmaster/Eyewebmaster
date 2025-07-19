// app/components/ClientLayoutWrapper.jsx
// This file should be here for global use!
"use client";

import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext'; // <--- Corrected path: now relative from app/components/ to app/contexts/
import Navbar from './Navbar'; // <--- Corrected path: Navbar is in the same 'components' folder
import Footer from './Footer'; // <--- Corrected path: Footer is in the same 'components' folder


export default function ClientLayoutWrapper({ children }) {
  return (
    <ThemeProvider>
      <Navbar />
      <main className="flex-grow"> {/* Added flex-grow to push footer down */} 
        {children} {/* This renders your actual page components (homepage, training page, etc.) */}
      </main>
      <Footer />
    </ThemeProvider>
  );
}