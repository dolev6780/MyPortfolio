import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, X } from 'lucide-react';

// --- Asset Import ---
// In a real project, you would import your local PDF file like this.
// To make this component self-contained for demonstration, we'll define it below.
// import Dolevcv from '../assets/Dolev cv.pdf';

// --- Main ResumeViewer Component ---
// This component provides a trigger button that opens a fully functional PDF resume viewer in a modal.
export default function ResumeViewer() {
  // --- Configuration ---
  // Use the imported PDF file. If you don't have a local PDF, you can use a URL.
  const pdfUrl = '/assets/Dolev cv.pdf'; // Assuming Dolevcv is in the public/assets folder
  // const pdfUrl = Dolevcv; // Use this line if you are importing the PDF directly

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Handlers ---
  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleOpenExternal = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  // Effect to handle closing the modal with the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [isModalOpen, closeModal]);

  // --- Animation Variants ---
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "100vh", opacity: 0, scale: 0.8 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.5 }
    },
    exit: { 
      y: "100vh", 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* --- Trigger Button --- */}
      <motion.button
        onClick={openModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        <FileText size={20} />
        <span>View My Resume</span>
      </motion.button>

      {/* --- Modal --- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal} // Close modal on overlay click
          >
            <motion.div
              className="relative flex flex-col w-full max-w-4xl h-[90vh] bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden"
              variants={modalVariants}
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              {/* Modal Header */}
              <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <FileText className="text-indigo-500" />
                  My Resume
                </h2>
                <div className="flex items-center gap-2">
                  <a 
                    href={pdfUrl} 
                    download="Dolev-Resume.pdf"
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    <Download size={14} /> Download
                  </a>
                  <button
                    onClick={handleOpenExternal}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    <ExternalLink size={14} /> New Tab
                  </button>
                  <button 
                    onClick={closeModal}
                    className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Close resume viewer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </header>

              {/* PDF Viewer */}
              <div className="flex-grow bg-slate-100 dark:bg-slate-900">
                <iframe
                  src={`${pdfUrl}#view=fitH&zoom=100`}
                  title="Resume PDF Viewer"
                  className="w-full h-full border-0"
                  aria-label="Embedded resume PDF"
                />
              </div>

              {/* Mobile Footer Actions */}
              <footer className="sm:hidden flex items-center justify-around p-2 border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                 <a 
                    href={pdfUrl} 
                    download="Dolev-Resume.pdf"
                    className="flex-1 flex justify-center items-center gap-2 px-3 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    <Download size={16} /> Download
                  </a>
                  <button
                    onClick={handleOpenExternal}
                    className="flex-1 flex justify-center items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <ExternalLink size={16} /> New Tab
                  </button>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
