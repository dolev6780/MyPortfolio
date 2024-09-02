import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Sec3Grid({ projects }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 gap-y-20 md:p-10 mt-16">
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="relative mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.1 }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <p className={`flex text-3xl absolute -mt-7 -z-10 text1 ${hoverIndex === index ? 'opacity-0' : 'opacity-100'}`}>
            {index + 1}
          </p>

          <motion.img
            src={project.img}
            alt={project.title}
            className="md:w-full max-w-md md:h-full object-cover rounded-lg cursor-pointer w-72 h-40"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.6 }}
          />
           <p className={`flex text-xl absolute text1 ${hoverIndex === index ? 'opacity-0' : 'opacity-100'}`}>{project.title}</p>
          <motion.div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-black bg-opacity-70 rounded-lg transition-opacity duration-300 ${
              hoverIndex === index ? 'opacity-100' : 'opacity-0'
            } ${hoverIndex === index ? 'md:p-6 lg:p-8' : 'p-2'}`}
            style={{ bottom: '0', left: '0', right: '0', top: '0' }}
          >
            <p className="text-white mb-10 text-xs 2xl:text-base">{project.details}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md text-xs 2xl:text-base absolute bottom-2 right-2"
            >
              Visit
            </a>
          </motion.div>
          
        </motion.div>
      ))}
    </div>
  );
}