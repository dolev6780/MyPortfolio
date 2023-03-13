import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const iconVariants = {
  initial: {
    x: "100vw",
  },
  animate: {
    x: 0,
    scale: [1, 1.2, 1, 1.2, 1],
   
  },
};

export default function ExperienceContent({objList, iconSize}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);
  

  return (
    <motion.div ref={ref} className="overflow-hidden mt-8">
      {objList.map((li, i) => {
        return (
          <div key={i} className="flex items-center  mt-1 text-blue-500 font-medium
          text-sm
          3xl:text-3xl 3xl:mt-2
          
          ">
            <motion.p
            variants={iconVariants}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{
                delay:1,
              duration: 1.6,
            }}
            >{li.li}</motion.p>
            <motion.img
              className="ml-2"
              variants={iconVariants}
              initial="initial"
              animate={controls}
              transition={{
                delay: li.delay,
                duration: 1.6,
                type: "spring",
                stiffness: 120,
              }}
              src={li.logo}
              width={iconSize}
              alt=""
            />
          </div>
        );
      })}
    </motion.div>
  );
}
