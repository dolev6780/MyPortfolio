import React from "react";
import { useScreensize } from "../../../hooks/useScreenSize";
import { motion } from "framer-motion";
import js from "../../../assets/logos/js.png";
import java from "../../../assets/logos/java.png";
import dart from "../../../assets/logos/dart.png";
import python from "../../../assets/logos/python.png";
import react from "../../../assets/logos/react.png";
import nodejs from "../../../assets/logos/nodejs.jpeg";
import css from "../../../assets/logos/css.jpeg";
import tailwind from "../../../assets/logos/tailwind.jpeg";
import html from "../../../assets/logos/html.png";
import reactnative from "../../../assets/logos/reactnative.png";
import flutter from "../../../assets/logos/flutter.jpeg";
import mui from "../../../assets/logos/mui.png";
import ExpWindow from "../../../components/ExpWindow";
import WebSkillsWindow from "../../../components/WebSkillsWindow";
import MobileSkillsWindow from "../../../components/MobileSkillsWindow";
import WindowsContent from "../../../components/WindowsContent";
export default function Sec2() {
  const { screenSize } = useScreensize();
  const objListExp = [
    {
      li: "JavaScript",
      logo: js,
      delay: 1.5,
    },
    {
      li: "Java",
      logo: java,
      delay: 2,
    },
    {
      li: "Dart",
      logo: dart,
      delay: 2.5,
    },
    {
      li: "Python",
      logo: python,
      delay: 3,
    },
  ];
  const objListWebSkills = [
    {
      li: "React js",
      logo: react,
      delay: 3.5,
    },
    {
      li: "Node js",
      logo: nodejs,
      delay: 4,
    },
    {
      li: "CSS",
      logo: css,
      delay: 4.5,
    },
    {
      li: "Tailwind CSS",
      logo: tailwind,
      delay: 5,
    },
    {
      li: "HTML",
      logo: html,
      delay: 5.5,
    },
  ];
  const objListMobilekills = [
    {
      li: "React Native",
      logo: reactnative,
      delay: 6,
    },
    {
      li: "Node js",
      logo: nodejs,
      delay: 6.5,
    },
    {
      li: "Flutter",
      logo: flutter,
      delay: 7,
    },
    {
      li: "Material UI",
      logo: mui,
      delay: 7.5,
    },
  ];


  return (
    <div className="h-[120vh] lg:h-screen w-full">
      <h1
        className="text-4xl text-blue-500 font-bold relative top-40
        md:text-6xl
          lg:text-8xl
        "
      >
        My Expertise
      </h1>
      <div className="2xl:flex justify-center mt-48 2xl:mt-96 grid">
        <motion.div
          whileHover={{
            scaleX: [1, 1.2, 0.8, 1.2, 1],
            scaleY: [1, 0.8, 1.2, 0.8, 1],
          }}
          className="flex justify-center items-center mt-10 2xl:mr-20 cursor-none"
        >
          <div style={{ backgroundColor: "rgb(42, 42, 42)" }}>
            <ExpWindow
              width={
                screenSize.dynamicWidth > 2150
                  ? 638
                  : screenSize.dynamicWidth > 1024
                  ? 450
                  : 350
              }
              height={
                screenSize.dynamicWidth > 2150
                  ? 381
                  : screenSize.dynamicWidth > 1024
                  ? 270
                  : 210
              }
            />
          </div>
          <div className="absolute w-[300px] ">
            <WindowsContent
              objList={objListExp}
              iconSize={screenSize.dynamicWidth > 2150 ? 35 : 20}
            />
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            scaleX: [1, 1.2, 0.8, 1.2, 1],
            scaleY: [1, 0.8, 1.2, 0.8, 1],
          }}
          className="flex justify-center items-center mt-10 cursor-none"
        >
          <div style={{ backgroundColor: "rgb(42, 42, 42)" }}>
            <WebSkillsWindow
              width={
                screenSize.dynamicWidth > 2150
                  ? 638
                  : screenSize.dynamicWidth > 1024
                  ? 450
                  : 350
              }
              height={
                screenSize.dynamicWidth > 2150
                  ? 381
                  : screenSize.dynamicWidth > 1024
                  ? 270
                  : 210
              }
            />
          </div>
          <div className="absolute w-[300px] 3xl:mt-10">
            <WindowsContent
              objList={objListWebSkills}
              iconSize={screenSize.dynamicWidth > 2150 ? 35 : 20}
            />
          </div>
        </motion.div>
        <motion.div
          whileHover={{
            scaleX: [1, 1.2, 0.8, 1.2, 1],
            scaleY: [1, 0.8, 1.2, 0.8, 1],
          }}
          className="flex justify-center items-center mt-10 2xl:ml-20 cursor-none"
        >
          <div style={{ backgroundColor: "rgb(42, 42, 42)" }}>
            <MobileSkillsWindow
              width={
                screenSize.dynamicWidth > 2150
                  ? 638
                  : screenSize.dynamicWidth > 1024
                  ? 450
                  : 350
              }
              height={
                screenSize.dynamicWidth > 2150
                  ? 381
                  : screenSize.dynamicWidth > 1024
                  ? 270
                  : 210
              }
            />
          </div>
          <div className="absolute w-[300px]">
            <WindowsContent
              objList={objListMobilekills}
              iconSize={screenSize.dynamicWidth > 2150 ? 35 : 20}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
