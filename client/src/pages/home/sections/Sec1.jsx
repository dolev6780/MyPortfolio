import React from 'react';
import {motion} from 'framer-motion';
import TextScale from '../../../components/TextScale';
const spanVariants = {
  initial: {
    scale:1,
    fontSize:"4rem",
  },
  animate: {
    scale: [1,1.1,1,1.1],
    color: "#3d7ceb",
    originX:0,
    fontSize:"4.5rem",
    transition: {
      delay:2,
    }
  }
}
  const paraVariants = {
    initial:{
      scale: 1
    },
    animate: {
      scale:[1,1.2,1],
      originX:0,
      transition:{
        delay:0.5,
        duration:1
      }
    }
  }
export default function sec1() {

  const title = "Hello!".split("");

  return (
    <div className=" h-screen flex justify-center
    relative top-96 text-left">
      <div>
      {title.map((char, i)=>{
        return  <TextScale text={char} key={i}/>
      })}
      <div className='flex'>
      <motion.p
      variants={paraVariants}
      initial="initial"
      animate="animate"
      className='text-7xl font-bold ml-2'>I'm Dolev</motion.p>
      <p className='text-7xl font-bold ml-2'>,a</p>
      </div>
        <motion.p
        className="text-7xl font-bold 
        mt-4 m-auto ml-1"
          variants={spanVariants}
          initial="initial"
          animate="animate"
         >
          Mobile & Web Developer.
          </motion.p>
        </div>
    </div>
  )
}
