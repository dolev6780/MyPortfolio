import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const svgVariant = {
  initial: { rotate: 0 },
  animate: {
    rotate: 0,
    transition: { duration: 1 },
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
      duration: 4,
      ease: "easeInOut",
    },
  },
};

export default function CodeWindow() {
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
        width="335"
        height="335"
        viewBox="0 0 566 335"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          variants={pathVariant}
          x1="0.998227"
          y1="45.5"
          x2="564.998"
          y2="43.5"
          stroke={color}
          strokeWidth="3"
        />
        <motion.circle
          variants={pathVariant}
          cx="545"
          cy="25"
          r="8"
          fill="#FF0000"
        />
        <motion.circle
          variants={pathVariant}
          cx="472"
          cy="25"
          r="8"
          fill="#FAFF00"
        />
        <motion.circle
          variants={pathVariant}
          cx="509"
          cy="25"
          r="8"
          fill="#05FF00"
        />
        <motion.line
          variants={pathVariant}
          x1="45.0687"
          y1="9.45757"
          x2="26.7739"
          y2="38.081"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="24.2481"
          y1="13.4341"
          x2="10.2481"
          y2="21.4341"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="62.2481"
          y1="23.4341"
          x2="48.2481"
          y2="31.4341"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="22.9666"
          y1="31.4451"
          x2="10.4062"
          y2="21.3339"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="62.9666"
          y1="23.4451"
          x2="50.4062"
          y2="13.3339"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="565"
          y1="0.5"
          x2="1"
          y2="0.5"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="1.5"
          x2="1.5"
          y2="335"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="1"
          y1="334.5"
          x2="565"
          y2="334.5"
          stroke={color}
          strokeWidth="3"
        />
        <motion.line
          variants={pathVariant}
          x1="565.5"
          x2="565.5"
          y2="335"
          stroke={color}
          strokeWidth="3"
        />
      </motion.svg>
    </motion.div>
  );
}
