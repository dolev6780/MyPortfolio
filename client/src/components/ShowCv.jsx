import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DescriptionIcon from '@mui/icons-material/Description';
import { motion } from "framer-motion";
import cv from '../assets/cv.png';
import { useScreensize } from '../hooks/useScreenSize';
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: 'relative', // Changed to relative
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Adjusted width for better responsiveness
  maxWidth: 1000, // Max width for large screens
  p: 4,
};

export default function ShowCv() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { screenSize } = useScreensize();
  
  return (
    <div>
      {screenSize.dynamicWidth > 700 ? (
        <motion.li
          whileHover={["hover", {scale:1.2}]}
          className="mt-10 hover:text-blue-500 hover:bg-opacity-5 hover:bg-blue-300 rounded-full p-2 mb-10 flex items-center cursor-pointer"
          onClick={handleOpen}
        > 
          <DescriptionIcon fontSize="large" />
          <motion.p
            className="ml-2 flex"
            variants={{
              hover: {
                opacity: 1,
                transition: {
                  duration: 0.5,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {"CV".split("").map((char, index) => (
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
      ) : (
        <motion.li
          whileHover={{ rotate: [0, 10, 0, -10, 0, 10, 0, -10, 0] }}
          transition={{ duration: 0.4 }}
          className="mt-8 font-bold text-blue-500 text-4xl cursor-pointer"
          onClick={handleOpen}
        >
          CV
        </motion.li>
      )}
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <button
            className="absolute bottom-6 lg:bottom-20 left-1/2 transform -translate-x-1/2 lg:text-2xl"
            onClick={handleClose}
          >
            <CloseIcon color='inherit' fontSize='inherit' className='text-black '/>
          </button>
          <img src={cv} alt="CV" className="m-auto w-[400px] sm:w-[700px] md:w-[800px] lg:w-full h-auto lg:p-10"/>
        </Box>
      </Modal>
    </div>
  );
}