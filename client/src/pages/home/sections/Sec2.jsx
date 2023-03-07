import React, { useState } from "react";
import { useScreensize } from "../../../hooks/useScreenSize";
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
    <div className="h-[160vh] xl:h-screen bg-white">
        <h1
          className="text-4xl text-blue-500 font-bold relative top-40
        sm:text-8xl
        "
        >
          My Expertise
        </h1>
      <div className="flex justify-center mt-96">
        <div className="flex mr-20">
          <ExpWindow />
          <div className="absolute ml-52 mt-28">
            <WindowsContent objList={objListExp} />
          </div>
        </div>
        <div className="flex">
          <WebSkillsWindow />
          <div className="absolute ml-52 mt-28">
            <WindowsContent objList={objListWebSkills} />
          </div>
        </div>
        <div className="flex ml-20">
          <MobileSkillsWindow />
          <div className="absolute ml-52 mt-28">
            <WindowsContent objList={objListMobilekills} />
          </div>
        </div>
      </div>
    </div>
  );
}
