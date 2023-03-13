import React, { useState } from "react";
import { motion } from "framer-motion";
import css from "../assets/logos/css.jpeg";
import firebase from "../assets/logos/firebase.jpeg";
import flutter from "../assets/logos/flutter.jpeg";
import html from "../assets/logos/html.png";
import js from "../assets/logos/js.png";
import mongodb from "../assets/logos/mongodb.jpeg";
import nodejs from "../assets/logos/nodejs.jpeg";
import react from "../assets/logos/react.png";
import tailwind from "../assets/logos/tailwind.jpeg";
import { useScreensize } from "../hooks/useScreenSize";
const logos = [
  firebase,
  css,
  flutter,
  html,
  js,
  mongodb,
  nodejs,
  firebase,
  css,
  flutter,
  html,
  react,
  tailwind,
];

const imgVariants = {
  initial: {
    x: 0,
    y: 0,
    rotate: 0,
  },
};
export default function Background() {
  const { screenSize } = useScreensize();
  return (
    <div className="absolute -z-10">
      {logos.map((logo, i) => {
        return (
          <div key={i}>
            <motion.img
              variants={imgVariants}
              initial="initial"
              animate={{
                x: [
                  0,
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * -100),
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * -100),
                  Math.floor(Math.random() * 100),
                  0,
                ],
                y: [
                  0,
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * -100),
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * 100),
                  Math.floor(Math.random() * -100),
                  Math.floor(Math.random() * 100),
                  0,
                ],
                
              }}
              transition={{ duration: 60, repeat: Infinity }}
              style={{
                marginLeft: Math.floor(Math.random() * screenSize.dynamicWidth),
                marginTop: Math.floor(Math.random() * screenSize.dynamicHeight),
              }}
              className="mt-5 fixed"
              width={75}
              src={logo}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}
