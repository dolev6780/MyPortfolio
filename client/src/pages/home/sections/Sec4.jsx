import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import AboutMe from "../../../components/AboutMe";
import ContactMeWindow from "../../../components/ContactMeWindow";

const ContactMeVariants = {
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },
};

export default function Sec4() {
  return (
    <div id="contactme" className="h-[90vh] flex justify-center items-center">
      <div className="bg-neutral-800 p-10 rounded-md bg-opacity-80 border">
        <h1
          className="text-4xl text-blue-500 font-bold
      md:text-6xl">
          Contact Me
        </h1>
        <div className="mt-10 xl:mt-14">
          <div>
            <input
              className="p-2 w-[300px] xl:w-[400px] xl:p-3 xl:text-lg pr-6 pl-6 m-4 bg-white border-2 border-blue-500 text-blue-500 placeholder:text-blue-500 rounded font-medium"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              className="p-2 w-[300px] xl:w-[400px] xl:p-3 xl:text-lg pr-6 pl-6 m-4 bg-white border-2 border-blue-500 text-blue-500 placeholder:text-blue-500 rounded font-medium"
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div>
            <textarea
              className="p-2 w-[300px] xl:w-[400px] xl:p-3 xl:text-lg pr-6 pl-6 m-4 bg-white border-2 border-blue-500 text-blue-500 placeholder:text-blue-500 rounded font-medium"
              cols="22"
              rows="5"
              placeholder="Tell me what we can create together."
            />
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.2 }}
            className="p-2 xl:w-[150px] xl:p-3 xl:text-lg pr-8 pl-8 m-4 bg-blue-500 border-2 border-white text-white rounded-lg font-bold">
              Send
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
