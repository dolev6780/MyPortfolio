import React, {useEffect, useRef } from "react";
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

export default function ExperienceWindow() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);
  useEffect(() => {
   
    if (inView) {
      controls.start("animate");
    }

  }, [controls, inView]);

  return (
    <div className="font-bold overflow-hidden">
      <motion.div ref={ref} className="mt-10 m-auto">
        <h1 className="text-xl text-left">
          Experienced in both functional and OOP with:
        </h1>
        
        <div className="grid justify-center text-lg">
          <div className="flex mt-4">
            <p>JavaScript</p>
            <motion.img
              variants={iconVariants}
              initial="initial"
              animate={controls}
              transition={{
                delay: 1,
                duration: 1.6,
                type: "spring",
                stiffness: 120,
              }}
              src={js}
              width={50}
              alt=""
            />
          </div>
          <div className="flex mt-4">
            <p>Java</p>
            <motion.img
              className="ml-1 mb-2"
              variants={iconVariants}
              initial="initial"
              animate={controls}
              transition={{
                delay: 1.5,
                duration: 1.6,
                type: "spring",
                stiffness: 120,
              }}
              src={java}
              width={25}
              alt=""
            />
          </div>
          <div className="flex mt-4">
            <p>Dart</p>
            <motion.img
              className="ml-2 mb-2"
              variants={iconVariants}
              initial="initial"
              animate={controls}
              transition={{
                delay: 2,
                duration: 1.6,
                type: "spring",
                stiffness: 120,
              }}
              src={dart}
              width={25}
              alt=""
            />
          </div>
          <div className="flex mt-4">
            <p>Python</p>
            <motion.img
              className="ml-1"
              variants={iconVariants}
              initial="initial"
              animate={controls}
              transition={{
                delay: 2.5,
                duration: 1.6,
                type: "spring",
                stiffness: 120,
              }}
              src={python}
              width={25}
              alt=""
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
