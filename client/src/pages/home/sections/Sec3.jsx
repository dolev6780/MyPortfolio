import React, { useState, useRef, useEffect } from "react";
import bijumpacademy from "../../../assets/bijumpacademy.jpg";
import pic from "../../../assets/logos/js.png";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
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
  initial:{opacity:0},
  animate:{opacity:1,transition:{duration:0.6}},
  exit: {
    opacity: 0,
    transition: {
      duration: 0.6,
      delay:0.6
    },
  },
}
const delay = 5000;
export default function Sec3() {
  const [index, setIndex] = useState(0);
  const [hoverShadow, setHoverShadow] = useState(true);
  const timeoutRef = useRef(null);
  const controls = useAnimation();
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  
  
  useEffect(() => {
    if(!hoverShadow)
    controls.start("animate");
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
  }, [index,hoverShadow]);

  return (
    <AnimatePresence>
    <div className="xl:h-[120vh] h-screen w-full">
      <h1
        className="text-4xl text-blue-500 font-bold mt-32
      sm:text-7xl
      lg:text-8xl
      "
      >
        Latest Works
      </h1>
      <div className="w-[60%] overflow-hidden m-auto mt-10">
     
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
           <div
            hidden={hoverShadow}
            className="w-[60%] h-[68%] bg-black absolute opacity-50"
          />
          <motion.div
          variants={hoverVariant}
          initial="initial"
          animate={controls}
          className="absolute z-10">
            <h1 className="font-bold text-2xl text-blue-500">
              {projects[index].Pname}
            </h1>
            <p className="font-medium">{projects[index].Pdetails}</p>
         
            <motion.button
               whileHover={{scale:1.2}}
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
      <div
        className="mt-10 
      md:grid md:grid-flow-row md:grid-cols-2
      
      "
      >
        {/* {projects.map((project, i) => {
          return (
            <div key={i} className="flex items-center justify-center bg-black m-auto mt-20 rounded
            w-[350px] h-[300px]
            lg:w-[450px] lg:h-[400px]
            xl:w-[600px] xl:h-[550px] xl:ml-[20%]
            2xl:w-[750px] 2xl:h-[700px] 2xl:ml-auto
            
            ">
              <img
                className="absolute object-cover rounded
                w-[350px] h-[300px]
                lg:w-[450px] lg:h-[400px]
                xl:w-[600px] xl:h-[550px]
                2xl:w-[750px] 2xl:h-[700px]
                "
                src={project.Pimg1}
                alt=""
              />
              <div className="bg-black absolute opacity-50 rounded
              w-[350px] h-[300px]
              lg:w-[450px] lg:h-[400px]
              xl:w-[600px] xl:h-[550px]
              2xl:w-[750px] 2xl:h-[700px]
              "/>
              <div className="absolute">
                <h1 className="text-blue-500 font-bold
                text-2xl
                lg:text-3xl
                xl:text-5xl
                ">
                  {project.Pname}
                </h1>
                <p className="font-medium
                text-lg
                lg:text-xl
                xl:text-2xl
                ">
                  {project.Pdetails}
                </p>
                <button className="mt-5 p-2 pl-4 pr-4 bg-gradient-to-r from-blue-500 to-blue-400 font-bold rounded-md
        md:p-4 md:pl-6 md:pr-6 md:mt-10
      ">See Project
      </button>
              </div>
              </div>
          );
        })} */}
      </div>
    </div>
    </AnimatePresence>
  );
}
