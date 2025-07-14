import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader,
  AlertTriangle,
} from 'lucide-react';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// --- Reusable ToolbarButton Component ---
const ToolbarButton = ({ onClick, children, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="p-2 rounded-md text-gray-300 hover:bg-white/20 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {children}
  </button>
);

// --- Main PdfViewer Component ---
export default function PdfViewer({ file, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = useCallback(({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setPageNumber(1);
  }, []);

  const onDocumentLoadError = useCallback((loadError) => {
    console.error('Failed to load PDF:', loadError);
    setError('Failed to load PDF file. Please ensure it is a valid PDF.');
  }, []);

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* --- Toolbar --- */}
        <motion.div
          className="w-full max-w-4xl bg-gray-800/80 text-white rounded-t-lg p-2 flex items-center justify-between shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <ToolbarButton onClick={onClose}>
              <X size={20} />
            </ToolbarButton>
            <a href={file} download>
              <ToolbarButton>
                <Download size={20} />
              </ToolbarButton>
            </a>
          </div>

          {numPages && (
            <div className="flex items-center gap-2">
              <ToolbarButton onClick={goToPrevPage} disabled={pageNumber <= 1}>
                <ChevronLeft size={20} />
              </ToolbarButton>
              <span className="text-sm font-medium">
                Page {pageNumber} of {numPages}
              </span>
              <ToolbarButton onClick={goToNextPage} disabled={pageNumber >= numPages}>
                <ChevronRight size={20} />
              </ToolbarButton>
            </div>
          )}

          <div className="flex items-center gap-2">
            <ToolbarButton onClick={zoomOut} disabled={scale <= 0.5}>
              <ZoomOut size={20} />
            </ToolbarButton>
            <span className="text-sm font-medium w-12 text-center">{(scale * 100).toFixed(0)}%</span>
            <ToolbarButton onClick={zoomIn} disabled={scale >= 3.0}>
              <ZoomIn size={20} />
            </ToolbarButton>
          </div>
        </motion.div>

        {/* --- PDF Display Area --- */}
        <div className="w-full max-w-4xl flex-grow bg-gray-900 overflow-auto rounded-b-lg">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex flex-col items-center justify-center h-full text-white">
                <Loader className="animate-spin h-10 w-10 mb-4" />
                <p>Loading PDF...</p>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center h-full text-red-400 p-4">
                <AlertTriangle className="h-10 w-10 mb-4" />
                <p className="font-semibold">Error</p>
                <p className="text-center text-sm">{error}</p>
              </div>
            }
          >
            <Page
              key={`page_${pageNumber}`}
              pageNumber={pageNumber}
              scale={scale}
              className="flex justify-center pt-4"
              renderAnnotationLayer={true}
              renderTextLayer={true}
            />
          </Document>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
