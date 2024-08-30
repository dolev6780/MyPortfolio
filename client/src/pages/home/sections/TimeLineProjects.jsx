import React from 'react';
import ShoppingListApp from "../../../assets/ShoppingListApp.png";
import { motion } from "framer-motion";

export default function TimeLineProjects() {
  return (
    <div className="h-screen flex items-center justify-center">
      <motion.img
        src={ShoppingListApp}
        alt="Shopping List App"
        className="w-40 h-40"
        whileHover={{
          scale: 1.3,
          transformOrigin: "bottom left",
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        initial={{ scale: 1 }}
      />
    </div>
  );
}