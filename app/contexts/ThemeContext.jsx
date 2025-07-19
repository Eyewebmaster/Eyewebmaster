// app/contexts/ThemeContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to read initial theme from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      // If dark mode is preferred or saved, set isDarkMode to TRUE
      document.body.classList.add('theme-dark');
      setIsDarkMode(true); // <--- CORRECTED: Set to true
    } else {
      // Otherwise, set isDarkMode to FALSE
      document.body.classList.remove('theme-dark');
      setIsDarkMode(false); // <--- CORRECTED: Set to false
    }
  }, []);

  // Effect to update document.body class when isDarkMode changes
  // This is correct as it is, but the previous bug meant it was acting opposite
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
    }
    // This line ensures localStorage is updated every time isDarkMode changes,
    // which is good practice.
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Callback function to toggle the theme
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      // localStorage.setItem('theme', newMode ? 'dark' : 'light'); // This is already handled by the useEffect above
      return newMode;
    });
  }, []);

  const contextValue = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}