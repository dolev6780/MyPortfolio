import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Folder, X, Square, ExternalLink, FileText, User, Mail, Calculator as CalculatorIcon, Gamepad2, ShieldAlert, Copy } from 'lucide-react';

// --- Child Components (for routing) ---
// Using the actual components as requested.
import Calculator from '../components/Calculator';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Games from './Games';
import Resume from './Resume';
import ContactMe from './ContactMe';


// --- Sub-Components for the Window ---

const ContentRouter = ({ path, windowSize, onOpenUrl }) => {
  switch (path) {
    case 'aboutme': return <AboutMe windowSize={windowSize} />;
    case 'projects': return <Projects windowSize={windowSize} onOpenUrl={onOpenUrl} />;
    case 'games': return <Games windowSize={windowSize} onOpenUrl={onOpenUrl} />;
    case 'cv': return <Resume windowSize={windowSize} />;
    case 'calculator': return <Calculator />;
    case 'contactme': return <ContactMe windowSize={windowSize} />;
    default:
      return (
        <div className="p-6"><h2 className="text-xl font-medium">Content not found</h2></div>
      );
  }
};

const getWindowIcon = (path, url) => {
  if (url) return <Globe size={16} />;
  const iconMap = {
    aboutme: <User size={16} />,
    projects: <Folder size={16} />,
    games: <Gamepad2 size={16} />,
    cv: <FileText size={16} />,
    calculator: <CalculatorIcon size={16} />,
    contactme: <Mail size={16} />,
  };
  return iconMap[path] || <Folder size={16} />;
};

const WindowTitleBar = React.memo(({ title, path, url, onMouseDown, onMinimize, onMaximize, onClose, isMaximized }) => (
  <div
    className="h-10 px-3 flex items-center justify-between text-white flex-shrink-0 cursor-move select-none bg-black/20"
    onMouseDown={onMouseDown}
    onDoubleClick={onMaximize}
  >
    <div className="flex items-center gap-2 pointer-events-none">
      {getWindowIcon(path, url)}
      <span className="font-medium text-sm truncate">{title}</span>
    </div>
    <div className="flex items-center gap-1">
      <button onClick={onMinimize} className="p-2 rounded-full hover:bg-white/20 transition-colors">
        {/* Custom SVG for Windows-style minimize icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
      <button onClick={onMaximize} className="p-2 rounded-full hover:bg-white/20 transition-colors">
        {/* Use Copy icon for Restore Down and Square for Maximize */}
        {isMaximized ? <Copy size={14} /> : <Square size={14} />}
      </button>
      <button onClick={onClose} className="p-2 rounded-full hover:bg-red-500 transition-colors"><X size={16} /></button>
    </div>
  </div>
));

const IframeErrorDisplay = ({ url }) => (
  <div className="w-full h-full bg-slate-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md text-center">
      <ShieldAlert className="mx-auto h-16 w-16 text-amber-500" />
      <h2 className="mt-4 text-2xl font-bold text-slate-800">Content Cannot Be Displayed</h2>
      <p className="mt-2 text-slate-600">
        <strong className="break-all">{url}</strong> refused to connect.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Many sites use security policies to prevent being embedded in other pages. This is a standard security feature, not an error with this portfolio.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
      >
        <ExternalLink size={16} />
        Open in New Tab
      </a>
    </div>
  </div>
);

const WindowContent = ({ url, path, onOpenUrl, windowSizePixels }) => {
  const [iframeError, setIframeError] = useState(false);
  
  useEffect(() => {
    setIframeError(false); // Reset error on url change
  }, [url]);

  if (url) {
    return (
      <div className="w-full h-full relative bg-white">
        {iframeError ? (
          <IframeErrorDisplay url={url} />
        ) : (
          <iframe
            src={url}
            title={`${path} Content`}
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            onError={() => setIframeError(true)}
          />
        )}
      </div>
    );
  }
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <ContentRouter path={path} windowSize={windowSizePixels} onOpenUrl={onOpenUrl} />
    </Suspense>
  );
};

