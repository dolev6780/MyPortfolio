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
  const [signal, setSignal] = useState(false);
  const controls = useAnimation();
  const showContactMe = () => {
    controls.start("animate");
    setSignal(true);
  };
  const submit = () => {
    console.log("submit");
  };

  return (
   <div className="">
    <h1 className="3xl:text-3xl">sec4</h1>
   </div>
  );
}
{/* <div className="h-full bottom-40 relative grid grid-flow-col grid-cols-2 gap-3">
<div className="col-span-1 order-last">
  <motion.div
    variants={ContactMeVariants}
    initial="initial"
    animate={controls}
    className="mt-[300px] p-10 pl-96 text-left"
  >
    <h1 className="text-7xl text-blue-500 font-bold">Let's talk</h1>
    <p className="text-xl mt-2">
      Share with me your idea for a mobile or web application and let's make it happned.
    </p>
    <form className="grid w-[500px] mt-10">
      <input className="bg-inherit border-2 mt-4 p-4" type="text" placeholder="Name"/>
      <input className="bg-inherit border-2 mt-4 p-4" type="text" placeholder="Email"/>
      <textarea className="bg-inherit border-2 mt-4 p-4" name="" id="" cols="30" rows="10" placeholder="Put your message here!"></textarea>
    </form>
  </motion.div>
</div>

<div className="col-span-1">
  <AboutMe />
  <div className="pl-20">
    <motion.button
      initial={{ y: 0 }}
      animate={signal ? { x: 1925, y:200 } : { x: 0, y: 0}}
      transition={{ duration: 1}}
      className="flex p-4 border-2 rounded-xl pr-6 pl-6 font-bold hover:text-blue-500"
      onClick={signal ? submit : showContactMe}
    >
      {signal ? "Send message" : "Contact me"}
    </motion.button>
  </div>
</div>
</div> */}