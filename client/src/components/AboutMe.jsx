import React from "react";
import { motion } from "framer-motion";
import profilepic from "../assets/profilepic.jpeg";
import Sidebar from "./Sidebar";
export default function AboutMe({windowSize }) {
  // Bio content
  const aboutMeText =
    "Hey, I'm Dolev. As a Freelance Mobile and Web Developer, I am passionate about turning ideas into functional, scalable, and user-friendly applications. With expertise in full-stack development, I specialize in creating responsive websites and mobile apps that provide seamless experiences across devices.";

  // Skills list
  const skills = [
    { name: "React", level: 90 },
    { name: "UI/UX Design", level: 85 },
    { name: "JavaScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Flutter", level: 80 },
    { name: "React Native", level: 75 },
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: { duration: 1, ease: "easeInOut" },
    }),
  };

  return (
    <div>
      <div className={`${windowSize.width < 1100 ? "hidden" : ""}`}>
      <Sidebar />
      </div>
      <motion.div
        className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col md:flex-row items-center mb-8 gap-6"
          variants={itemVariants}
        >
          <motion.div
            className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={profilepic}
              alt="Dolev"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="text-center md:text-left">
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-2"
              variants={itemVariants}
            >
              Dolev <span className="text-blue-500">Cohen</span>
            </motion.h1>
            <motion.h2
              className="text-xl text-gray-600 italic"
              variants={itemVariants}
            >
              Freelance Mobile &amp; Web Developer
            </motion.h2>
          </div>
        </motion.div>

        {/* About Me Section */}
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.h2
            className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-200 pb-2"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-gray-700 leading-relaxed"
            variants={itemVariants}
          >
            {aboutMeText}
          </motion.p>
          <motion.p
            className="text-gray-700 leading-relaxed mt-4"
            variants={itemVariants}
          >
            I pride myself on writing clean, maintainable code and staying
            up-to-date with the latest technologies and industry best practices.
            My goal is to deliver solutions that not only meet client
            requirements but exceed expectations in terms of performance, user
            experience, and code quality.
          </motion.p>
        </motion.div>
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.h2
            className="text-2xl font-bold text-blue-500 mb-4 border-b-2 border-blue-200 pb-2"
            variants={itemVariants}
          >
            Skills
          </motion.h2>

          <div className="space-y-4">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="relative"
                variants={itemVariants}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">
                    {skill.name}
                  </span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    custom={skill.level}
                    variants={skillBarVariants}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mb-8 bg-gray-50 rounded-lg p-6 border-l-4 border-blue-500 shadow-md"
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg
            className="h-8 w-8 text-blue-500 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-gray-700 italic mb-4">
            "Dolev delivered an exceptional website that perfectly captured our
            brand's essence. His technical expertise and eye for design resulted
            in a platform that not only looks fantastic but also performs
            flawlessly."
          </p>
          <p className="text-gray-900 font-medium">
            — Jane Smith, CEO at TechCorp
          </p>
        </motion.div>

        <motion.div
          className="text-center bg-blue-50 rounded-lg p-6"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="text-xl font-bold text-blue-700 mb-2">
            Ready to bring your vision to life?
          </h3>
          <p className="text-gray-600 mb-4">
            Let's collaborate on your next project and create something amazing.
          </p>
          <motion.button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
