import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import js from "../assets/logos/js.png";
import java from "../assets/logos/java.png";
import dart from "../assets/logos/dart.png";
import python from "../assets/logos/python.png";

const iconVariants = {
  initial: {
    x: "100vw",
  },
  animate: {
    x: 0,
    scale: [1, 1.2, 1, 1.2, 1],
  },
};

export default function ExperienceContent({objList}) {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(() => {
    if (inView) {
      controls.start("animate");
    }
  }, [controls, inView]);
  

  return (
    <motion.div ref={ref} className="overflow-hidden">
      {objList.map((li, i) => {
        return (
          <div key={i} className="flex mt-1 md:mt-3 text-blue-500 font-medium text-3xl">
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
              width={35}
              alt=""
            />
          </div>
        );
      })}
    </motion.div>
  );
}
