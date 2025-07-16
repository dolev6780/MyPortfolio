import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle, Menu, ArrowLeft } from 'lucide-react';

// --- Sidebar Navigation Data ---
const navItems = [
  {
    label: 'Contact Me',
    icon: Mail,
    href: '#contactme',
    isExternal: false,
  },
  {
    label: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/dolev-cohen-736763190/',
    isExternal: true,
  },
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/dolev6780?tab=repositories',
    isExternal: true,
  },
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/+972506378511',
    isExternal: true,
  },
];

// --- Main Sidebar Component ---
export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768);

  // Effect to handle window resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarVariants = {
    expanded: { width: '250px' },
    collapsed: { width: '80px' },
  };

  const navItemVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    collapsed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  return (
    <motion.aside
      className="fixed top-0 left-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-lg flex flex-col z-50"
      variants={sidebarVariants}
      initial={isExpanded ? 'expanded' : 'collapsed'}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
    >
      {/* --- Header / Logo --- */}
      <div className="flex items-center p-5 border-b border-slate-200 dark:border-slate-800 h-20">
        <div className="w-[40px] h-[40px] bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          D
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              variants={navItemVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="ml-3 text-xl font-bold text-slate-800 dark:text-white whitespace-nowrap"
            >
              Dolev Cohen
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* --- Toggle Button (visible on small screens) --- */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-4 top-24 p-1.5 bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 transition-all z-10 lg:hidden"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? <ArrowLeft size={18} /> : <Menu size={18} />}
      </button>

      {/* --- Navigation --- */}
      <nav className="flex-grow pt-5">
        <ul className="flex flex-col items-start space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.label} className="w-full">
              <a
                href={item.href}
                target={item.isExternal ? '_blank' : '_self'}
                rel={item.isExternal ? 'noopener noreferrer' : ''}
                className="flex items-center w-full p-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <item.icon className="w-10 h-10 flex-shrink-0" size={24} />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      variants={navItemVariants}
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      className="ml-4 font-semibold whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* --- Footer / Resume Button --- */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className={isExpanded ? 'w-full' : 'flex justify-center'}>
          
        </div>
      </div>
    </motion.aside>
  );
}
