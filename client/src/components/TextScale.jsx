import React from 'react'
import {motion} from 'framer-motion';
export default function TextSpan({char, x,y,rotate}) {
  return (
    <motion.span
   
    animate={{
      x:x,
      y:y,
      rotate:rotate,
    }}
    whileHover={
      {
        scaleX:[1,1.2,0.8,1.2,1],scaleY:[1,0.8,1.2,0.8,1],color:"#3d7ceb"}}
        transition={{
          duration:0.5
        }}
     className='font-bold inline-block cursor-none
     text-3xl
     md:text-6xl
     xl:text-7xl
      
      
       '>
       {char}
    </motion.span>
  )
}
