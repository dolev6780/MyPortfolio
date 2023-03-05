import React from 'react'
import {motion} from 'framer-motion';
export default function TextSpan({text}) {
  return (
    <motion.span whileHover={{scale:1.1}}
     className='font-bold inline-block cursor-none
     text-3xl
     md:text-6xl
     xl:text-7xl
      
      
       '>
        {text}
    </motion.span>
  )
}
