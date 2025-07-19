"use client"; 

import React from 'react'
import Image from 'next/image'
import { workData, assets, serviceData } from '../../assets/assets'
import { useTheme } from '../contexts/ThemeContext'; 


const Work = () => {
    const {isDarkMode} = useTheme();
  return (
    <div id='Work' className='w-full px=[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-Ovo'> 
            Our Porfolio
        </h4>
        <h2 className='text-center text-5xl font-Ovo'>
            Our lastest work
        </h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        Showing you some of our app development porfolio! Explore the collection of projects showcasing our expertise in app, web and front-end development. 
        </p>
        <div className='grid grid-cols-auto my-10 gap-5 p-1'>
            {workData.map((project, index)=>(
                <div key={index} className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group' style={{backgroundImage: `url(${project.bgImage})`}}>
                    <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex item-center justify-between duration-500 group-hover:bottom-7'>
                        <div>
                            <h2 className='font-semibold '>{project.title}</h2>
                            <p className='text-sm text-gray-700'>{project.description}</p>
                        </div>
                        <div className='border rounded-full border-black w-9 aspect-squre flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition'> 
                            <Image src={assets.send_icon} alt='' className='w-5'/>
                        </div>
                    </div>
                </div>

        ))}
        </div>
        <a href="" className='w-max flex item-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-light-hover duration-500 dark:border-white dark:text-white'>
            Show more <Image src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='right arrow' className='w-6 h-5 mt-2' />
        </a>
    </div>
  )
}

export default Work
