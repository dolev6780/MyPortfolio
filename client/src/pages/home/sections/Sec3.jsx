import React, { useState, useRef, useEffect } from "react";
import bijumpacademy from "../../../assets/bijumpacademy.jpg";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useScreensize } from "../../../hooks/useScreenSize";
const projects = [
  {
    Pname: "BI JUMP ACADEMY",
    Pdetails: "Online course for jump rope.",
    Pimg1: bijumpacademy,
  },
  {
    Pname: "BI JUMP ACADEMY 2",
    Pdetails: "Online course for jump rope.",
    Pimg1: bijumpacademy,
  },
  {
    Pname: "BI JUMP ACADEMY 3",
    Pdetails: "Online course for jump rope.",
    Pimg1: bijumpacademy,
  },
  {
    Pname: "BI JUMP ACADEMY 4",
    Pdetails: "Online course for jump rope.",
    Pimg1: bijumpacademy,
  },
];

const slideVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const hoverVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      delay: 0.6,
    },
  },
};
var delay = 5000;
export default function Sec3() {
  const [index, setIndex] = useState(0);
  const [hoverShadow, setHoverShadow] = useState(true);
  const timeoutRef = useRef(null);
  const controls = useAnimation();
  const { screenSize } = useScreensize();
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (!hoverShadow) controls.start("animate");
    else {
      controls.start("initial");
    }
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, hoverShadow, controls]);

  return (
    <AnimatePresence>
      <div className="h-full w-full mt-32">
        <h1
          className="text-4xl text-blue-500 font-bold
      md:text-6xl
      lg:text-8xl
      "
        >
          Latest Works
        </h1>
        {screenSize.dynamicWidth > 1280 ? (
          <div
            className="w-full p-10 overflow-hidden m-auto mt-20
      lg:w-[80%] 2xl:w-[60%]
      "
          >
            <motion.div
              key={index}
              variants={slideVariant}
              initial="initial"
              animate="animate"
              onHoverStart={() => {
                setHoverShadow(false);
              }}
              onHoverEnd={() => {
                setHoverShadow(true);
              }}
              className="flex items-center justify-center cursor-pointer
          "
            >
              <motion.div
                variants={hoverVariant}
                initial="initial"
                animate={controls}
                className="absolute z-10"
              >
                <div className="bg-black p-4 bg-opacity-50 rounded-2xl">
                  <h1 className="font-bold text-2xl text-blue-500">
                    {projects[index].Pname}
                  </h1>
                  <p className="font-medium">{projects[index].Pdetails}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-400 font-medium text-white p-4 w-[90px] h-[90px] rounded-full relative top-5"
                >
                  See Project
                </motion.button>
              </motion.div>

              <img className="" src={projects[index].Pimg1} alt="" />
            </motion.div>

            <div className="mt-20 flex rounded-full cursor-pointer">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setIndex(idx);
                  }}
                  style={index === idx ? { opacity: 1 } : { opacity: 0.6 }}
                >
                  <img src={project.Pimg1} alt="" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {projects.map((project, idx) => {
              return (
                <div
                  key={idx}
                  className="p-4 pr-8 pl-8 flex justify-center items-center sm:w-[80%] m-auto"
                >
                  <div className="bg-black bg-opacity-50 p-2 absolute rounded">
                    <h1 className="font-bold text-md text-blue-500">
                      {project.Pname}
                    </h1>
                    <p className="font-medium text-sm">{project.Pdetails}</p>
                  </div>
                  <img className="" src={project.Pimg1} alt="" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
}
