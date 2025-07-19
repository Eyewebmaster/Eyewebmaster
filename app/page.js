// app/page.jsx
"use client"; // Keep this, as it renders other client components and might have client-side JS

import Image from "next/image";
import Header from "./components/Header";
// import Navbar from "./components/Navbar"; // Navbar is now rendered in ClientLayoutWrapper
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// REMOVE THESE:
// import { useState, useEffect } from 'react';

export default function Home() {
  // REMOVE ALL OF THIS THEME STATE MANAGEMENT:
  // const [isDarkMode, setIsDarkMode] = useState(false);
  // useEffect(() => { ... theme initialization ... }, []);
  // const toggleTheme = () => { ... theme toggling ... };

  return (
    <>

      <Header />
      <About />
      <Services/>
      <Work/>
      <Contact/>
    </>
  );
}