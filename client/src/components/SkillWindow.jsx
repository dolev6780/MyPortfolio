import React, {useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import react from "../assets/logos/react.png";
import nodejs from "../assets/logos/nodejs.jpeg";
import css from "../assets/logos/css.jpeg";
import tailwind from "../assets/logos/tailwind.jpeg";
import html from "../assets/logos/html.png";

const iconVariants = {
  initial: {
    x: "100vw",
  },
  animate: {
    x: 0,
    scale:[1,1.2,1,1.2,1]
  },
};

export default function SkillWindow() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(() => {
   
    if (inView) {
      controls.start("animate");
    }

  }, [controls, inView]);

  return (
    <div className='font-bold overflow-hidden'>
        <motion.div ref={ref} className="mt-10 m-auto">
        <h1 className='text-xl text-left'>
            Skilled in developing web applications with:
        </h1>
        <div className='grid justify-center text-lg'>
        <div className="flex mt-4">
          <p>React js</p>
          <motion.img
          className="ml-2"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 3,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={react}
            width={30}
            alt=""
          />
        </div>
        <div className="flex mt-4">
          <p>Node js</p>
          <motion.img
            className="ml-1 mb-2"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 3.5,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={nodejs}
            width={25}
            alt=""
          />
        </div>
        <div className="flex mt-4">
          <p>CSS</p>
          <motion.img
            className="ml-2 mb-2"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 4,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={css}
            width={25}
            alt=""
          />
        </div>
        <div className="flex mt-4">
          <p>Tailwind CSS</p>
          <motion.img
            className="ml-1"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 4.5,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={tailwind}
            width={25}
            alt=""
          />
          </div>
          <div className="flex mt-4">
          <p>HTML</p>
          <motion.img
            className="ml-1"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 5,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={html}
            width={25}
            alt=""
          />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
