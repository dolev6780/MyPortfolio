import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Sec3Alt({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) =>
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, projects.length, isPaused]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="overflow-hidden md:mt-32 mt-20">
      <div className="p-10">
        <div className="relative max-w-lg mx-auto">
          {/* Image Slider */}
          <div className="relative w-full h-48 md:h-80">
            <div className="relative">
              {projects.map((image, index) => {
                const slideIndex = index - activeIndex;
                const translateX =
                  slideIndex === 0 ? 0 : slideIndex === 1 ? 100 : 200;
                const rotateY = slideIndex === 0 ? 0 : -25;
                return (
                  <motion.div
                    key={index}
                    className="absolute"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: slideIndex > 1 || slideIndex < 0 ? 0 : 1,
                      transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${
                        slideIndex === 0 ? 1 : 0.8
                      })`,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ zIndex: slideIndex === 0 ? 10 : 5 }}
                  >
                    <motion.div
                      className="relative"
                      onMouseEnter={() => {
                        setHoverIndex(index);
                        setIsPaused(true);
                      }}
                      onMouseLeave={() => {
                        setHoverIndex(null);
                        setIsPaused(false);
                      }}
                    >
                      <motion.img
                        className="w-64 h-48 md:w-80 md:h-64 lg:w-[32rem] lg:h-72 rounded shadow-lg shadow-neutral-800 cursor-pointer"
                        style={{
                          backgroundImage: `url(${image.img})`,
                          backgroundSize: "120%",
                          backgroundPosition: "center",
                        }}
                        whileHover={
                          index === activeIndex
                            ? { backgroundSize: "105%", scale: 1.2 }
                            : null
                        }
                        transition={{ duration: 0.6 }}
                        onClick={() => goToSlide(index)}
                      />
                      <motion.div
                        className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white flex items-center justify-center transition-opacity duration-400 ${
                          hoverIndex === index ? 'opacity-100' : 'opacity-0'
                        } p-4`}
                      >
                        <p className="text-center text-lg">{image.details}</p>
                        <a className="absolute bottom-2 right-2 w-14 h-14 flex justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" href={image.link} target="_blank" rel="noreferrer">Visit</a>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Number */}
          {projects.map((_, index) => {
            const slideIndex = index - activeIndex;
            const translateX =
              slideIndex === 0 ? 0 : slideIndex === 1 ? 100 : 200;
            const rotateY = slideIndex === 0 ? 0 : -25;
            return (
              <motion.div
                key={index}
                className="absolute -top-10 -left-5"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: slideIndex > 1 || slideIndex < 0 ? 0 : 1,
                  transform: `translateX(${translateX}%) rotateY(${rotateY}deg) scale(${
                    slideIndex === 0 ? 1 : 0
                  })`,
                }}
                transition={{ duration: 0.4 }}
              >
                <p className={`text-5xl text-neutral-500 font-bold text1 ${
                  hoverIndex === index ? 'opacity-0' : 'opacity-100'
                }`}>
                  0{index + 1}
                </p>
              </motion.div>
            );
          })}

          {/* Card Content */}
          {projects.map((title, index) => {
            const slideIndex = index - activeIndex;
            return (
              <motion.div
                key={index}
                className={`absolute sm:top-20 sm:-left-20 -left-10 top-10 transform -translate-x-1/2 sm:w-48 w-32 hoverIndex === index ? 'opacity-0' : 'opacity-100'
                }`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: slideIndex === 0 ? 1 : 0,
                  transform: `translateY(${slideIndex === 0 ? 0 : -50}px)`,
                }}
                transition={{ duration: 0.4 }}
                style={{ zIndex: slideIndex === 0 ? 10 : 5 }}
              >
                <h2 className={`sm:text-5xl text-2xl font-bold text1 ${hoverIndex === index ? "opacity-0" : "opacity-100"}`}>
                  {title.title}
                </h2>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="">
        <div className="">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-6 h-1 rounded mx-1 ${
                index === activeIndex ? "bg-blue-500" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}