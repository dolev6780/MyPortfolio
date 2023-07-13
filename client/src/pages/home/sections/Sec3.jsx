import React, {useState} from 'react'
import img from '../../../assets/bijumpacademy.jpg';
import img1 from '../../../assets/img1.jpg';
import '../../../App.css'
const cards = [
    {
        header: "Bijump1",
        image: img,
        text:"Bijump description"
    },
    {
        header: "Bijump2",
        image: img1,
        text:"Bijump description"
    },
    {
        header: "Bijump3",
        image: img,
        text:"Bijump description"
    },
    {
        header: "Bijump4",
        image: img,
        text:"Bijump description"
    },
]

export default function Sec3() {
    const [active, setActive] = useState(0);
  return (
    <div className='"h-full w-full mt-20 p-10'>
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
              className={`relative overflow-hidden cursor-pointer w-10 md:w-20 h-[400px] sm:h-[600px] xl:h-[800px] rounded-3xl md:rounded-[36px] flex items-center opacity-90 transition-all duration-500 ${
                active === index ? "w-[300%] md:w-[800px] opacity-100" : ""
              }`}
              onClick={() => {
                setActive(index);
              }}
            >
              <img
                className="absolute z-0 top-1/2 left-1/2 h-full"
                src={card.image}
                alt={card.header}
              />
              <div
                className={`z-[1] opacity-0 flex items-center m-auto transition-all duration-500 ${
                  active === index ? "opacity-100" : ""
                }`}
              >
                <div className="bg-black px-4 py-2 rounded-lg bg-opacity-50">
                  <h2 className="text-xl md:text-2xl font-bold text-blue-500">
                    {card.header}
                  </h2>
                  <p className="text-sm md:text-lg font-semibold mt-2">{card.text}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
