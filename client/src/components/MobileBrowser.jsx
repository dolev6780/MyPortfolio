// MobileBrowser.jsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function MobileBrowser({ url, title, onGoHome }) {
  return (
    <div className="w-full h-full overflow-hidden animate-app-open flex flex-col">
      <header className="flex-shrink-0 p-2 flex items-center justify-between z-10">
        <button onClick={onGoHome} className="p-2 rounded-full hover:bg-gray-200">
          <ArrowLeft size={20} />
        </button>
        <span className="font-semibold truncate px-2">{title || 'Browser'}</span>
        <div className="w-8"></div> {/* Spacer to balance the back button */}
      </header>
      <main className="flex-grow w-full h-full bg-white">
        <iframe
          src={url}
          title={title}
          className="w-full h-full border-none"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups" // Security sandbox for iframe
        />
      </main>
    </div>
  );
}