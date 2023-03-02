import React from 'react'
import {motion} from 'framer-motion';
export default function TextSpan({text}) {
  return (
    <motion.span whileHover={{scale:1.1}}
     className='text-9xl text-blue-500 font-bold inline-block cursor-none'>
        {text}
    </motion.span>
  )
}
