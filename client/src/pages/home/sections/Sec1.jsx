import React from "react";
import { motion } from "framer-motion";
import TextScale from "../../../components/TextScale";
const spanVariants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.1, 1, 1.1],
    color: "#3d7ceb",
    originX: 0,
    transition: {
      delay: 2,
    },
  },
};
const paraVariants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.2, 1],
    originX: 0,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};
export default function sec1() {
  const title = "Hello!".split("");

  return (
    <div
      className="h-screen w-full justify-center flex items-center"
    >
      <div>
        <div className="inline-flex">
        {title.map((char, i) => {
          return <TextScale text={char} key={i} />;
        })}
        <motion.p
            variants={paraVariants}
            initial="initial"
            animate="animate"
            className="font-bold ml-2
            text-3xl
            md:text-6xl
            xl:text-7xl
              "
          >
            I'm Dolev
          </motion.p>
          </div>
        <motion.p
          className="
          text-2xl
          md:text-6xl
          xl:text-7xl
          "
          variants={spanVariants}
          initial="initial"
          animate="animate"
        >
          Mobile & Web Developer.
        </motion.p>
      <button className="mt-5 p-2 pl-4 pr-4 bg-gradient-to-r from-blue-500 to-blue-400 font-bold rounded-md
        md:p-4 md:pl-6 md:pr-6 md:mt-10
      ">Contact me
      </button>
      </div>
    </div>
  );
}
