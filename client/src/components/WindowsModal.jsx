import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Globe, Folder, X, Minimize, Maximize, Square, ExternalLink, FileText, Contact, Mail, CalculatorIcon } from 'lucide-react';
import Calculator from '../components/Calculator';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Games from './Games';
import Resume from './Resume';


const ContactMe = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Contact Me</h1>
    {/* Contact content */}
  </div>
);

// Component router - maps paths to components and passes window size and onOpenUrl function
const ContentRouter = ({ path, windowSize, onOpenUrl }) => {
  switch (path) {
    case 'aboutme':
      return <AboutMe windowSize={windowSize} />;
    case 'projects':
      return <Projects windowSize={windowSize} onOpenUrl={onOpenUrl} />;
    case 'games':
      return <Games windowSize={windowSize} onOpenUrl={onOpenUrl}/>;
    case 'cv':
      return <Resume windowSize={windowSize} />;
    case 'calculator':
      return <Calculator />;
    case 'contactme':
      return <ContactMe windowSize={windowSize} />;
    default:
      return (
        <div className="p-6">
          <h2 className="text-xl font-medium">Content not found</h2>
          <p className="mt-2">The requested content could not be loaded.</p>
        </div>
      );
  }
};

/**
 * WindowsModal Component
 * Creates a draggable, resizable window for the desktop environment
 */
