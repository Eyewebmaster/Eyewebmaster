"useClient";

import React, {useState} from 'react'
import Image from 'next/image'
import { assets } from '../../assets/assets'
import DarkModeToggle from '../contexts/DarkModeToggle'; // Assuming this path is correct
import { useTheme } from '../contexts/ThemeContext'; // <--- IMPORT THE USETHEME HOOK
import { motion } from 'motion/react';

const Contact = () => {
    const {isDarkMode} = useTheme();
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
    
        formData.append("access_key", "26bf2153-b1c7-4d0e-9aa5-5a45063e6942");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          setResult("Form Submitted Successfully");
          event.target.reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
        }
      };

  return (
    <div id='contact' className='w-full px=[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'>
      <h4 className='text-center mb-2 text-lg font-Ovo'> 
            Connect with us
        </h4>
        <motion.div
            initial={{scale: 2}} whileInView = {{scale: 1}} transition = {{duration: 0.8, type: 'string' }}
        >
        <h2 className='text-center text-5xl font-Ovo'>
            Get in Touch
        </h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        We love to hear from you! If you have any questions, comments, or feedback, please use the form below.
        </p>
        </motion.div>

        <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
            <input
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:text-black"
            />
            <input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:text-black"
            />
        </div>

        <textarea
            name="message"
            rows="6"
            placeholder="Enter your message"
            required
            defaultValue=""
            className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6 dark: text-black"
        />

        <button
            type="submit"
            className="py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/70 text-white rounded-full mx-auto hover:bg-black duration-500 dark:hover:bg-white/50"
        >
            Submit now <Image src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_white} alt="" className="w-4"  />
        </button>

        <p className="mt-4">{result}</p>
        </form>
    </div>
  )
}

export default Contact
