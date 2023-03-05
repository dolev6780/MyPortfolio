import React, {useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const svgVariant = {
    initial: { rotate: 0 },
    animate: {
      rotate: 0,
      transition: {duration: 1 },
    },
  };
  const pathVariant = {
    initial: {
      opacity: 0,
      pathLength: 0,
    },
    animate: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay:2, 
        duration: 6.5,
        ease: "easeInOut"
      },
    },
  };


export default function DBSkillsWindow({width}) {
  const [color, setColor] = useState("white");
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref);
    useEffect(() => {
     
      if (inView) {
        controls.start("animate");
      }
  
    }, [controls, inView]);
  return (
    <motion.div
    whileHover={{scale:1.1}}
    onHoverStart={() => {
      
      setColor("#3d7ceb");
    }}
    onHoverEnd={() => {
      setColor("white");
    }}
    >
      <motion.svg
      ref={ref}
      variants={svgVariant}
      initial="initial"
      animate={controls}
        width={width}
        height="333"
        viewBox="0 0 255 333"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
        variants={pathVariant}
          opacity="0.8"
          x1="1"
          y1="55"
          x2="1.1"
          y2="207.017"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
        variants={pathVariant}
          opacity="0.8"
          x1="253"
          y1="53.0178"
          x2="249.850"
          y2="210.017"
          stroke={color}
          strokeWidth="3"
        />
        <motion.path
        variants={pathVariant}
          d="M1.00019 53.9915C1.00798 120.991 253.139 127.022 253.13 52.9988"
          stroke={color}
          strokeWidth="3"
        />
        <motion.path
        variants={pathVariant}
          d="M253.1 54.6586C253.487 -12.3402 1.43032 -19.8568 1.00296 54.1655"
          stroke={color}
          strokeWidth="3"
        />
        <motion.path
        variants={pathVariant}
          d="M1.00679 125.992C1.01599 192.992 251.757 199.029 251.747 125.005"
          stroke={color}
          strokeWidth="3"
        />
        <motion.path
        variants={pathVariant}
          d="M1.00019 204.983C1.0108 271.983 250.37 278.025 250.358 204.001"
          stroke={color}
          strokeWidth="3"
        />
      </motion.svg>
    </motion.div>
  );
}