const ResizeHandles = ({ onResizeStart }) => {
    const handleDirections = [
        { direction: 'top', className: 'cursor-n-resize top-0 left-0 right-0 h-2' },
        { direction: 'bottom', className: 'cursor-s-resize bottom-0 left-0 right-0 h-2' },
        { direction: 'left', className: 'cursor-w-resize top-0 bottom-0 left-0 w-2' },
        { direction: 'right', className: 'cursor-e-resize top-0 bottom-0 right-0 w-2' },
        { direction: 'top-left', className: 'cursor-nw-resize top-0 left-0 w-4 h-4' },
        { direction: 'top-right', className: 'cursor-ne-resize top-0 right-0 w-4 h-4' },
        { direction: 'bottom-left', className: 'cursor-sw-resize bottom-0 left-0 w-4 h-4' },
        { direction: 'bottom-right', className: 'cursor-se-resize bottom-0 right-0 w-4 h-4' },
    ];

    return (
        <>
            {handleDirections.map(({ direction, className }) => (
                <div
                    key={direction}
                    className={`absolute ${className} z-10`}
                    onMouseDown={(e) => onResizeStart(e, direction)}
                />
            ))}
        </>
    );
};


// --- Main Window Component ---

export default function WindowsModal({
  isOpen,
  onClose,
  onMinimize,
  title = "Window",
  url = null,
  path = null,
  initialPosition = { x: '10%', y: '10%' },
  initialSize = { width: '80%', height: '70%' },
  isMinimized = false,
  onOpenUrl
}) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevState, setPrevState] = useState(null);
  const [windowSizePixels, setWindowSizePixels] = useState({ width: 0, height: 0 });

  const modalRef = useRef(null);

  const updateSizeInPixels = useCallback(() => {
    if (modalRef.current) {
      setWindowSizePixels({
        width: modalRef.current.offsetWidth,
        height: modalRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
        const observer = new ResizeObserver(updateSizeInPixels);
        if (modalRef.current) observer.observe(modalRef.current);
        return () => observer.disconnect();
    }
  }, [isOpen, updateSizeInPixels]);

  const handleMaximize = useCallback(() => {
    if (isMaximized) {
      if (prevState) {
        setPosition(prevState.position);
        setSize(prevState.size);
      }
      setIsMaximized(false);
    } else {
      setPrevState({ position, size });
      setPosition({ x: '0', y: '0' });
      setSize({ width: '100%', height: 'calc(100% - 48px)' }); // Adjust for taskbar
      setIsMaximized(true);
    }
  }, [isMaximized, position, size, prevState]);

  const handleDragStart = useCallback((e) => {
    if (isMaximized) return;
    if (e.target.closest('button')) return; // Don't drag on buttons
    
    setIsDragging(true);
    const modalRect = modalRef.current.getBoundingClientRect();
    const dragOffset = { x: e.clientX - modalRect.left, y: e.clientY - modalRect.top };

    const handleMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - dragOffset.x;
      const newY = moveEvent.clientY - dragOffset.y;
      setPosition({ x: `${newX}px`, y: `${newY}px` });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isMaximized]);

  const handleResizeStart = useCallback((e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const modalRect = modalRef.current.getBoundingClientRect();

    const handleMouseMove = (moveEvent) => {
        let newWidth = modalRect.width;
        let newHeight = modalRect.height;
        let newX = modalRect.left;
        let newY = modalRect.top;

        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        if (direction.includes('right')) {
            newWidth = Math.max(400, modalRect.width + deltaX);
        }
        if (direction.includes('left')) {
            newWidth = Math.max(400, modalRect.width - deltaX);
            newX = modalRect.left + deltaX;
        }
        if (direction.includes('bottom')) {
            newHeight = Math.max(300, modalRect.height + deltaY);
        }
        if (direction.includes('top')) {
            newHeight = Math.max(300, modalRect.height - deltaY);
            newY = modalRect.top + deltaY;
        }

        setSize({ width: `${newWidth}px`, height: `${newHeight}px` });
        setPosition({ x: `${newX}px`, y: `${newY}px` });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  if (!isOpen || isMinimized) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        className="fixed bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-lg shadow-2xl flex flex-col overflow-hidden border border-white/10"
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: 'easeIn' } }}
        transition={{
            width: { duration: 0.2, ease: 'easeOut' },
            height: { duration: 0.2, ease: 'easeOut' },
            left: isDragging ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' },
            top: isDragging ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' },
        }}
      >
        <WindowTitleBar
          title={title}
          path={path}
          url={url}
          onMouseDown={handleDragStart}
          onMinimize={onMinimize}
          onMaximize={handleMaximize}
          onClose={onClose}
          isMaximized={isMaximized}
        />
        <div className="flex-grow bg-white dark:bg-slate-900/50 overflow-auto">
          <WindowContent
            url={url}
            path={path}
            onOpenUrl={onOpenUrl}
            windowSizePixels={windowSizePixels}
          />
        </div>
        {!isMaximized && <ResizeHandles onResizeStart={handleResizeStart} />}
      </motion.div>
    </AnimatePresence>
  );
}
