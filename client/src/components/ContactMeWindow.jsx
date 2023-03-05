import React, {useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const pathVariant = {
  initial: {
    opacity: 0,
    pathLength: 0,
  },
  animate: {
    opacity: 1,
    pathLength: 1,
    transition: {
      
      duration: 4.5,
      ease: "easeInOut",
    },
  },
};
export default function ContactMeWindow({signal}) {
  const controls = useAnimation();
  useEffect(() => {
   
    if (signal) {
      controls.start("animate");
    }

  }, [controls,signal]);

  return (
    <div
    >
      <svg
        width="650"
        height="850"
        viewBox="0 0 98 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          variants={pathVariant}
          initial="initial"
          animate={controls}
          x1="1.5"
          y1="0.5"
          x2="97.5"
          y2="0.5"
          stroke="white"
          strokeLinecap="round"
          strokeWidth={.8}
        />
        <motion.line
          variants={pathVariant}
          initial="initial"
          animate={controls}
          x1="1.5"
          y1="115.5"
          x2="97.5"
          y2="115.5"
          stroke="white"
          strokeLinecap="round"
          strokeWidth={.8}
        />
        <motion.line
          variants={pathVariant}
          initial="initial"
          animate={controls}
          x1="1.5"
          y1="115.5"
          x2="1.5"
          y2="0.5"
          stroke="white"
          strokeLinecap="round"
          strokeWidth={.8}
        />
        <motion.line
          variants={pathVariant}
          initial="initial"
          animate={controls}
          x1="97.5"
          y1="115.5"
          x2="97.5"
          y2="0.5"
          stroke="white"
          strokeLinecap="round"
          strokeWidth={.8}
        />
      </svg>
    </div>
  );
}
