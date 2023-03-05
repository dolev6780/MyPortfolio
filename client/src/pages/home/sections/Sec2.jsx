import React, { useState } from "react";
import { useScreensize } from '../../../hooks/useScreenSize';
import CodeWindow from '../../../components/CodeWindow'
import DBSkills from "../../../components/DBSkills";
import DBSkillsWindow from "../../../components/DBSkillsWindow";
import ExperienceWindow from "../../../components/ExperienceWindow";
import MobileSkillWindow from "../../../components/MobileSkillWindows";
import SkillWindow from "../../../components/SkillWindow";
import MobileCodeWindow from '../../../components/MobileCodeWindow'
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
export default function Sec2() {
  const {screenSize} = useScreensize();
  const objList = [{
    title:"Experienced in both functional and OOP with:",
    list:[{
      li:"JavaScript",
      logo:js,
      delay:0.5
    },
    {
      li:"Java",
      logo:java,
      delay:1
    },
    {
      li:"Dart",
      logo:dart,
      delay:1.5
    },
    {
      li:"Python",
      logo:python,
      delay:2
    },
   ]
  },
  {
    title:"Skilled in developing web applications with:",
    list:[{
      li:"React js",
      logo:react,
      delay:2.5
    },
    {
      li:"Node js",
      logo:nodejs,
      delay:3
    },
    {
      li:"CSS",
      logo:css,
      delay:3.5
    },
    {
      li:"Tailwind CSS",
      logo:tailwind,
      delay:4
    },
    {
      li:"HTML",
      logo:html,
      delay:4.5
    },
   ]
  },
  {
    title:"Skilled in developing Mobile applications with:",
    list:[{
      li:"React Native",
      logo:reactnative,
      delay:5
    },
    {
      li:"Node js",
      logo:nodejs,
      delay:5.5
    },
    {
      li:"Flutter",
      logo:flutter,
      delay:6
    },
    {
      li:"Material UI",
      logo:mui,
      delay:6.5
    },
   ]
  },
]
  return (
    <div className="h-[160vh] xl:h-screen">
      <div>
        <h1 className="text-3xl text-blue-500 font-bold
        sm:text-8xl
        ">My Expertise</h1>
      </div>
      {screenSize.dynamicWidth > 500 ? ( <div>
        <div className="xl:flex justify-center sm:mt-32">
        {objList.map((list,i)=>{
            return <div key={i} className="flex justify-center md:mt-10 md:ml-10">
            <CodeWindow width={566}/>
            <div className="absolute mt-5">
            <ExperienceWindow title={list.title} list={list.list}/>
            </div>
         </div>
          })}
     </div>
     <div className="flex justify-center mt-32">
      <DBSkillsWindow width={255}/>
      <div className="absolute mt-5">
        <DBSkills/>
      </div>
      </div>
      </div>) : ( <div>
        <div className="justify-center">
          {objList.map((list,i)=>{
            return <div key={i} className="flex justify-center">
           <CodeWindow width={335}/>
            <div className="absolute mt-5">
            <ExperienceWindow title={list.title} list={list.list}/>
            </div>
         </div>
          })}
     </div> 
     <div className="flex justify-center">
      <DBSkillsWindow width={200}/>
      <div className="absolute mt-5">
        <DBSkills/>
      </div>
      </div>
      </div>)}
    </div>
  );
}
