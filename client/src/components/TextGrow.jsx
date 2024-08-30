import React from 'react'
import {motion} from 'framer-motion';
export default function TextGrow({char, x,y,rotate}) {
  return (
    <motion.span
   
    animate={{
      x:x,
      y:y,
      rotate:rotate,
      scale: [1, 1.1, 1, 1.1, 1],
      color: "#3d7ceb",
      originX: 0,
    }}
    transition={{
      duration:0.5
    }}
     className='font-bold inline-block 
     text-2xl
     sm:text-4xl
     md:text-6xl
     xl:text-7xl
       '>
       {char}
    </motion.span>
  )
}
