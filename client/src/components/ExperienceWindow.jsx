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

export default function ExperienceWindow({ title, list}) {
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
      <motion.div ref={ref} className="mt-20 md:mt-10 m-auto">
        <h1
          className="text-sm text-left
        md:text-xl
         "
        >
          {title}
        </h1>
        <div className="grid justify-center text-sm md:text-lg">
          {list.map((li, i) => {
            return (
              <div key={i} className="flex mt-1 md:mt-4 text-blue-500">
                <p>{li.li}</p>
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
                  width={25}
                  alt=""
                />
              </div>
            );
          })}

          {/* <div className="flex md:mt-4">
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
          <div className="flex md:mt-4 text-blue-500">
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
          <div className="flex md:mt-4">
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
          </div> */}
        </div>
      </motion.div>
    </div>
  );
}
