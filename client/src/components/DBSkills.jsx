import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import firebase from "../assets/logos/firebase.jpeg";
import mongodb from "../assets/logos/mongodb.jpeg";

const ContainerVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,

    transition: {
      delay: 7,
      duration: 2,
    },
  },
};

export default function DBSkills() {
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
      ref={ref}
      variants={ContainerVariants}
      initial="initial"
      animate={controls}
      className="font-bold"
    >
      <h1 className="text-lg mt-10 md:mt-4">DataBase Skills</h1>
      <div className="flex mt-10 md:mt-14 justify-center items-center text-blue-500">
        <p>Firebase</p>
        <motion.img
         initial={{scale:1}}
          animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
          transition={{
            delay: 7.5,
            duration: 1.6,
            type: "spring",
            stiffness: 120,
          }}
          className="ml-1"
          src={firebase}
          width={30}
          alt=""
        />
      </div>
      <div className="flex mt-8 md:mt-12 justify-center items-center text-blue-500">
        <p className="">MongoDB</p>
        <motion.img
        initial={{scale:1}}
          animate={{ scale: [1, 1.2, 1, 1.2, 1] }}
          transition={{
            delay: 8,
            duration: 1.6,
            type: "spring",
            stiffness: 120,
          }}
          className="ml-1"
          src={mongodb}
          width={30}
          alt=""
        />
      </div>
    </motion.div>
  );
}
