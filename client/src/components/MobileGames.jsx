import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X } from 'lucide-react';

const GameCard = ({ game, onDoubleClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="relative rounded-xl overflow-hidden group cursor-pointer w-16 h-16"
      onDoubleClick={() => onDoubleClick(game)}
    >
      <img
        src={game.image}
        alt={game.title}
        className="w-16 h-16 object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => { e.target.src = 'https://placehold.co/600x400/1F2937/FFFFFF?text=Game'; }}
      />
    </motion.div>
  );
};

// --- Main MobileGames Component ---
export default function MobileGames({ windowSize, onOpenUrl }) {
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
      console.log("This game is coming soon!");
    }
  };

  const closeModal = () => setSelectedGame(null);

  return (
    <div className="w-full h-full flex flex-col bg-black/50 text-white overflow-y-auto rounded-xl">
      <main className="flex-grow p-6">
        <motion.div
          layout
          className="grid grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {games.map(game => (
              <GameCard key={game.id} game={game} onDoubleClick={handleGameDoubleClick} />
            ))}
          </AnimatePresence>
        </motion.div>
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