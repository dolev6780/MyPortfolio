import React from 'react';
import { Document, Page } from 'react-pdf';
import CloseIcon from "@mui/icons-material/Close";

const PdfViewer = ({ file, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <CloseIcon />
        </button>
        <div className="w-full h-full flex items-center justify-center">
          <Document
            file={file}
            className="w-full h-full flex items-center justify-center"
          >
            <Page
              pageNumber={1}
              className=""
              scale={1.0} // Adjust scale if needed
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;