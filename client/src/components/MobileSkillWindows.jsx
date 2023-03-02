import React, {useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import reactnative from "../assets/logos/reactnative.png";
import nodejs from "../assets/logos/nodejs.jpeg";
import flutter from "../assets/logos/flutter.jpeg";
import mui from "../assets/logos/mui.png";


const iconVariants = {
  initial: {
    x: "100vw",
  },
  animate: {
    x: 0,
    scale:[1,1.2,1,1.2,1]
  },
};

export default function MobileSkillWindow() {
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
            Skilled in developing Mobile applications with:
        </h1>
        <div className='grid justify-center text-lg'>
        <div className="flex mt-4">
          <p>React Native</p>
          <motion.img
          className="ml-2"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 5.5,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={reactnative}
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
              delay: 6,
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
          <p>Flutter</p>
          <motion.img
            className="ml-2 mb-2"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 6.5,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={flutter}
            width={25}
            alt=""
          />
        </div>
        <div className="flex mt-4">
          <p>Material UI</p>
          <motion.img
            className="ml-1"
            variants={iconVariants}
            initial="initial"
            animate={controls}
            transition={{
              delay: 7,
              duration: 1.6,
              type: "spring",
              stiffness: 120,
            }}
            src={mui}
            width={25}
            alt=""
          />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
