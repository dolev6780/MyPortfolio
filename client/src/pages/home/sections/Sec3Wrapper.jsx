import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sec3Grid from './Sec3Grid';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewCarouselOutlinedIcon from '@mui/icons-material/ViewCarouselOutlined';import Sec3Alt from './Sec3Alt';
import bijumpacademymg from "../../../assets/bijumpacademy.jpg";
import ShoppingListApp from "../../../assets/ShoppingListApp.png";
import LiatGallery from "../../../assets/liatGallery.png";
export default function Sec3Wrapper() {
  const [sec3View, setSec3View] = useState("carousel");
  const projects = [
    { title: "BI JUMP ACADEMY", img: bijumpacademymg },
    { title: "Shopping List App", img: ShoppingListApp },
    { title: "Liat Gallery", img: LiatGallery },
  ];

  const handleSec3View = (view) => {
    switch (view) {
      case "carousel":
        return <Sec3Alt projects={projects} />;
      case "grid":
        return <Sec3Grid projects={projects} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-black bg-opacity-50 w-full h-full min-h-screen m-auto py-10 mt-20 md:px-10">
      <p className="lg:text-8xl md:text-7xl sm:text-6xl text-5xl mt-10">
        Latest Works
      </p>
      <div className="relative flex justify-end px-10 py-2 gap-x-2">
        <motion.div
          className="absolute top-[0.55rem] bottom-0 w-10 h-10 bg-white rounded-lg "
          animate={{
            right: sec3View === "carousel" ? "50px" : "110px",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        <motion.button
          onClick={() => setSec3View("grid")}
          className={`p-2 z-10 ${
            sec3View === "grid" ? "text-blue-500" : "text-white"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <GridViewIcon />
        </motion.button>

        <motion.button
          onClick={() => setSec3View("carousel")}
          className={`p-2 z-10 ${
            sec3View === "carousel" ? "text-blue-500" : "text-white"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <ViewCarouselOutlinedIcon />
        </motion.button>
      </div>
      {handleSec3View(sec3View)}
    </div>
  );
}