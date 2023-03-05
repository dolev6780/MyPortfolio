import React, {useState} from "react";
import bijumpacademy from '../../../assets/bijumpacademy.jpg'
export default function Sec3() {
  const [project, setProjects] = useState([{
    Pname:"BI JUMP ACADEMY",
    Pdetails:"Online course for jump rope.",
    Pimg1:bijumpacademy,
  },{
    Pname:"BI JUMP ACADEMY",
    Pdetails:"Online course for jump rope.",
    Pimg1:bijumpacademy,
  },{
    Pname:"BI JUMP ACADEMY",
    Pdetails:"Online course for jump rope.",
    Pimg1:bijumpacademy,
  },{
    Pname:"BI JUMP ACADEMY",
    Pdetails:"Online course for jump rope.",
    Pimg1:bijumpacademy,
  },{
    Pname:"BI JUMP ACADEMY",
    Pdetails:"Online course for jump rope.",
    Pimg1:bijumpacademy,
  },{
    Pname:"BI JUMP ACADEMY",
    Pdetails:"Online course for jump rope.",
    Pimg1:bijumpacademy,
  }])
  return (
    <div className="h-screen w-full">
      <h1 className="text-3xl text-blue-500 font-bold
      sm:text-8xl
      ">Some of my works
      </h1>
      <div className="p-10
      md:p-20 md:mt-10 md:grid md:grid-flow-col md:grid-cols-3 md:grid-rows-2 md:gap-10"
      >
        {project.map((project, i)=>{
          return  <div key={i} className="rounded-md mt-10 bg-black flex items-center cursor-pointer">
          <div className="absolute p-4 z-10">
          <h1 className="text-xl md:text-7xl font-bold text-blue-500">{project.Pname}</h1>
          <p className="text-sm md:text-3xl absolute ml-1 mt-2">{project.Pdetails}</p>
          </div>
          <img className="rounded-md hover:opacity-50" src={project.Pimg1} alt="" />
        </div>
        })}
       
      </div>
    </div>
  );
}
