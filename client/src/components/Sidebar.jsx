import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useScreensize } from "../hooks/useScreenSize";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
const menuVariant = {
  initial: {
    display: "none",
    opacity: 0,
  },
  animate: {
    display: "grid",
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

export default function Sidebar() {
  const { screenSize } = useScreensize();
  const controls = useAnimation();
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) {
      controls.start("animate");
    }
    else{
      controls.start("initial");
    }
  }, [controls, open]);
  // const openMunu = () => {
  //   controls.start("animate");
  // };
  // const closeMunu = () => {
  //   controls.start("initial");
  // };

  return (
    <div>
      {screenSize.dynamicWidth > 700 ? (
        <div className="flex ml-3 mt-10 fixed">
          <ul>
          <a href="#sec1">
              <motion.li
                whileHover={{ scale: 1.2 }}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2"
              >
                <HomeIcon fontSize="large" />
              </motion.li>
              </a>
            <a href="#contactme">
              <motion.li
                whileHover={{ scale: 1.2 }}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2"
              >
                <MailIcon fontSize="large" />
              </motion.li>
            </a>
            <Link
              to={"https://www.linkedin.com/in/dolev-cohen-736763190/"}
              target="_blank"
            >
              <motion.li
                whileHover={{ scale: 1.2 }}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2"
              >
                <LinkedInIcon fontSize="large" />
              </motion.li>
            </Link>
            <Link
              to={"https://github.com/dolev6780?tab=repositories"}
              target="_blank"
            >
              <motion.li
                whileHover={{ scale: 1.2 }}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2"
              >
                <GitHubIcon fontSize="large" />
              </motion.li>
            </Link>
            <Link
              to={"https://wa.me/+972506378511"}
              target="_blank"
            >
              <motion.li
                whileHover={{ scale: 1.2 }}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2"
              >
                <WhatsAppIcon fontSize="large" />
              </motion.li>
            </Link>
          </ul>
        </div>
      ) : (
        <div>
          <div
            onClick={()=>setOpen(true)}
            className="fixed p-4 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 cursor-pointer"
          >
            <MenuIcon fontSize="large" />
          </div>
          <motion.div
            variants={menuVariant}
            initial="initial"
            animate={controls}
            className="fixed bg-neutral-800 h-screen w-full z-50"
          >
            <ul>
              <div className="flex justify-end ">
                <motion.button whileHover={{scale:1.2}} onClick={()=>setOpen(false)} className="w-10 h-10 pr-12 pt-4 hover:text-blue-500">
                  <CloseIcon fontSize="large" />
                </motion.button>
              </div>
              <div className="mt-[50%] ">
               <a href="#sec1">
                  <motion.li
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl "
                  >
                    Home
                  </motion.li>
                <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5"/>
                </a>
              
                <a href="#contactme">
                  <motion.li
                  onClick={()=>setOpen(false)}
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl"
                  >
                    Contact Me
                  </motion.li>
                  </a>
                <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5 "/>
                <Link
                 to={"https://www.linkedin.com/in/dolev-cohen-736763190/"}
                 target="_blank"
                 >
                  <motion.li
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl"
                  >
                    LinkedIn
                  </motion.li>
                </Link>
                <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5 "/>
                <Link
                 to={"https://github.com/dolev6780?tab=repositories"}
                 target="_blank"
                 >
                  <motion.li
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl"
                  >
                    Github
                  </motion.li>
                </Link>
                <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5 "/>
                <Link
                 to={"https://wa.me/+972506378511"}
                 target="_blank"
                >
                  <motion.li
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl"
                  >
                    Whatsapp
                  </motion.li>
                </Link>
              </div>
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
}
