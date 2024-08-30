import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useScreensize } from "../hooks/useScreenSize";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShowCv from "./ShowCv";


const menuVariant = {
  initial: {
    display: "none",
    opacity: 0,
  },
  animate: {
    display: "grid",
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};



export default function Sidebar() {
  const { screenSize } = useScreensize();
  const controls = useAnimation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      controls.start("animate");
    }
    else{
      controls.start("initial");
    }
  }, [controls, open]);
  
  return (
    <div className="font-mono">
      {screenSize.dynamicWidth > 700 ? (
        <div className="flex ml-3 mt-10 fixed z-[100]">
          <ul>
            <a href="#sec1">
              <motion.li
                whileHover={["hover", {scale:1.2}]}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2 flex items-center"
              >
                <HomeIcon fontSize="large" />
                <motion.p
                  className="ml-2 flex"
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {"Home".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.li>
            </a>
            <a href="#contactme">
              <motion.li
                whileHover={["hover", {scale:1.2}]}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2 flex items-center"
              >
                <MailIcon fontSize="large" />
                <motion.p
                  className="ml-2 flex"
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {"Contact Me".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.li>
            </a>
            <Link
              to={"https://www.linkedin.com/in/dolev-cohen-736763190/"}
              target="_blank"
            >
              <motion.li
               whileHover={["hover", {scale:1.2}]}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2 flex items-center"
              >
                <LinkedInIcon fontSize="large" />
                <motion.p
                  className="ml-2 flex"
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {"LinkedIn".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.li>
            </Link>
            <Link
              to={"https://github.com/dolev6780?tab=repositories"}
              target="_blank"
            >
              <motion.li
                  whileHover={["hover", {scale:1.2}]}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2 flex items-center"
              >
                <GitHubIcon fontSize="large" />
                <motion.p
                  className="ml-2 flex"
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {"GitHub".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.li>
            </Link>
            <Link to={"https://wa.me/+972506378511"} target="_blank">
              <motion.li
                  whileHover={["hover", {scale:1.2}]}
                className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2 mb-10 flex items-center"
              >
                <WhatsAppIcon fontSize="large" />
                <motion.p
                  className="ml-2 flex"
                  variants={{
                    hover: {
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        staggerChildren: 0.05,
                      },
                    },
                  }}
                >
                  {"WhatsApp".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.li>
            </Link>
              <ShowCv/>
          </ul>
        </div>
      ) : (
        <div>
          <div
            onClick={() => setOpen(!open)}
            className={`fixed p-4 cursor-pointer ${open ? "z-[100]" : ""}`}
          >
            {open ? (
              <CloseIcon fontSize="large" />
            ) : (
              <MenuIcon fontSize="large" />
            )}
          </div>
          <motion.div
            variants={menuVariant}
            initial="initial"
            animate={controls}
            className="fixed bg-neutral-800 h-screen w-full z-50"
          >
            <ul>
              <div className="mt-[50%] ">
                <a href="#sec1">
                  <motion.li
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl "
                  >
                    Home
                  </motion.li>
                  <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5" />
                </a>

                <a href="#contactme">
                  <motion.li
                    onClick={() => setOpen(false)}
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl"
                  >
                    Contact Me
                  </motion.li>
                </a>
                <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5 " />
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
                <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5 " />
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
                <div className="w-16 h-0.5 rounded-lg bg-neutral-300 m-auto relative top-5 " />
                <Link to={"https://wa.me/+972506378511"} target="_blank">
                  <motion.li
                    whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-bold text-blue-500 text-4xl"
                  >
                    Whatsapp
                  </motion.li>
                </Link>
              </div>
              <ShowCv/>
            </ul>
          </motion.div>
        </div>
      )}
    </div>
  );
}
