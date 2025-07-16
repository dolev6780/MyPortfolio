import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Github, ExternalLink, Code, Star, FolderKanban } from 'lucide-react';
import careerinfocus from '../assets/careerinfocus.png'
import bijumpacademy from '../assets/bijumpacademy.jpg'
import liatGallery from '../assets/liatGallery.png'
import ShoppingListApp from '../assets/ShoppingListApp.png'

const projects = [
    {
      id: 1,
      title: "Career In Focus",
      description: "A unique portfolio styled as a Windows desktop environment with interactive windows and icons.",
      image: careerinfocus,
      category: "frontend",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase"],
      url: "https://careerinfocus.co.il/",
      featured: true
    },
    {
      id: 2,
      title: "B.I Jump Academy",
      description: "A fully-featured online store with a product catalog, shopping cart, and secure checkout process.",
      image: bijumpacademy,
      category: "fullstack",
      technologies: ["Wix", "JavaScript", "Velo API"],
      demo: "https://www.bijumpacademy.co.il/"
    },
    {
      id: 3,
      title: "Liat Photography",
      description: "An elegant and minimalist portfolio gallery for a photographer, focusing on visual storytelling.",
      image: liatGallery,
      category: "frontend",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase"],
      demo: "https://liatphotography.netlify.app"
    },
    {
      id: 4,
      title: "Shopping List App",
      description: "A collaborative, real-time shopping list application built for mobile platforms.",
      image: ShoppingListApp,
      category: "mobile",
      technologies: ["Flutter", "Firebase"],
      github: "https://github.com/dolev6780/shoppingListFlutter",
    },
    {
      id: 5,
      title: "Personal Blog Platform",
      description: "Statically generated blog with markdown support, code highlighting, and a focus on performance.",
      image: "https://placehold.co/600x400/fde047/78350f?text=Gatsby+Blog",
      category: "frontend",
      technologies: ["Gatsby", "GraphQL", "Styled Components"],
      github: "https://github.com/username/blog",
      demo: "https://example.com/blog"
    },
    {
      id: 6,
      title: "Fitness Tracker API",
      description: "A robust backend service for a fitness application, handling user data, workouts, and progress.",
      image: "https://placehold.co/600x400/fca5a5/7f1d1d?text=Fitness+API",
      category: "fullstack",
      technologies: ["Node.js", "Express", "MongoDB", "JWT"],
      github: "https://github.com/username/fitness-api",
      demo: null
    }
];

const filters = ['all', 'frontend', 'fullstack', 'mobile'];

export default function MobileProjects({ onOpenUrl }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isCompact, setIsCompact] = useState(false);

  // Effect to handle responsive layout changes
  useEffect(() => {
    const checkSize = () => {
      setIsCompact(window.innerWidth < 768);
    };
    window.addEventListener('resize', checkSize);
    checkSize(); // Initial check
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Fallback function if onOpenUrl is not provided
  const handleOpenUrl = (url, title) => {
    if (typeof onOpenUrl === 'function') {
      onOpenUrl(url, title);
    } else {
      console.log(`Opening URL: ${url} for project: ${title}`);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getProjectUrl = (project) => project.demo || project.url || null;

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="w-full h-full overflow-auto bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Creative Portfolio
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A collection of projects I've built, from front-end designs to full-stack applications.
          </p>
        </motion.div>

        {/* --- Filter Controls --- */}
        <div className="flex justify-center mb-8 md:mb-12">
          <LayoutGroup>
            <div className="flex flex-wrap justify-center gap-2 bg-slate-200/80 dark:bg-slate-800/80 p-1.5 rounded-full">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className="relative px-4 py-2 text-sm font-semibold rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-900"
                >
                  <span className="relative z-10 capitalize text-slate-700 dark:text-slate-300">
                    {filter}
                  </span>
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>

        {/* --- Projects Grid --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProjects.map(project => {
              const projectUrl = getProjectUrl(project);
              return (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white dark:bg-slate-800/50 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 flex flex-col"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/ef4444/ffffff?text=Image+Error'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Star size={14} /> Featured
                      </div>
                    )}
                    {projectUrl && (
                      <div
                        onClick={() => handleOpenUrl(projectUrl, project.title)}
                        className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-white font-semibold py-2 px-4 border-2 border-white rounded-full transform group-hover:scale-100 scale-90 transition-transform duration-300">
                          <ExternalLink size={20} />
                          <span>View Project</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <span key={tech} className="bg-slate-100 dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 text-xs font-medium px-2.5 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Section */}
                  <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          <Github size={18} />
                          {!isCompact && <span className="text-sm font-medium">Code</span>}
                        </a>
                      )}
                      {projectUrl && (
                        <button 
                          onClick={() => handleOpenUrl(projectUrl, project.title)}
                          className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <ExternalLink size={18} />
                          {!isCompact && <span className="text-sm font-medium">Demo</span>}
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono capitalize">
                      <Code size={14} />
                      {project.category}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* --- Empty State --- */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-16 px-4"
            >
              <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mb-4">
                <FolderKanban className="h-10 w-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No Projects Found</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">Try selecting a different category to see more of my work.</p>
              <button
                className="mt-6 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow"
                onClick={() => setActiveFilter('all')}
              >
                View All Projects
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Contact CTA --- */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 md:mt-24 text-center p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Interested in working together?
          </h3>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <button
            className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors transform hover:scale-105 shadow-lg"
            onClick={() => handleOpenUrl('mailto:contact@example.com', 'Contact Me')}
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
}