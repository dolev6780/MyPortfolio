import React, { useState, useEffect } from 'react';
import { Folder, FileText, Mail, Gamepad2, Calculator, Contact } from 'lucide-react';
import WindowsModal from '../components/WindowsModal';

/**
 * Desktop Component
 * Main component that renders a desktop-like environment with icons and windows
 */
export default function Desktop() {
  // --- STATE MANAGEMENT ---
  const [icons, setIcons] = useState([
    { id: 1, name: 'About Me', icon: Contact, gridX: 0, gridY: 0, path: "aboutme" },
    { id: 2, name: 'Projects', icon: Folder, gridX: 0, gridY: 1, path: "projects" },
    { id: 3, name: 'Games', icon: Gamepad2, gridX: 0, gridY: 2, path: "games" },
    { id: 4, name: 'My Resume', icon: FileText, gridX: 0, gridY: 3, path: "cv" },
    { id: 5, name: 'Calculator', icon: Calculator, gridX: 0, gridY: 4, path: "calculator" },
    { id: 6, name: 'Contact Me', icon: Mail, gridX: 0, gridY: 5, path: "contactme" },
  ]);

  const [draggedIcon, setDraggedIcon] = useState(null);
  const [selectedIconId, setSelectedIconId] = useState(null);
  const [gridSize, setGridSize] = useState(80);
  const [gridColumns, setGridColumns] = useState(10);
  const [gridRows, setGridRows] = useState(6);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(100);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- EFFECTS ---

  // Effect for updating the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Effect for responsive grid calculation
  useEffect(() => {
    const updateGridDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let newGridSize = width < 640 ? 60 : (width < 1024 ? 70 : 80);
      
      setGridSize(newGridSize);
      setGridColumns(Math.floor(width / newGridSize));
      setGridRows(Math.floor((height - 48) / newGridSize)); // 48px for taskbar
    };

    updateGridDimensions();
    window.addEventListener('resize', updateGridDimensions);
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, []);

  // --- EVENT HANDLERS ---

  const handleDesktopClick = (e) => {
    // Deselect icon if clicking on the desktop, grid, or video background
    if (e.target === e.currentTarget || e.target.classList.contains('grid-container') || e.target.tagName === 'VIDEO') {
      setSelectedIconId(null);
    }
  };

  const handleDragStart = (e, icon) => {
    setDraggedIcon(icon);
    // Use a transparent ghost image for a cleaner drag effect
    const ghost = new Image();
    ghost.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(ghost, 0, 0);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, targetX, targetY) => {
    e.preventDefault();
    if (!draggedIcon) return;

    const updatedIcons = icons.map(icon => {
      if (icon.id === draggedIcon.id) {
        return { ...icon, gridX: targetX, gridY: targetY };
      }
      // If another icon is at the drop target, swap positions
      if (icon.gridX === targetX && icon.gridY === targetY) {
        return { ...icon, gridX: draggedIcon.gridX, gridY: draggedIcon.gridY };
      }
      return icon;
    });

    setIcons(updatedIcons);
    setDraggedIcon(null);
  };

  const handleIconSelect = (e, icon) => {
    e.stopPropagation();
    setSelectedIconId(icon.id);
  };

  const openWindow = (icon) => {
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    const windowObj = { ...icon, zIndex: newZIndex };
    setOpenWindows(prev => [...prev, windowObj]);
    setActiveWindowId(icon.id);
  };

  const focusWindow = (iconId) => {
    const newZIndex = zIndexCounter + 1;
    setZIndexCounter(newZIndex);
    setOpenWindows(prev => prev.map(w => w.id === iconId ? { ...w, zIndex: newZIndex } : w));
    setActiveWindowId(iconId);
    if (minimizedWindows.includes(iconId)) {
      setMinimizedWindows(prev => prev.filter(id => id !== iconId));
    }
  };

  const handleIconDoubleClick = (icon) => {
    const existingWindow = openWindows.find(w => w.id === icon.id);
    if (existingWindow) {
      focusWindow(icon.id);
    } else {
      openWindow(icon);
    }
  };

  const handleCloseWindow = (windowId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    setMinimizedWindows(prev => prev.filter(id => id !== windowId));

    if (activeWindowId === windowId) {
      const remainingWindows = openWindows.filter(w => w.id !== windowId && !minimizedWindows.includes(w.id));
      if (remainingWindows.length > 0) {
        const topWindow = remainingWindows.reduce((a, b) => a.zIndex > b.zIndex ? a : b);
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // --- RENDER LOGIC ---

  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridColumns; x++) {
        const iconAtPosition = icons.find(icon => icon.gridX === x && icon.gridY === y);
        grid.push(
          <div
            key={`${x}-${y}`}
            className="relative"
            style={{ width: `${gridSize}px`, height: `${gridSize}px` }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, x, y)}
          >
            {iconAtPosition && (
              <div
                className={`flex flex-col items-center justify-center h-full w-full cursor-pointer rounded-md transition-colors duration-150
                  ${selectedIconId === iconAtPosition.id ? 'bg-blue-500 bg-opacity-40' : 'hover:bg-white/10'}
                  ${draggedIcon?.id === iconAtPosition.id ? 'opacity-40' : ''}
                `}
                draggable
                onDragStart={(e) => handleDragStart(e, iconAtPosition)}
                onClick={(e) => handleIconSelect(e, iconAtPosition)}
                onDoubleClick={() => handleIconDoubleClick(iconAtPosition)}
              >
                <div className="flex items-center justify-center mb-1">
                  {React.createElement(iconAtPosition.icon, {
                    size: gridSize < 70 ? 24 : 32,
                    color: "white"
                  })}
                </div>
                <div className="text-center text-xs w-full text-white px-1 truncate">
                  {iconAtPosition.name}
                </div>
              </div>
            )}
          </div>
        );
      }
    }
    return grid;
  };

  return (
    <div
      className="w-full h-screen overflow-hidden p-0 m-0 relative select-none"
      onClick={handleDesktopClick}
    >
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute w-full h-full left-1/2 top-1/2 object-cover transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <source src="/backgroundVideo.mp4" type="video/mp4" />
      </video>

      {/* Desktop Icon Grid */}
      <div
        className="grid-container absolute top-0 left-0 p-2"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, ${gridSize}px)`,
          gridTemplateRows: `repeat(${gridRows}, ${gridSize}px)`,
        }}
      >
        {renderGrid()}
      </div>

      {/* Windows */}
      {openWindows.map((window) => (
        <WindowsModal
          key={window.id}
          isOpen={true}
          onClose={() => handleCloseWindow(window.id)}
          onMinimize={() => setMinimizedWindows(prev => [...prev, window.id])}
          onFocus={() => focusWindow(window.id)}
          title={window.name}
          path={window.path}
          initialPosition={{
            x: `${10 + (openWindows.indexOf(window) % 5 * 3)}vw`,
            y: `${10 + (Math.floor(openWindows.indexOf(window) / 5) * 5)}vh`
          }}
          isMinimized={minimizedWindows.includes(window.id)}
          zIndex={window.zIndex}
          isActive={activeWindowId === window.id}
        />
      ))}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/80 flex items-center px-2 border-t border-gray-700/50 backdrop-blur-md">
        <div className="w-10 h-10 flex items-center justify-center text-white mr-2 hover:bg-blue-500 rounded transition-colors duration-200 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z" />
          </svg>
        </div>
        <div className="flex space-x-1 overflow-x-auto flex-grow">
          {openWindows.map(window => (
            <div
              key={window.id}
              className={`h-9 px-3 flex items-center rounded-md transition-all duration-200 cursor-pointer border-b-2
                ${activeWindowId === window.id && !minimizedWindows.includes(window.id) 
                  ? 'bg-white/20 border-blue-400' 
                  : 'bg-white/5 border-transparent hover:bg-white/10'}
                ${minimizedWindows.includes(window.id) ? 'opacity-60' : ''}
              `}
              onClick={() => focusWindow(window.id)}
            >
              {React.createElement(window.icon, { size: 16, color: 'white', className: 'mr-2 flex-shrink-0' })}
              <span className="text-white text-sm truncate max-w-xs">{window.name}</span>
            </div>
          ))}
        </div>
        <div className="text-white text-xs text-center px-4">
          <div>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div>{currentTime.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' })}</div>
        </div>
      </div>
    </div>
  );
}
