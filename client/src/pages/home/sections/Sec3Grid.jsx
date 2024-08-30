import React from 'react';
import { motion } from 'framer-motion';

export default function Sec3Grid({ projects }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 gap-y-20 md:p-10 mt-16">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
        >
          <p className='flex text-3xl absolute -mt-7 -z-10 text1'>{index+1}</p>
          <motion.img
            src={project.img}
            alt={project.title}
            className="md:w-full max-w-md md:h-full object-cover rounded-lg cursor-pointer w-72 h-40"
            whileHover={{scale:1.2}}
            transition={{duration:0.6}}
          />
          <p className='flex text-xl absolute text1'>{project.title}</p>
        </motion.div>
      ))}
    </div>
  );
}