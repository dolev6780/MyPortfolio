import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Star, Monitor, X, Puzzle, Swords, Layers3 } from 'lucide-react';

// --- Reusable GameCard Component ---
const GameCard = ({ game, onDoubleClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="relative rounded-xl overflow-hidden bg-gray-800 shadow-lg group cursor-pointer"
      onDoubleClick={() => onDoubleClick(game)}
    >
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => { e.target.src = 'https://placehold.co/600x400/1F2937/FFFFFF?text=Game'; }}
      />
      {game.featured && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-md">
          <Star size={12} className="mr-1" /> Featured
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white w-full">
        <h3 className="text-lg font-bold truncate">{game.title}</h3>
        <p className="text-sm text-gray-300 h-10 overflow-hidden">{game.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {game.technologies.map(tech => (
            <span key={tech} className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-blue-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white text-xl font-bold">Play Now</span>
      </div>
    </motion.div>
  );
};

// --- Main Games Component ---
export default function Games({ windowSize, onOpenUrl }) {
  const [filter, setFilter] = useState('all');
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 1,
      title: "Dragon Ball Memory Game",
      description: "Match pairs of Dragon Ball characters in this classic memory game.",
      image: "https://placehold.co/600x400/F87171/FFFFFF?text=Memory+Game",
      category: "puzzle",
      url: "https://memorygamedb.netlify.app/",
      technologies: ["React", "CSS", "JavaScript"],
      featured: true,
    },
    {
      id: 2,
      title: "War Card Game",
      description: "Play the classic card game War against the computer.",
      image: "https://placehold.co/600x400/60A5FA/FFFFFF?text=War+Game",
      category: "card",
      url: "#", // Placeholder URL
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: 3,
      title: "Sudoku",
      description: "Challenge your mind with this classic number puzzle game.",
      image: "https://placehold.co/600x400/34D399/FFFFFF?text=Sudoku",
      category: "puzzle",
      url: "#",
      technologies: ["React", "Redux"],
    },
    {
      id: 4,
      title: "Flappy Bird",
      description: "Navigate a bird through a series of pipes.",
      image: "https://placehold.co/600x400/FBBF24/FFFFFF?text=Flappy+Bird",
      category: "arcade",
      url: "#",
      technologies: ["Canvas", "JavaScript"],
    },
    {
      id: 5,
      title: "Snake",
      description: "Control a growing snake to eat food while avoiding walls.",
      image: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Snake",
      category: "arcade",
      url: "#",
      technologies: ["JavaScript", "HTML5"],
    }
  ];

  const handleGameDoubleClick = (game) => {
    if (game.url && game.url !== "#") {
      if (typeof onOpenUrl === 'function') {
        onOpenUrl(game.url, game.title);
      } else {
        window.open(game.url, '_blank');
      }
    } else if (game.component) {
      setSelectedGame(game);
    } else {
      // In a real app, you might show a notification
      console.log("This game is coming soon!");
    }
  };

  const closeModal = () => setSelectedGame(null);

  const filteredGames = filter === 'all' ? games : games.filter(g => g.category === filter);

  const filters = [
    { id: 'all', name: 'All Games', icon: Layers3 },
    { id: 'puzzle', name: 'Puzzle', icon: Puzzle },
    { id: 'arcade', name: 'Arcade', icon: Gamepad2 },
    { id: 'card', name: 'Card', icon: Swords },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-gray-900 text-white overflow-y-auto">
      {/* Header */}
      <header className="p-6 sticky top-0 bg-gray-900/80 backdrop-blur-md z-10">
        <h1 className="text-3xl font-bold mb-4">Game Launcher</h1>
        <div className="flex items-center space-x-2 border border-gray-700 rounded-full p-1 max-w-md">
          {filters.map(({ id, name, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                filter === id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </div>
      </header>

      {/* Games Grid */}
      <main className="flex-grow p-6">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          <AnimatePresence>
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} onDoubleClick={handleGameDoubleClick} />
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredGames.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Gamepad2 size={48} className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No Games Found</h3>
            <p>Try selecting a different category.</p>
          </div>
        )}
      </main>

      {/* Game Modal for internal components */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-lg overflow-hidden flex flex-col w-full h-full max-w-6xl max-h-[90vh] border border-gray-700"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <header className="bg-gray-800 text-white p-3 flex items-center justify-between border-b border-gray-700">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Gamepad2 size={18} /> {selectedGame.title}
                </h3>
                <button onClick={closeModal} className="p-1.5 rounded-full hover:bg-gray-700 transition-colors">
                  <X size={20} />
                </button>
              </header>
              <div className="flex-grow overflow-hidden">
                {selectedGame.component && <selectedGame.component />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
