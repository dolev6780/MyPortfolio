import React, { useState } from "react";
import { motion } from "framer-motion";
import TextScale from "../../../components/TextScale";
import TextGrow from "../../../components/TextGrow";
import { useScreensize } from "../../../hooks/useScreenSize";

export default function Sec1() {
  const { screenSize } = useScreensize();
  const title = "Hello! I'm Dolev".split("");
  const secondaryTitle = " Mobile & Web Developer.".split("");
  const [animation, setAnimation] = useState(
    title.map(() => ({
      x: 0,
      y: 0,
      rotate: 0,
    }))
  );
  const [animation2, setAnimation2] = useState(
    secondaryTitle.map(() => ({
      x: 0,
      y: 0,
      rotate: 0,
    }))
  );
  const [hideAboutMe, setHideAboutMe] = useState(true);
  const handleClick = () => {
    setHideAboutMe(false);
    ///Mobile************
    if (screenSize.dynamicWidth <= 1000) {
      const newAnimation = animation.map(() => ({
        x: Math.floor(Math.random() * (250 - -250) + -250),
        y: Math.floor(Math.random() * (-300 - -200) + -200),
        rotate: Math.floor(Math.random() * 720) - 360,
      }));
      setAnimation(newAnimation);
      console.log(animation);
      const newAnimation2 = animation2.map(() => ({
        x: Math.floor(Math.random() * (300 - -500) + -500),
        y: Math.floor(Math.random() * (350 - 200) + 100),
        rotate: Math.floor(Math.random() * 720) - 360,
      }));
      setAnimation2(newAnimation2);
    }
    ///Desktop ************************
    else {
      const newAnimation = animation.map((c, i) => ({
        x:
          i % 2 === 0
            ? Math.floor(Math.random() * (0 - -500) + -500)
            : Math.floor(Math.random() * (1000 - -500) + -500),
        y: Math.floor(Math.random() * (-400 - -150) + -150),
        rotate: Math.floor(Math.random() * 720) - 360,
      }));
      setAnimation(newAnimation);
      const newAnimation2 = animation2.map((c, i) => ({
        x:
          i % 2 === 0
            ? Math.floor(Math.random() * (0 - -500) + -500)
            : Math.floor(Math.random() * (1000 - -500) + -500),
        y: Math.floor(Math.random() * (400 - 250) + 200),
        rotate: Math.floor(Math.random() * 720) - 360,
      }));
      setAnimation2(newAnimation2);
    }
  };
  const stopClick = () => {
    setHideAboutMe(true);
    const newAnimation = animation.map(() => ({
      x: 0,
      y: 0,
      rotate: 0,
    }));
    setAnimation(newAnimation);
    const newAnimation2 = animation2.map(() => ({
      x: 0,
      y: 0,
      rotate: 0,
    }));
    setAnimation2(newAnimation2);
  };
  return (
    <div className="h-screen w-full justify-center flex flex-col items-center font-mono overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: hideAboutMe ? 0 : 1,
        }}
        transition={{
          duration: hideAboutMe ? 0 : 0.5,
        }}
        className="-z-10 bg-black bg-opacity-40 rounded-lg font-extrabold absolute lg:w-[1000px] md:w-[700px] sm:w-[600px] md:mb-32 mb-52 p-4
     md:text-lg lg:text-xl xl:text-2xl
     "
      >
        <p>
         Hey, I'm Dolev. Recent computer science student at the Open University,
          after graduate a software engineer with a passion for developing
          scalable web applications and working across the full stack. I am
          looking for a full-time position where I can continue to grow my skill set while I
          provide service to the company and its clients.
        </p>
      </motion.div>
      <motion.div className={`${hideAboutMe ? "bg-black bg-opacity-40 p-4 rounded-lg" : ""}`}>
        <div className="flex justify-center">
          {title.map((char, i) => {
            return (
              <div key={i}>
                {char === " " ? (
                  <p className="ml-6" />
                ) : (
                  <TextScale
                    char={char}
                    x={animation[i].x}
                    y={animation[i].y}
                    rotate={animation[i].rotate}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          {secondaryTitle.map((char, i) => {
            return (
              <div key={i}>
                {char === " " ? (
                  <p className="ml-6" />
                ) : (
                  <TextGrow
                    char={char}
                    x={animation2[i].x}
                    y={animation2[i].y}
                    rotate={animation2[i].rotate}
                  />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-10">
        <a href="#contactme">
          <motion.button
            whileHover={{
              scaleX: [1, 1.2, 0.8, 1.2, 1],
              scaleY: [1, 0.8, 1.2, 0.8, 1],
              opacity: 0.8,
            }}
            className="mt-5 p-2 pl-4 pr-4 bg-gradient-to-r from-blue-500 to-blue-400 font-bold rounded-md
        md:p-4 md:pl-6 md:pr-6 md:mt-10
      "
          >
            Contact me
          </motion.button>
        </a>
        {hideAboutMe ? (
          <motion.button
            whileHover={{
              scaleX: [1, 1.2, 0.8, 1.2, 1],
              scaleY: [1, 0.8, 1.2, 0.8, 1],
              opacity: 0.8,
            }}
            className="mt-5 p-2 pl-4 pr-4 bg-gradient-to-r from-blue-500 to-blue-400 font-bold rounded-md
        md:p-4 md:pl-6 md:pr-6 md:mt-10 ml-5
      "
            onClick={() => {
              handleClick();
            }}
          >
            About me
          </motion.button>
        ) : (
          <motion.button
            whileHover={{
              scaleX: [1, 1.2, 0.8, 1.2, 1],
              scaleY: [1, 0.8, 1.2, 0.8, 1],
              opacity: 0.8,
            }}
            className="mt-5 p-2 pl-4 pr-4 bg-gradient-to-r from-blue-500 to-blue-400 font-bold rounded-md
        md:p-4 md:pl-6 md:pr-6 md:mt-10 ml-5
      "
            onClick={() => {
              stopClick();
            }}
          >
            X
          </motion.button>
        )}
      </div>
    </div>
  );
}