const WindowsModal = ({ 
  isOpen, 
  onClose,
  onMinimize,
  title = "Window", 
  url = null,
  path = null,
  initialPosition = { x: '10%', y: '10%' },
  initialSize = { width: '80%', height: '70%' },
  isMinimized = false,
  onOpenUrl // Function to open URLs in new window modals
}) => {
  const [windowPosition, setWindowPosition] = useState(initialPosition);
  const [windowSize, setWindowSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousState, setPreviousState] = useState(null);
  const [iframeError, setIframeError] = useState(false);
  
  // Track actual window dimensions in pixels
  const [windowSizePixels, setWindowSizePixels] = useState({ width: 0, height: 0 });
  
  const modalRef = useRef(null);
  const titleBarRef = useRef(null);
  const contentRef = useRef(null);

  // Determine if a site is likely to block embedding
  const isLikelyToBlockEmbedding = useCallback((urlString) => {
    if (!urlString) return false;
    
    try {
      const url = new URL(urlString);
      const blockedDomains = [
        'github.com', 
        'weather.com', 
        'mail.google.com', 
        'youtube.com',
        'facebook.com',
        'twitter.com',
        'linkedin.com',
        'instagram.com'
      ];
      
      return blockedDomains.some(domain => url.hostname.includes(domain));
    } catch (e) {
      return false;
    }
  }, []);
  
  // Pre-emptively mark known blocked sites
  useEffect(() => {
    if (url && isLikelyToBlockEmbedding(url)) {
      setIframeError(true);
    } else {
      setIframeError(false);
    }
  }, [url, isLikelyToBlockEmbedding]);
  
  // Function to update window dimensions in pixels
  const updateSizeInPixels = useCallback(() => {
    if (!modalRef.current) return;
    
    const width = modalRef.current.offsetWidth;
    const height = modalRef.current.offsetHeight;
    
    // Content area size (minus title bar and any other UI elements)
    let contentHeight = height;
    if (contentRef.current) {
      contentHeight = contentRef.current.offsetHeight;
    }
    
    setWindowSizePixels({
      width,
      height,
      contentWidth: width,
      contentHeight: contentHeight
    });
  }, []);
  
  // Update pixel size when modal is rendered
  useEffect(() => {
    if (modalRef.current) {
      updateSizeInPixels();
      
      // Set up a resize observer to track size changes
      const resizeObserver = new ResizeObserver(() => {
        updateSizeInPixels();
      });
      
      resizeObserver.observe(modalRef.current);
      
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [isOpen, updateSizeInPixels]);
  
  // Function to handle iframe load errors
  const handleIframeError = useCallback(() => {
    setIframeError(true);
  }, []);

  // Store previous state before maximizing
  const saveCurrentState = useCallback(() => {
    return {
      position: { ...windowPosition },
      size: { ...windowSize }
    };
  }, [windowPosition, windowSize]);

  // Maximize window
  const handleMaximize = useCallback(() => {
    if (!isMaximized) {
      const state = saveCurrentState();
      setPreviousState(state);
      setWindowPosition({ x: '0', y: '0' });
      setWindowSize({ width: '100%', height: 'calc(100% - 48px)' }); // Account for taskbar
      setIsMaximized(true);
    } else {
      // Restore to previous state
      if (previousState) {
        setWindowPosition(previousState.position);
        setWindowSize(previousState.size);
      }
      setIsMaximized(false);
    }
  }, [isMaximized, previousState, saveCurrentState]);

  // Handle opening a URL in a new tab
  const handleOpenInNewTab = useCallback((url) => {
    window.open(url, '_blank');
  }, []);

  // Start window drag
  const handleMouseDown = useCallback((e) => {
    if (isMaximized) return;
    
    // Only allow dragging from the title bar
    if (e.target === titleBarRef.current || titleBarRef.current.contains(e.target)) {
      setIsDragging(true);
      
      // Calculate offset from the top-left corner of the window
      const modalRect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - modalRect.left,
        y: e.clientY - modalRect.top
      });
      
      // Prevent text selection during drag
      e.preventDefault();
    }
  }, [isMaximized]);

  // Handle window movement
  const handleMouseMove = useCallback((e) => {
    if (isDragging && modalRef.current) {
      // Calculate new position
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Prevent window from being dragged completely off-screen
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Ensure at least 20% of the window remains visible
      const minVisibleX = Math.min(newX, viewportWidth - (modalRef.current.offsetWidth * 0.2));
      const minVisibleY = Math.min(newY, viewportHeight - (modalRef.current.offsetHeight * 0.2));
      const clampedX = Math.max(-(modalRef.current.offsetWidth * 0.8), minVisibleX);
      const clampedY = Math.max(0, minVisibleY);
      
      // Convert to percentage of viewport
      const percentX = (clampedX / viewportWidth) * 100;
      const percentY = (clampedY / viewportHeight) * 100;
      
      // Update position
      setWindowPosition({
        x: `${percentX}%`,
        y: `${percentY}%`
      });
    }
  }, [isDragging, dragOffset]);

  // End window drag
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  
  // Reset iframe error when URL changes
  useEffect(() => {
    setIframeError(false);
  }, [url]);

  // Don't render if not open or minimized
  if (!isOpen || isMinimized) {
    return null;
  }

  // Get appropriate icon for the current window
  const getWindowIcon = () => {
    if (url) return <Globe size={16} className="mr-2" />;
    
    switch (path) {
      case 'aboutme':
        return <Contact size={16} className="mr-2" />;
      case 'projects':
      case 'games':
        return <Folder size={16} className="mr-2" />;
      case 'cv':
        return <FileText size={16} className="mr-2" />;
      case 'calculator':
        return <CalculatorIcon size={16} className="mr-2" />;
      case 'contactme':
        return <Mail size={16} className="mr-2" />;
      default:
        return <Folder size={16} className="mr-2" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
      onClick={(e) => {
        // Close if clicking outside the modal
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className={`bg-gray-100 rounded shadow-lg flex flex-col ${isMaximized ? 'rounded-none' : ''}`}
        style={{
          position: 'absolute',
          left: windowPosition.x,
          top: windowPosition.y,
          width: windowSize.width,
          height: windowSize.height,
          transition: isDragging ? 'none' : 'left 0.1s, top 0.1s',
          overflow: 'hidden',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          zIndex: 100
        }}
      >
        {/* Window Title Bar */}
        <div
          ref={titleBarRef}
          className={`${url ? 'bg-blue-600' : 'bg-gray-700'} text-white px-4 py-2 flex items-center justify-between rounded-t cursor-move select-none`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center">
            {getWindowIcon()}
            <div className="font-medium truncate">{title}</div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={onMinimize}
              className="p-1 hover:bg-blue-500 rounded"
            >
              <Minimize size={16} />
            </button>
            <button 
              onClick={handleMaximize}
              className="p-1 hover:bg-blue-500 rounded"
            >
              {isMaximized ? <Square size={16} /> : <Maximize size={16} />}
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-red-500 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        {/* Address Bar - Only for browser windows */}
        {url && (
          <div className="bg-gray-200 px-4 py-2 flex items-center border-b border-gray-300">
            <input 
              type="text" 
              value={url} 
              readOnly
              className="flex-grow px-3 py-1 rounded border border-gray-300 bg-white text-sm"
            />
            <button 
              className="ml-2 p-1 hover:bg-gray-300 rounded"
              onClick={() => handleOpenInNewTab(url)}
              title="Open in new tab"
            >
              <ExternalLink size={16} />
            </button>
          </div>
        )}
        
        {/* Window Content */}
        <div 
          ref={contentRef}
          className="flex-grow bg-white overflow-auto"
        >
          {url ? (
            <div className="w-full h-full relative">
              {!iframeError && (
                <iframe 
                  src={url} 
                  title={`${title} Content`}
                  className="w-full h-full border-none"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  onLoad={(e) => {
                    try {
                      // Check if the iframe loaded successfully
                      const iframeDoc = e.target.contentDocument || e.target.contentWindow.document;
                      if (!iframeDoc) {
                        handleIframeError();
                      }
                    } catch (err) {
                      // This error is expected for cross-origin iframes
                      console.log("Cross-origin iframe detected");
                      // Don't immediately mark as error - some sites work even with cross-origin restrictions
                    }
                  }}
                  onError={handleIframeError}
                />
              )}
              
              {iframeError && (
                <div className="h-full flex flex-col">
                  {/* Simulated browser content */}
                  <div className="bg-white p-4 flex-grow flex flex-col items-center justify-center">
                    <div className="max-w-md w-full bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900">Content Cannot Be Displayed</h3>
                      </div>
                      
                      <div className="mb-4 text-gray-700">
                        <p className="mb-2"><strong>{url}</strong> has security measures that prevent it from being embedded in frames.</p>
                        <p>This is a standard security practice implemented by many websites to protect their users.</p>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded border border-blue-100 text-sm text-blue-800">
                        <p className="font-medium mb-1">Why this happens:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Content Security Policy restrictions</li>
                          <li>X-Frame-Options headers</li>
                          <li>Cross-origin resource protections</li>
                        </ul>
                      </div>
                      
                      <button 
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full"
                        onClick={() => window.open(url, '_blank')}
                      >
                        Open in New Tab
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Suspense fallback={<div className="p-4">Loading...</div>}>
              <ContentRouter path={path} windowSize={windowSizePixels} onOpenUrl={onOpenUrl} />
            </Suspense>
          )}
        </div>
        
        {/* Status Bar */}
        <div className="bg-gray-200 px-4 py-1 text-xs text-gray-600 border-t border-gray-300 flex justify-between">
          <div>Status: {iframeError ? "Error" : "Ready"}</div>
          <div>
            {url || path || "Local"} 
            {windowSizePixels.width > 0 && ` • ${windowSizePixels.width}×${windowSizePixels.height}px`}
          </div>
        </div>
        
        {/* Resize handle */}
        <div 
          className={`absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-10 ${isMaximized ? 'hidden' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = modalRef.current.offsetWidth;
            const startHeight = modalRef.current.offsetHeight;
            
            const handleMouseMove = (moveEvent) => {
              const newWidth = startWidth + (moveEvent.clientX - startX);
              const newHeight = startHeight + (moveEvent.clientY - startY);
              
              // Set minimum size
              const minWidth = 400;
              const minHeight = 300;
              
              if (newWidth > minWidth && newHeight > minHeight) {
                setWindowSize({
                  width: `${newWidth}px`,
                  height: `${newHeight}px`
                });
              }
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />
      </div>
    </div>
  );
};

export default WindowsModal;