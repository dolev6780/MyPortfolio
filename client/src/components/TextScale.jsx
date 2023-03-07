import React from 'react'
import {motion} from 'framer-motion';
export default function TextSpan({text}) {
  return (
    <motion.span whileHover={{scaleX:[1,1.2,0.8,1.2,1],scaleY:[1,0.8,1.2,0.8,1],color:"#3d7ceb"}}
     className='font-bold inline-block cursor-none
     text-3xl
     md:text-6xl
     xl:text-7xl
      
      
       '>
        {text}
    </motion.span>
  )
}
