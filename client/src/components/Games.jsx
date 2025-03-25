import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Star, Monitor, X } from 'lucide-react';
import memoryGameIcon from '../assets/memorygame.jpg';

export default function Games({ windowSize, onOpenUrl }) {
  // State for filter category
  const [filter, setFilter] = useState('all');
  
  // State for selected game (for internal modal)
  const [selectedGame, setSelectedGame] = useState(null);
  
  // State for modal fullscreen mode - always starting in windowed mode
  const [isFullscreen, setIsFullscreen] = useState(true);
  
  // State for modal dimensions
  const [modalDimensions, setModalDimensions] = useState({
    width: 1024,
    height: 768
  });
  
  // State for layout based on window size
  const [layout, setLayout] = useState({
    columns: 5,
    iconSize: 80
  });

  // Update layout when window size changes
  useEffect(() => {
    if (windowSize) {
      // Adjust grid based on window size
      let iconSize = 80;
      let columns = 5;
      
      if (windowSize.width < 640) { // Mobile
        iconSize = 60;
        columns = 3;
      } else if (windowSize.width < 1024) { // Tablet
        iconSize = 70;
        columns = 4;
      }
      
      setLayout({
        columns,
        iconSize
      });
      
      // Calculate appropriate modal dimensions for all screen sizes
      const isDesktop = windowSize.width >= 1024;
      setModalDimensions({
        width: isDesktop 
          ? Math.min(1280, windowSize.width - 80) 
          : Math.min(1024, windowSize.width - 40),
        height: isDesktop 
          ? Math.min(800, windowSize.height - 80) 
          : Math.min(768, windowSize.height - 40)
      });
    }
  }, [windowSize]);

  // Helper function to get the game URL
  const getGameUrl = (game) => {
    return game.url || null;
  };

  // Handle opening a URL in a new window modal
  const openInWindowModal = (url, title) => {
    if (typeof onOpenUrl === 'function') {
      onOpenUrl(url, title);
    } else {
      console.warn('No onOpenUrl handler provided to Games component');
      // Fallback - open in new tab if onOpenUrl is not available
      window.open(url, '_blank');
    }
  };

  // Handle double-click to open game
  const handleGameDoubleClick = (game) => {
    const url = getGameUrl(game);
    if (url) {
      openInWindowModal(url, game.title);
    } else if (game.component) {
      setSelectedGame(game);
      setIsFullscreen(true);
    } else {
      alert("This game is coming soon!");
    }
  };

  // Handle single click to select game
  const [selectedIconId, setSelectedIconId] = useState(null);
  
  const handleGameClick = (e, game) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setSelectedIconId(game.id);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedGame(null);
    // Reset fullscreen state
    setIsFullscreen(false);
  };

  // Calculate game window dimensions
  const getGameWindowSize = () => {
    if (isFullscreen) {
      return {
        width: windowSize?.width || window.innerWidth,
        height: windowSize?.height || window.innerHeight 
      };
    }
    return modalDimensions;
  };

  // Games data
  const games = [
    {
      id: 1,
      title: "Dragon Ball Memory Game",
      description: "Match pairs of Dragon Ball characters in this classic memory card game. Test your memory and try to find all pairs in the fewest moves possible!",
      image: memoryGameIcon,
      category: "puzzle",
      component: null,
      url: "https://memorygamedb.netlify.app/",
      technologies: ["React", "CSS", "JavaScript"],
      featured: true,
      iconColor: "#F87171" // red-400
    },
    {
      id: 2,
      title: "War Card Game",
      description: "Play the classic card game War against the computer. Draw cards and see who gets the highest value!",
      image: "/api/placeholder/600/400?text=War Game",
      category: "card",
      component: null,
      technologies: ["HTML", "CSS", "JavaScript"],
      iconColor: "#60A5FA" // blue-400
    },
    {
      id: 3,
      title: "Sudoku",
      description: "Challenge your mind with this classic number puzzle game. Fill the grid so each row, column and 3x3 box contains digits 1-9.",
      image: "/api/placeholder/600/400?text=Sudoku", 
      category: "puzzle",
      component: null,
      technologies: ["React", "Redux", "CSS"],
      iconColor: "#34D399" // green-400
    },
    {
      id: 4,
      title: "Flappy Bird",
      description: "Navigate a bird through a series of pipes without touching them in this addictive side-scroller game.",
      image: "/api/placeholder/600/400?text=Flappy Bird",
      category: "arcade",
      component: null,
      technologies: ["Canvas", "JavaScript", "HTML5"],
      iconColor: "#FBBF24" // yellow-400
    },
    {
      id: 5,
      title: "Snake",
      description: "Control a growing snake to eat food while avoiding walls and your own tail in this classic arcade game.",
      image: "/api/placeholder/600/400?text=Snake",
      category: "arcade",
      component: null,
      technologies: ["Canvas", "JavaScript", "HTML5"],
      iconColor: "#A78BFA" // purple-400
    }
  ];

  // Filter games based on selected category
  const filteredGames = filter === 'all' 
    ? games 
    : games.filter(game => game.category === filter);

  // Animation variants for icons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const iconVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8 
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  // Check if onOpenUrl is available and log a message if not
  useEffect(() => {
    if (typeof onOpenUrl !== 'function') {
      console.warn('Games component: onOpenUrl function not provided. Games will open in new tabs instead of windows.');
    }
  }, [onOpenUrl]);

  // Clear selection when clicking on desktop area
  const handleDesktopClick = () => {
    setSelectedIconId(null);
  };

  return (
    <div 
      className="w-full h-full overflow-auto px-6 py-6 bg-slate-100"
      onClick={handleDesktopClick}
    >
      {/* Game filter bar */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Games
          </button>
          <button 
            onClick={() => setFilter('puzzle')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'puzzle' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Puzzle
          </button>
          <button 
            onClick={() => setFilter('arcade')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'arcade' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Arcade
          </button>
          <button 
            onClick={() => setFilter('card')} 
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'card' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Card
          </button>
        </div>
      </div>
      
      {/* Games Desktop */}
      <motion.div 
        className="grid gap-8 justify-center"
        style={{
          gridTemplateColumns: `repeat(${layout.columns}, ${layout.iconSize}px)`,
          gridAutoRows: `${layout.iconSize + 30}px`
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredGames.map(game => {
          // const gameUrl = getGameUrl(game);
          
          return (
            <motion.div 
              key={game.id}
              className={`flex flex-col items-center justify-center select-none cursor-pointer
                ${selectedIconId === game.id ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
              variants={iconVariants}
              onClick={(e) => handleGameClick(e, game)}
              onDoubleClick={() => handleGameDoubleClick(game)}
            >
              {/* Game Icon */}
              <div 
                className={`overflow-hidden rounded-xl flex items-center justify-center mb-2
                  ${selectedIconId === game.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                  transition-all duration-150 transform ${selectedIconId === game.id ? 'scale-105' : 'hover:scale-105'}`}
                style={{ 
                  width: `${layout.iconSize}px`, 
                  height: `${layout.iconSize}px`,
                  backgroundColor: game.iconColor || '#4F46E5' 
                }}
              >
                {game.image ? (
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <Gamepad2 size={layout.iconSize * 0.5} className="text-white" />
                )}
                
                {game.featured && (
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold uppercase p-1 rounded-full flex items-center">
                    <Star size={10} className="mr-0.5" />
                  </div>
                )}
              </div>
              
              {/* Game Title */}
              <div 
                className={`text-center text-sm pt-1 px-1 rounded font-medium
                  ${selectedIconId === game.id ? 'bg-blue-100 text-blue-800' : 'text-gray-800'}`}
                style={{ maxWidth: `${layout.iconSize * 1.5}px` }}
              >
                <span className={`${selectedIconId === game.id ? '' : 'truncate'} block`}>
                  {game.title}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Empty state */}
      {filteredGames.length === 0 && (
        <motion.div 
          className="text-center py-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-gray-400 mb-4">
            <Gamepad2 className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No games found</h3>
          <p className="mt-1 text-gray-500">No games match the selected filter.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setFilter('all')}
          >
            View all games
          </button>
        </motion.div>
      )}
      
      {/* Game Modal (for internal components) */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
            <motion.div
              className={`bg-gray-900 rounded-lg overflow-hidden flex flex-col ${isFullscreen ? 'w-full h-full' : ''}`}
              style={isFullscreen ? {} : { 
                width: modalDimensions.width,
                height: modalDimensions.height
              }}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Modal header */}
              <div className="bg-gray-800 text-white p-2 flex items-center justify-between border-b border-gray-700">
                <h3 className="font-bold text-lg flex items-center">
                  <Gamepad2 size={18} className="mr-2" />
                  {selectedGame.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={closeModal}
                    className="text-gray-300 hover:text-white p-1.5 rounded hover:bg-gray-700 transition-colors flex items-center"
                    aria-label="Close game"
                    title="Close game"
                  >
                    <X size={18} className="mr-1" />
                    <span className="text-sm hidden sm:inline">Exit Game</span>
                  </button>
                </div>
              </div>
              
              {/* Game container */}
              <div className="flex-grow overflow-hidden">
                {selectedGame.component && (
                  <selectedGame.component 
                    windowSize={getGameWindowSize()} 
                    fullScreen={isFullscreen}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Game Info Modal - Shows when game is clicked */}
      {selectedIconId && (
        <div 
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 max-w-md w-full mx-auto px-4 opacity-90 hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            {/* Game details */}
            <div className="p-4">
              {(() => {
                const game = games.find(g => g.id === selectedIconId);
                if (!game) return null;
                
                return (
                  <>
                    <h3 className="text-lg font-bold mb-2 flex items-center">
                      <div 
                        className="w-8 h-8 rounded-md mr-2 flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: game.iconColor || '#4F46E5' }}
                      >
                        {game.image ? (
                          <img src={game.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Gamepad2 size={16} className="text-white" />
                        )}
                      </div>
                      {game.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 text-sm">
                      {game.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {game.technologies && game.technologies.map(tech => (
                        <span 
                          key={tech} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <button 
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        onClick={() => handleGameDoubleClick(game)}
                      >
                        <Monitor size={16} className="mr-1" />
                        {getGameUrl(game) ? "Launch Game" : "Coming Soon"}
                      </button>
                      
                      <span className="text-gray-500">
                        Double-click to open
                      </span>
                    </div>
                  </>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}