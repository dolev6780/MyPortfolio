import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import ContactMeWindow from './ContactMeWindow';
const ContactMeVariants = {
    initial: {
      opacity: 1,
    },
  
    animate: {
      opacity: 1,
    },
  };
  
export default function ContactMe({controls, setSignal, signal}) {
    const showContactMe = () => {
      controls.start("animate");
      setSignal(true);
    };
    const submit = () => {
      console.log("submit");
    };
  
  return (
    <motion.div
    variants={ContactMeVariants}
    initial="initial"
    animate={controls}
    className="mt-[300px] items-center flex justify-center"
  >
    <ContactMeWindow signal={signal} />
    <div className="absolute">
        <div className="grid">
          <h1 className="text-blue-500 text-9xl font-bold">Contact Me</h1>
          <div className="grid mt-20 p-10">
          <input
            className="mt-10 p-3 pr-6 pl-6 bg-inherit border-2 rounded-md "
            type="text"
            placeholder="Name"
          />
          <input
            className="mt-5 p-3 pr-6 pl-6 bg-inherit border-2 rounded-md "
            type="text"
            placeholder="Email"
          />
          <textarea
            className="bg-inherit border-2 rounded-md mt-5 p-3 pr-6 pl-6"
            name=""
            id=""
            cols="20"
            rows="5"
            placeholder="Put your message here"
          ></textarea>
          </div>
        </div>
    </div>
  </motion.div> 
  )
}
