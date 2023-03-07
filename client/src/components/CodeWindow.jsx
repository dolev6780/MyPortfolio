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
      duration: 2,
      ease: "easeInOut",
    },
  },
};

export default function CodeWindow({ width }) {
  const [color, setColor] = useState("black");
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
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => {
        setColor("#3d7ceb");
      }}
      onHoverEnd={() => {
        setColor("black");
      }}
    >
      <motion.svg
      ref={ref}
      variants={svgVariant}
      initial="initial"
      animate={controls}
        width="500"
        height="355"
        viewBox="0 0 562 392"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.rect
        initial={{opacity:0, x:"100vh"}}
        animate={{opacity:1, x:0}}
        transition={{delay:1, duration:3}}
         y="55" width="560" height="335" fill="#2A2A2A" />
        <motion.rect
       initial={{opacity:0, x:"-100vh"}}
       animate={{opacity:1, x:0}}
       transition={{delay:1, duration:3}}
         width="560" height="55" fill="#3D7CEB" />
        <motion.line
        variants={pathVariant}
         y1="54.5" x2="560" y2="54.5" stroke="black" />
        <motion.line
        variants={pathVariant}
          x1="54.4053"
          y1="18.2927"
          x2="41.4053"
          y2="36.2927"
          stroke="white"
        />
        <motion.line
        variants={pathVariant}
          x1="35.3651"
          y1="36.4043"
          x2="17.7533"
          y2="26.4131"
          stroke="white"
        />
        <motion.line
        variants={pathVariant}
          x1="17.8193"
          y1="26.5373"
          x2="34.3245"
          y2="17.5608"
          stroke="white"
        />
        <motion.line
        variants={pathVariant}
          x1="59.2716"
          y1="17.5802"
          x2="76.2716"
          y2="28.5802"
          stroke="white"
        />
        <motion.line
        variants={pathVariant}
          x1="76.2129"
          y1="28.4524"
          x2="59.2129"
          y2="36.4524"
          stroke="white"
        />
        <motion.path
        variants={pathVariant}
          d="M14.8125 70.2812V69.3125C15.6823 69.3125 16.2891 69.1302 16.6328 68.7656C16.9818 68.401 17.1562 67.7917 17.1562 66.9375V64.4375C17.1562 63.7187 17.224 63.0964 17.3594 62.5703C17.5 62.0443 17.7266 61.6094 18.0391 61.2656C18.3516 60.9219 18.7682 60.6667 19.2891 60.5C19.8099 60.3333 20.4531 60.25 21.2188 60.25V61.7812C20.6146 61.7812 20.138 61.875 19.7891 62.0625C19.4453 62.25 19.2005 62.5417 19.0547 62.9375C18.9141 63.3281 18.8438 63.8281 18.8438 64.4375V67.5625C18.8438 67.9687 18.7891 68.3385 18.6797 68.6719C18.5755 69.0052 18.3802 69.2917 18.0938 69.5312C17.8073 69.7708 17.3984 69.9557 16.8672 70.0859C16.3411 70.2161 15.6563 70.2812 14.8125 70.2812ZM21.2188 80.25C20.4531 80.25 19.8099 80.1667 19.2891 80C18.7682 79.8333 18.3516 79.5781 18.0391 79.2344C17.7266 78.8906 17.5 78.4557 17.3594 77.9297C17.224 77.4036 17.1562 76.7813 17.1562 76.0625V73.5625C17.1562 72.7083 16.9818 72.099 16.6328 71.7344C16.2891 71.3698 15.6823 71.1875 14.8125 71.1875V70.2187C15.6563 70.2187 16.3411 70.2839 16.8672 70.4141C17.3984 70.5443 17.8073 70.7292 18.0938 70.9687C18.3802 71.2083 18.5755 71.4948 18.6797 71.8281C18.7891 72.1615 18.8438 72.5312 18.8438 72.9375V76.0625C18.8438 76.6719 18.9141 77.1719 19.0547 77.5625C19.2005 77.9531 19.4453 78.2422 19.7891 78.4297C20.138 78.6224 20.6146 78.7188 21.2188 78.7188V80.25ZM14.8125 71.1875V69.3125H16.6563V71.1875H14.8125Z"
          fill="white"
        />
        <motion.path
        variants={pathVariant}
          d="M21.1563 376.219V377.187C20.2865 377.187 19.6771 377.37 19.3281 377.734C18.9844 378.099 18.8125 378.708 18.8125 379.562V382.062C18.8125 382.781 18.7422 383.404 18.6016 383.93C18.4661 384.456 18.2422 384.891 17.9297 385.234C17.6172 385.578 17.2005 385.833 16.6797 386C16.1589 386.167 15.5156 386.25 14.75 386.25V384.719C15.3542 384.719 15.8281 384.622 16.1719 384.43C16.5208 384.242 16.7656 383.953 16.9063 383.563C17.0521 383.172 17.125 382.672 17.125 382.062V378.937C17.125 378.531 17.1771 378.161 17.2813 377.828C17.3906 377.495 17.5885 377.208 17.875 376.969C18.1615 376.729 18.5677 376.544 19.0938 376.414C19.625 376.284 20.3125 376.219 21.1563 376.219ZM14.75 366.25C15.5156 366.25 16.1589 366.333 16.6797 366.5C17.2005 366.667 17.6172 366.922 17.9297 367.266C18.2422 367.609 18.4661 368.044 18.6016 368.57C18.7422 369.096 18.8125 369.719 18.8125 370.437V372.937C18.8125 373.792 18.9844 374.401 19.3281 374.766C19.6771 375.13 20.2865 375.312 21.1563 375.312V376.281C20.3125 376.281 19.625 376.216 19.0938 376.086C18.5677 375.956 18.1615 375.771 17.875 375.531C17.5885 375.292 17.3906 375.005 17.2813 374.672C17.1771 374.339 17.125 373.969 17.125 373.562V370.437C17.125 369.828 17.0521 369.328 16.9063 368.937C16.7656 368.542 16.5208 368.25 16.1719 368.062C15.8281 367.875 15.3542 367.781 14.75 367.781V366.25ZM21.1563 375.312V377.187H19.3125V375.312H21.1563Z"
          fill="white"
        />
        <motion.line variants={pathVariant} x1="1" x2="1" y2="390" stroke="black" stroke-width="2" />
        <motion.line variants={pathVariant} x1="561" x2="561" y2="390" stroke="black" stroke-width="2" />
        <motion.line variants={pathVariant} x1="560" y1="1" y2="1" stroke="black" stroke-width="2" />
        <motion.line variants={pathVariant} x1="560" y1="391" y2="391" stroke="black" stroke-width="2" />
        <motion.circle variants={pathVariant} cx="543" cy="27" r="5" fill="white" />
        <motion.circle variants={pathVariant} cx="509" cy="27" r="5" fill="white" />
        <motion.circle variants={pathVariant} cx="526" cy="27" r="5" fill="white" />
      </motion.svg>
    </motion.div>
  );
}
