import React, { useState } from "react";
import bijumpacademy from "../../../assets/bijumpacademy.jpg";
export default function Sec3() {
  const projects = [
    {
      Pname: "BI JUMP ACADEMY",
      Pdetails: "Online course for jump rope.",
      Pimg1: bijumpacademy,
    },
    {
      Pname: "BI JUMP ACADEMY",
      Pdetails: "Online course for jump rope.",
      Pimg1: bijumpacademy,
    },
    {
      Pname: "BI JUMP ACADEMY",
      Pdetails: "Online course for jump rope.",
      Pimg1: bijumpacademy,
    },
    {
      Pname: "BI JUMP ACADEMY",
      Pdetails: "Online course for jump rope.",
      Pimg1: bijumpacademy,
    },
  ];
  return (
    <div className="h-[200vh] w-full">
      <h1
        className="text-4xl text-blue-500 font-bold
      sm:text-7xl
      lg:text-8xl
      "
      >
        Latest Works
      </h1>
      <div className="mt-10 
      md:grid md:grid-flow-row md:grid-cols-2
      
      ">
        {projects.map((project, i) => {
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
        })}
      </div>
    </div>
  );
}
