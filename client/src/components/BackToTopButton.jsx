import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const svgVariant = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0,180,-360],
      transition:{delay:1, duration:0.6}
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
        
        duration: 1,
        ease: "easeInOut"
      },
    },
  };


export default function BackToTopButton() {

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
    <a href="#sec1"><motion.div
    onHoverStart={() => {
      setColor("#3d7ceb");
    }}
    onHoverEnd={() => {
      setColor("white");
    }}
  
    >
      <motion.svg
      whileHover={{rotate: [0,180,-360],scale:[1,1.3,1]}}
      className="fixed bottom-[4.5rem] left-5"
      ref={ref}
      variants={svgVariant}
      initial="initial"
      animate="animate"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
        variants={pathVariant}
        cx="25" cy="25" r="24" stroke={color} strokeWidth="2" />
        <motion.line
        variants={pathVariant}
          x1="26.0731"
          y1="16.5623"
          x2="14.8269"
          y2="33.1008"
          stroke={color}
          strokeWidth="2"
        />
        <motion.line
        variants={pathVariant}
          x1="34.9635"
          y1="33.9068"
          x2="25.1292"
          y2="16.4917"
          stroke={color}
          strokeWidth="2"
        />
      </motion.svg>
    </motion.div></a>
  );
}
