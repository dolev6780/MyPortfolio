import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { User, Wrench, MessageSquareQuote, Mail } from 'lucide-react';
import profilepic from "../assets/profilepic.jpeg";
import Sidebar from './Sidebar';

const Skill = ({ name, level }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      controls.start({
        width: `${level}%`,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      });
    }
  }, [isInView, level, controls]);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="font-medium text-gray-700">{name}</span>
        <span className="text-sm text-gray-500">{level}%</span>
      </div>
      <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={controls}
        />
      </div>
    </div>
  );
};

// Main AboutMe Component
export default function AboutMe({ windowSize }) {
  // Bio content remains the same
  const aboutMeText =
    "Hey, I'm Dolev. As a Freelance Mobile and Web Developer, I am passionate about turning ideas into functional, scalable, and user-friendly applications. With expertise in full-stack development, I specialize in creating responsive websites and mobile apps that provide seamless experiences across devices.";

  // Skills list remains the same
  const skills = [
    { name: "React", level: 95 },
    { name: "UI/UX Design (Figma)", level: 70 },
    { name: "JavaScript", level: 90 },
    { name: "Node.js & Express", level: 90 },
    { name: "Flutter & Dart", level: 80 },
    { name: "React Native", level: 75 },
  ];

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5,
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

  return (
    <div className="flex w-full h-full bg-gray-100/50">
      <Sidebar />

      <div className="flex-grow p-4 md:p-8 overflow-y-auto">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* --- Header Section --- */}
          <motion.div
            className="flex flex-col md:flex-row items-center gap-6 md:gap-8 p-8 bg-white rounded-2xl shadow-subtle mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={profilepic}
                alt="Dolev Cohen"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/50 shadow-lg"></div>
            </motion.div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                Dolev <span className="text-blue-500">Cohen</span>
              </h1>
              <p className="text-xl text-gray-500 mt-1">
                Freelance Mobile & Web Developer
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- Left Column (About & Testimonial) --- */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Me Section */}
              <motion.div className="p-8 bg-white rounded-2xl shadow-subtle" variants={itemVariants}>
                <h2 className="flex items-center text-2xl font-bold text-blue-500 mb-4">
                  <User className="mr-3" /> About Me
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {aboutMeText}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  I pride myself on writing clean, maintainable code and staying up-to-date with the latest technologies. My goal is to deliver solutions that not only meet client requirements but exceed expectations.
                </p>
              </motion.div>

              <motion.div className="p-8 bg-white rounded-2xl shadow-subtle" variants={itemVariants}>
                <h2 className="flex items-center text-2xl font-bold text-blue-500 mb-4">
                  <MessageSquareQuote className="mr-3" /> Testimonial
                </h2>
                <blockquote className="border-l-4 border-blue-200 pl-6 text-gray-600 italic">
                  "Dolev delivered an exceptional website that perfectly captured our brand's essence. His technical expertise and eye for design resulted in a platform that not only looks fantastic but also performs flawlessly."
                </blockquote>
                <p className="text-right mt-4 text-gray-800 font-medium">
                  — Koral Shalev, CEO at CarrerInFocus
                </p>
              </motion.div>
            </div>

            {/* --- Right Column (Skills & CTA) --- */}
            <div className="lg:col-span-1 space-y-8">
              {/* Skills Section */}
              <motion.div className="p-8 bg-white rounded-2xl shadow-subtle" variants={itemVariants}>
                <h2 className="flex items-center text-2xl font-bold text-blue-500 mb-6">
                  <Wrench className="mr-3" /> My Skills
                </h2>
                <div className="space-y-5">
                  {skills.map((skill) => (
                    <Skill key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div className="p-8 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg text-center" variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-2">
                  Ready to build?
                </h3>
                <p className="opacity-90 mb-6">
                  Let's collaborate on your next project.
                </p>
                <motion.button
                  className="bg-white text-blue-500 px-6 py-2.5 rounded-lg font-bold shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="mr-2" size={20}/> Get In Touch
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
