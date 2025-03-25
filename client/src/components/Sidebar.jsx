import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useScreensize } from "../hooks/useScreenSize";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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
    } else {
      controls.start("initial");
    }
  }, [controls, open]);

  return (
    <div className="font-mono text-gray-800">
      <div className="flex ml-3 mt-10 fixed z-[100]">
        <ul>
          <a href="#contactme">
            <motion.li
              whileHover={["hover", { scale: 1.2 }]}
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
              whileHover={["hover", { scale: 1.2 }]}
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
              whileHover={["hover", { scale: 1.2 }]}
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
              whileHover={["hover", { scale: 1.2 }]}
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
          <ShowCv />
        </ul>
      </div>
    </div>
  );
}
