import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import Dolevcv from '../assets/Dolev cv.pdf'
const Resume = ({ windowSize }) => {
  // Fixed PDF URL - replace with your actual resume PDF
  const pdfUrl = Dolevcv;
  
  // Open PDF in new browser tab
  const handleOpenExternal = () => {
    window.open(pdfUrl, '_blank');
  };
  
  // Download the PDF
  const handleDownload = () => {
    window.location.href = pdfUrl;
  };
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Simple header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <FileText className="mr-2" size={20} />
          My Resume
        </h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleOpenExternal}
            className="flex items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700 font-medium text-sm"
            title="Open in new tab"
          >
            <ExternalLink size={16} className="mr-1" />
            <span className="hidden sm:inline">Open in Tab</span>
          </button>
        </div>
      </div>
      
      {/* PDF Viewer - takes up all remaining space */}
      <div className="flex-grow">
        <iframe 
          src={pdfUrl} 
          title="Resume PDF Viewer"
          className="w-full h-full border-0"
          style={{ 
            height: windowSize ? `${windowSize.contentHeight - 64}px` : 'calc(100vh - 130px)'
          }}
        />
      </div>
    </div>
  );
};

export default Resume;