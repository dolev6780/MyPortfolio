import React, { useState } from "react";
import bijumpacademymg from "../../../assets/bijumpacademy.jpg";
import ShoppingListApp from "../../../assets/ShoppingListApp.png";
import "../../../App.css";
import { Link } from 'react-router-dom'
const cards = [
  {
    header: "B.I JUMP ACADEMY",
    image: bijumpacademymg,
    text: "Professional jump rope course with over 13 hours of viewing. developed with react-js and node-js",
    githubcode: "https://github.com/dolev6780/Bijumpacademy"
  },
  // {
  //   header: "OUR LEAGUE",
  //   image: ourleaguehome,
  //   text: "Creating tournaments, leagues and competitions of any sport like soccer and tennis and even the most loved games like FIFA and Mario Kart. developed with react-js and node-js",
  //   githubcode: "https://github.com/dolev6780/ourLeague"

  // },
  {
    header: "ShoppingList",
    image: ShoppingListApp,
    text: "Create lists for shopping and share it with others. developed with flutter",
    githubcode: "https://github.com/dolev6780/shoppingListFlutter"

  },
];

export default function 
Sec3() {
  const [active, setActive] = useState(0);
  return (
    <div className='"h-full w-full mt-20 p-4 md:p-20'>
      <h1
        className="text-4xl text-blue-500 font-bold
      md:text-6xl
      lg:text-8xl
      "
      >
        Latest Works
      </h1>
      <section className="flex gap-[10px] justify-center mt-20">
        {cards.map((card, index) => {
          return (
            <article
              key={index}
              className={`relative overflow-hidden cursor-pointer w-16 h-[400px] sm:h-[600px] xl:h-[700px] rounded-3xl md:rounded-[36px] flex items-center opacity-90 transition-all duration-500 ${
                active === index ? "w-[300%] md:w-[800px] opacity-100" : ""
              }`}
              onClick={() => {
                setActive(index);
              }}
            >
              <img
                className="absolute z-0 top-1/2 left-1/2 h-full object-cover"
                src={card.image}
                alt={card.header}
              />
              <div
                className={`p-20 z-[1] opacity-0 flex items-center justify-center m-auto transition-all duration-500 ${
                  active === index ? "opacity-100" : ""
                }`}
              >
                <div className="bg-black px-4 py-2 rounded-lg bg-opacity-50 font-serif">
                  <h2 className="text-lg md:text-2xl font-bold text-blue-500">
                    {card.header}
                  </h2>
                  <p className="text-sm md:text-lg font-semibold mt-2">
                    {card.text}
                  </p>
                  <Link to={card.githubcode}><button className="text-sm p-2 mt-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-400">Github code</button></Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <div className="flex justify-center mt-5">
      {cards.map((dot,i)=>{
          return <div key={i} className={`mr-2 w-4 h-4 md:w-5 md:h-5 border-[3px] rounded-full cursor-pointer
          ${active === i ? "bg-neutral-800" : ""}
          `}
            onClick={()=>{
              setActive(i)
            }}
          />
      })}
      </div>
    </div>
  );
}
