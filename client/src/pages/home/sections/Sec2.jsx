import React from "react";
import CodeWindow from '../../../components/CodeWindow'
import DBSkills from "../../../components/DBSkills";
import DBSkillsWindow from "../../../components/DBSkillsWindow";
import ExperienceWindow from "../../../components/ExperienceWindow";
import MobileSkillWindow from "../../../components/MobileSkillWindows";
import SkillWindow from "../../../components/SkillWindow";
export default function Sec2() {
  return (
    <div className="h-screen">
      <div>
        <h1 className="text-9xl font-bold">My Expertise</h1>
      </div>
      <div className="flex justify-center mt-60">
     <div className="flex justify-center mt-10 mr-10">
        <CodeWindow/>
        <div className="absolute mt-5">
        <ExperienceWindow/>
        </div>
     </div>
      <div className="flex justify-center mt-10 mr-10">
        <CodeWindow/>
        <div className="absolute mt-5">
        <SkillWindow/>
        </div>
     </div>
     <div className="flex justify-center mt-10">
        <CodeWindow/>
        <div className="absolute mt-5">
        <MobileSkillWindow/>
        </div>
     </div> 
     </div>
     <div className="flex justify-center mt-32">
      <DBSkillsWindow/>
      <div className="absolute mt-5">
        <DBSkills/>
      </div>
      </div>
    </div>
  );
}
