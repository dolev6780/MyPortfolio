import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Smartphone } from 'lucide-react';
import Dolevcv from '../assets/Dolev cv.pdf';

export default function MobileResume() {
  const pdfUrl = Dolevcv;

  const handleOpenExternal = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-100 dark:bg-slate-900 font-sans">
      
      {/* --- Header Section --- */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 shadow-sm"
      >
        <div className="flex items-center mb-3 sm:mb-0">
          <FileText className="w-6 h-6 mr-3 text-indigo-500" />
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            My Resume
          </h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Open in New Tab Button */}
          <button 
            onClick={handleOpenExternal}
            className="flex items-center px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title="Open in new tab"
          >
            <ExternalLink size={16} className="mr-2" />
            <span>Open in Tab</span>
          </button>

          {/* Download Button - Primary Action */}
          <a 
            href={pdfUrl} 
            download="Dolev-Resume.pdf" // Suggests a filename for the user
            className="flex items-center px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 text-white font-semibold text-sm transition-all duration-200 transform hover:scale-105 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900"
            title="Download PDF"
          >
            <Download size={16} className="mr-2" />
            <span>Download</span>
          </a>
        </div>
      </motion.div>
      
      {/* --- Main Content Area --- */}
      <div className="flex-grow p-4 md:p-6 relative">
        {/* --- Mobile-specific notice --- */}
        <div className="sm:hidden flex items-center p-3 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <Smartphone className="flex-shrink-0 inline w-4 h-4 mr-3" />
          <span className="font-medium">For the best experience, please download the resume.</span>
        </div>
        
        {/* --- PDF Viewer --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full h-full bg-white dark:bg-slate-800 rounded-lg shadow-inner overflow-hidden"
        >
          <iframe 
            src={`${pdfUrl}#zoom=100`} // Appending #zoom=100 to suggest a 100% zoom level
            title="Resume PDF Viewer"
            className="w-full h-full border-0"
            aria-label="Embedded resume PDF"
          />
        </motion.div>
      </div>
    </div>
  );
};