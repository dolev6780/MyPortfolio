import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Maximize2, Code, Star, Monitor } from 'lucide-react';
import careerinfocus from '../assets/careerinfocus.png'
import bijumpacademy from '../assets/bijumpacademy.jpg'
import liatGallery from '../assets/liatGallery.png'
import ShoppingListApp from '../assets/ShoppingListApp.png'
export default function Projects({ windowSize, onOpenUrl }) {
  // State for filter category
  const [filter, setFilter] = useState('all');
  
  // State for layout based on window size
  const [layout, setLayout] = useState({
    columns: 2,
    compact: false
  });

  // Update layout when window size changes
  useEffect(() => {
    if (windowSize) {
      setLayout({
        columns: windowSize.width < 600 ? 1 : windowSize.width < 1000 ? 2 : 3,
        compact: windowSize.width < 700
      });
    }
  }, [windowSize]);

  // Helper function to get the project URL (either demo or url property)
  const getProjectUrl = (project) => {
    return project.demo || project.url || null;
  };

  // Handle opening a URL in a new window modal
  const openInWindowModal = (url, title) => {
    if (typeof onOpenUrl === 'function') {
      onOpenUrl(url, title);
    } else {
      console.warn('No onOpenUrl handler provided to Projects component');
      // Fallback - open in new tab if onOpenUrl is not available
      window.open(url, '_blank');
    }
  };

  // Handle opening a project demo in a new window modal
  const handleOpenProjectInWindowModal = (e, project) => {
    e.preventDefault();
    const url = getProjectUrl(project);
    if (!url) return;
    
    openInWindowModal(url, project.title);
  };

  // Handle opening GitHub link in a window modal
  const handleOpenGithubInWindowModal = (e, project) => {
    e.preventDefault();
    if (!project.github) return;
    window.open(project.github, '_blank');
  };

  // Project data
  const projects = [
    {
      id: 1,
      title: "Career In Focus",
      description: "A unique portfolio website styled as a Windows desktop environment with interactive windows and icons.",
      image: careerinfocus,
      category: "frontend",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase"],
      // github: "https://github.com/username/portfolio",
      url: "https://careerinfocus.co.il/",
      featured: true
    },
    {
      id: 2,
      title: "B.I Jump Academy",
      description: "Fully-featured online store with product catalog, shopping cart, and secure checkout process.",
      image: bijumpacademy,
      category: "fullstack",
      technologies: ["Wix", "Javascript", "Vimeo"],
      demo: "https://www.bijumpacademy.co.il/"
    },
    {
      id: 3,
      title: "Liat Photography",
      description: "Real-time weather application with forecasts, historical data, and interactive maps.",
      image: liatGallery, 
      category: "frontend",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Firebase"],
      // github: "https://github.com/username/weather-app",
      demo: "https://liatphotography.netlify.app"
    },
    {
      id: 4,
      title: "Task Management App",
      description: "Collaborative project management tool with tasks, teams, and due date tracking.",
      image: ShoppingListApp,
      category: "mobile",
      technologies: ["Flutter", "Firebase"],
      github: "https://github.com/dolev6780/shoppingListFlutter",
    },
    {
      id: 5,
      title: "Personal Blog",
      description: "Statically generated blog with markdown support, code highlighting, and responsive design.",
      image: "/api/placeholder/600/400",
      category: "frontend",
      technologies: ["Gatsby", "GraphQL", "Styled Components"],
      github: "https://github.com/username/blog",
      demo: "https://example.com/blog"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Mobile app for tracking workouts, nutrition, and fitness progress with data visualization.",
      image: "/api/placeholder/600/400",
      category: "mobile",
      technologies: ["React Native", "Redux", "Firebase"],
      github: "https://github.com/username/fitness-app",
      demo: null
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Check if onOpenUrl is available and log a message if not
  useEffect(() => {
    if (typeof onOpenUrl !== 'function') {
      console.warn('Projects component: onOpenUrl function not provided. Projects will open in new tabs instead of windows.');
    }
  }, [onOpenUrl]);

  return (
    <div className="w-full h-full overflow-auto px-4 py-5 bg-white text-gray-800">
      {/* Header with title and filter */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
          <div className="h-1 w-20 bg-blue-500 mt-1"></div>
        </motion.h1>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('frontend')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'frontend' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Frontend
          </button>
          <button 
            onClick={() => setFilter('fullstack')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'fullstack' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Full Stack
          </button>
          <button 
            onClick={() => setFilter('mobile')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'mobile' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mobile
          </button>
        </motion.div>
      </div>
      
      {/* Project grid */}
      <motion.div 
        className={`grid gap-6 grid-cols-1 ${
          layout.columns === 1 ? 'md:grid-cols-1' : 
          layout.columns === 2 ? 'md:grid-cols-2' : 
          'md:grid-cols-3'
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.map(project => {
          const projectUrl = getProjectUrl(project);
          
          return (
            <motion.div 
              key={project.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 flex flex-col h-full hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              {/* Project image - make it clickable to open demo */}
              <div 
                className={`relative ${projectUrl ? 'cursor-pointer' : ''}`} 
                onClick={(e) => projectUrl && handleOpenProjectInWindowModal(e, project)}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold uppercase px-2 py-1 m-2 rounded-full flex items-center">
                    <Star size={12} className="mr-1" /> Featured
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-70"></div>
                
                {/* Project Preview overlay */}
                {projectUrl && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white rounded-full py-2 px-4 flex items-center shadow-lg">
                      <Maximize2 size={16} className="mr-2 text-blue-600" />
                      <span className="text-sm font-medium">Open Project</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Project details */}
              <div className="p-5 flex-grow">
                <h3 
                  className={`text-xl font-bold mb-2 ${projectUrl ? 'cursor-pointer hover:text-blue-600' : ''}`} 
                  onClick={(e) => projectUrl && handleOpenProjectInWindowModal(e, project)}
                >
                  {project.title}
                </h3>
                
                <p className={`text-gray-600 mb-4 ${layout.compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
                  {project.description}
                </p>
                
                {/* Technology tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(tech => (
                    <span 
                      key={tech} 
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Links */}
              <div className="px-5 py-3 bg-gray-50 border-t flex justify-between">
                <div className="flex space-x-3">
                  {project.github && (
                    <button 
                      onClick={(e) => handleOpenGithubInWindowModal(e, project)}
                      className="text-gray-700 hover:text-black transition-colors flex items-center"
                    >
                      <Github size={18} className="mr-1" />
                      <span className={layout.compact ? 'hidden' : ''}>Source Code</span>
                    </button>
                  )}
                  
                  {projectUrl && (
                    <button 
                      onClick={(e) => handleOpenProjectInWindowModal(e, project)}
                      className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    >
                      <Monitor size={18} className="mr-1" />
                      <span className={layout.compact ? 'hidden' : ''}>Open Demo</span>
                    </button>
                  )}
                </div>
                
                <span className="text-xs text-gray-500 flex items-center">
                  <Code size={14} className="mr-1" />
                  {project.category}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="text-center py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-gray-500">No projects match the selected filter.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setFilter('all')}
          >
            View all projects
          </button>
        </motion.div>
      )}
      
      {/* Contact CTA */}
      <motion.div 
        className="mt-12 text-center p-6 bg-blue-50 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-bold text-blue-800 mb-2">Interested in working together?</h3>
        <p className="text-blue-600 mb-4">I'm always open to discussing new projects and opportunities.</p>
        <button 
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition-colors"
          onClick={() => {
            openInWindowModal('https://example.com/contact', 'Contact Me');
          }}
        >
          Get in Touch
        </button>
      </motion.div>
    </div>
  );
}