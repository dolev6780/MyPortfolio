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
  const AboutMe =
    "Hey, I'm Dolev. As a Freelance Mobile and Web Developer, I am passionate about turning ideas into functional, scalable, and user-friendly applications. With expertise in full-stack development, I specialize in creating responsive websites and mobile apps that provide seamless experiences across devices.";
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
        className=" bg-black bg-opacity-50 md:rounded-lg font-extrabold absolute lg:w-[1000px] md:w-[700px] sm:w-[600px] md:mb-32 mb-42 p-4
     md:text-lg lg:text-xl xl:text-2xl
     "
      >
        <p>{AboutMe}</p>
        <motion.button
          whileHover={{ scale: 1.2 }}
          className={`mt-5 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-400 rounded-md absolute flex right-0
        ${hideAboutMe ? "hidden" : ""}
      `}
          onClick={() => {
            stopClick();
          }}
        >
          Close
        </motion.button>
      </motion.div>
      <motion.div
        className={`${
          hideAboutMe
            ? "bg-black bg-opacity-50 p-4 md:rounded-lg w-full md:w-auto"
            : ""
        }`}
      >
        <div className="flex justify-center">
          {title.map((char, i) => {
            return (
              <div key={i}>
                {char === " " ? (
                  <p className="ml-2" />
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
                  <p className="ml-2 " />
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

      <div className="mt-10 z-10" hidden={!hideAboutMe}>
        <a href="#contactme">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-5 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-400 font-bold rounded-md
       md:mt-10
      "
          >
            Contact me
          </motion.button>
        </a>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-5 py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-400 font-bold rounded-md
        md:mt-10 ml-5
      "
          onClick={() => {
            handleClick();
          }}
        >
          About me
        </motion.button>
      </div>
    </div>
  );
}
