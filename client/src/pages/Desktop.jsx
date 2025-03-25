// This is a modified version of your Desktop.js file
import React, { useState, useEffect } from 'react';
import { Folder, FileText, Monitor, Settings, Mail, Globe, Database, Gamepad2, Calculator, Contact } from 'lucide-react';
import WindowsModal from '../components/WindowsModal';

/**
 * Desktop Component
 * Main component that renders a desktop-like environment with icons and windows
 */
export default function Desktop() {
  // Icons data with position information and paths
  const [icons, setIcons] = useState([
    { id: 1, name: 'About Me', icon: Contact, gridX: 0, gridY: 0, path: "aboutme" },
    { id: 2, name: 'Projects', icon: Folder, gridX: 0, gridY: 1, path: "projects" },
    { id: 3, name: 'Games', icon: Gamepad2, gridX: 0, gridY: 2, path: "games" },
    { id: 4, name: 'My Resume', icon: FileText, gridX: 0, gridY: 3, path: "cv" },
    { id: 5, name: 'Calculator', icon: Calculator, gridX: 0, gridY: 4, path: "calculator" },
    { id: 6, name: 'Contact Me', icon: Mail, gridX: 0, gridY: 5, path: "contactme" },
  ]);

  // Track the icon being dragged
  const [draggedIcon, setDraggedIcon] = useState(null);
  
  // Track the currently selected icon
  const [selectedIconId, setSelectedIconId] = useState(null);
  
  // Responsive grid configuration
  const [gridSize, setGridSize] = useState(80);
  const [gridColumns, setGridColumns] = useState(10);
  const [gridRows, setGridRows] = useState(6);
  
  // Window management
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [zIndexCounter, setZIndexCounter] = useState(100);
  
  // Counter for generating unique IDs for dynamically opened windows
  const [nextDynamicId, setNextDynamicId] = useState(100);

  // Window z-index management - higher z-index appears on top
  const getWindowZIndex = (windowId) => {
    const window = openWindows.find(w => w.id === windowId);
    return window ? window.zIndex : 100;
  };

  // Clear selection when clicking on desktop background
  const handleDesktopClick = (e) => {
    // Only clear if clicking directly on the desktop, not on an icon or window
    if (e.target === e.currentTarget || e.target.classList.contains('grid')) {
      setSelectedIconId(null);
    }
  };

  // Update grid configuration based on screen size
  useEffect(() => {
    const updateGridDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate optimal grid cell size and number of columns/rows
      let newGridSize;
      
      if (width < 640) { // Small screens
        newGridSize = 60;
      } else if (width < 1024) { // Medium screens
        newGridSize = 70;
      } else { // Large screens
        newGridSize = 80;
      }
      
      const newGridColumns = Math.floor(width / newGridSize);
      const newGridRows = Math.floor((height - 48) / newGridSize); // Subtract taskbar height
      
      setGridSize(newGridSize);
      setGridColumns(newGridColumns);
      setGridRows(newGridRows);
    };
    
    // Set initial dimensions
    updateGridDimensions();
    
    // Update dimensions when window is resized
    window.addEventListener('resize', updateGridDimensions);
    
    // Clean up
    return () => window.removeEventListener('resize', updateGridDimensions);
  }, []);

  // Handle drag start
  const handleDragStart = (e, icon) => {
    setDraggedIcon(icon);
    // Create a ghost image for dragging
    const ghost = document.createElement('div');
    ghost.style.opacity = '0';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 0, 0);
  };

  // Handle drag over a grid cell
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  // Handle dropping an icon
  const handleDrop = (e, targetX, targetY) => {
    e.preventDefault();
    
    if (draggedIcon) {
      // Update the position of the dragged icon
      const updatedIcons = icons.map(icon => {
        if (icon.id === draggedIcon.id) {
          return { ...icon, gridX: targetX, gridY: targetY };
        }
        // Check if there's already an icon at the target position
        // If so, swap their positions
        if (icon.gridX === targetX && icon.gridY === targetY) {
          return { ...icon, gridX: draggedIcon.gridX, gridY: draggedIcon.gridY };
        }
        return icon;
      });
      
      setIcons(updatedIcons);
      setDraggedIcon(null);
    }
  };
  
  // Handle icon selection (single click)
  const handleIconSelect = (e, icon) => {
    e.stopPropagation(); // Prevent event from bubbling to desktop
    setSelectedIconId(icon.id);
  };
  
  // Handle opening a URL in a new window from within another component
  const handleOpenUrlInNewWindow = (url, title) => {
    // Generate a unique ID for this new window
    const newId = nextDynamicId;
    setNextDynamicId(prev => prev + 1);
    
    // Create a window object
    const windowObj = {
      id: newId,
      name: title || url,
      icon: Globe,
      url: url,
      zIndex: zIndexCounter + 1
    };
    
    // Increment z-index counter
    setZIndexCounter(prev => prev + 1);
    
    // Add window to open windows
    setOpenWindows(prev => [...prev, windowObj]);
    
    // Set as active window
    setActiveWindowId(newId);
    
    // Make sure it's not minimized
    setMinimizedWindows(prev => prev.filter(id => id !== newId));
    
    // Return the window ID in case it's needed
    return newId;
  };
  
  // Handle icon click to open window (double click)
  const handleIconClick = (icon) => {
    const existingWindowIndex = openWindows.findIndex(w => w.id === icon.id);
    
    if (existingWindowIndex !== -1) {
      // Window already open
      
      // If minimized, restore it
      if (minimizedWindows.includes(icon.id)) {
        setMinimizedWindows(prev => prev.filter(id => id !== icon.id));
      }
      
      // Make this window active and bring to front
      setActiveWindowId(icon.id);
      const newZIndex = zIndexCounter + 1;
      setZIndexCounter(newZIndex);
      
      // Update z-index
      setOpenWindows(prev => prev.map(w => 
        w.id === icon.id ? { ...w, zIndex: newZIndex } : w
      ));
    } else {
      // Create new window with next available z-index
      const newZIndex = zIndexCounter + 1;
      setZIndexCounter(newZIndex);
      
      const windowObj = {
        ...icon,
        zIndex: newZIndex
      };
      
      setOpenWindows(prev => [...prev, windowObj]);
      setActiveWindowId(icon.id);
    }
  };
  
  // Handle window minimize
  const handleMinimizeWindow = (windowId) => {
    setMinimizedWindows(prev => [...prev, windowId]);
  };
  
  // Handle window close
  const handleCloseWindow = (windowId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    setMinimizedWindows(prev => prev.filter(id => id !== windowId));
    
    // If closing the active window, set a new active window
    if (activeWindowId === windowId) {
      const remainingWindows = openWindows.filter(w => w.id !== windowId);
      
      if (remainingWindows.length > 0) {
        // Find the window with highest z-index (most recently active)
        const topWindow = remainingWindows.reduce((prev, curr) => 
          (curr.zIndex > prev.zIndex && !minimizedWindows.includes(curr.id)) ? curr : prev, 
          remainingWindows[0]
        );
        
        setActiveWindowId(topWindow ? topWindow.id : null);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Generate the grid cells for desktop icons
  const renderGrid = () => {
    const grid = [];
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridColumns; x++) {
        // Find icon at this position
        const iconAtPosition = icons.find(icon => icon.gridX === x && icon.gridY === y);
        
        grid.push(
          <div
            key={`${x}-${y}`}
            className="relative border border-dashed border-transparent hover:border-blue-200"
            style={{
              width: `${gridSize}px`,
              height: `${gridSize}px`,
            }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, x, y)}
          >
            {iconAtPosition && (
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer p-1 
                  ${selectedIconId === iconAtPosition.id ? 'bg-blue-500 bg-opacity-30 rounded' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, iconAtPosition)}
                onClick={(e) => handleIconSelect(e, iconAtPosition)}
                onDoubleClick={() => handleIconClick(iconAtPosition)}
              >
                <div className="flex items-center justify-center mb-1">
                  {React.createElement(iconAtPosition.icon, { 
                    size: gridSize < 70 ? 20 : 24,
                    color: selectedIconId === iconAtPosition.id ? "white" : "#ffffffcc"
                  })}
                </div>
                <div 
                  className={`text-center text-xs w-full bg-black bg-opacity-40 text-white px-1 rounded
                    ${selectedIconId === iconAtPosition.id ? 'overflow-visible whitespace-normal' : 'truncate'}`}
                >
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
      className="bg-neutral-800 w-full h-screen overflow-hidden p-0 m-0 relative"
      style={{
        backgroundImage: "url('/api/placeholder/1920/1080')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      onClick={handleDesktopClick}
    >
      {/* Desktop Icon Grid */}
      <div 
        className="grid gap-0 p-2 pb-16"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, ${gridSize}px)`,
          gridTemplateRows: `repeat(${gridRows}, ${gridSize}px)`,
          width: `${gridColumns * gridSize}px`,
          height: `${gridRows * gridSize}px`,
        }}
      >
        {renderGrid()}
      </div>
      
      {/* Windows Modal Windows */}
      {openWindows.map((window) => (
        <WindowsModal
          key={window.id}
          isOpen={true} // Always render the window in DOM
          onClose={() => handleCloseWindow(window.id)}
          onMinimize={() => handleMinimizeWindow(window.id)}
          title={window.name}
          url={window.url}
          path={window.path}
          onOpenUrl={handleOpenUrlInNewWindow} // Pass the function to open URLs
          initialPosition={{ 
            x: `${10 + (openWindows.indexOf(window) % 3 * 5)}%`, 
            y: `${10 + (Math.floor(openWindows.indexOf(window) / 3) * 5)}%` 
          }}
          isMinimized={minimizedWindows.includes(window.id)}
        />
      ))}
      
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900 bg-opacity-80 flex items-center px-2 border-t border-gray-700 backdrop-blur-sm">
        <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white mr-2 hover:bg-blue-500 transition-colors duration-200 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z"/>
          </svg>
        </div>
        
        {/* Open windows in taskbar */}
        <div className="flex space-x-1 overflow-x-auto flex-grow">
          {openWindows.map(window => (
            <div 
              key={window.id} 
              className={`h-10 px-3 flex items-center rounded 
                ${activeWindowId === window.id && !minimizedWindows.includes(window.id) ? 'bg-gray-700' : 'bg-gray-800'} 
                ${minimizedWindows.includes(window.id) ? 'opacity-70' : 'opacity-100'}
                hover:bg-gray-700 transition-colors duration-200 cursor-pointer`}
              onClick={() => {
                // If window is minimized, restore it
                if (minimizedWindows.includes(window.id)) {
                  setMinimizedWindows(prev => prev.filter(id => id !== window.id));
                }
                
                // Make active and bring to front
                setActiveWindowId(window.id);
                const newZIndex = zIndexCounter + 1;
                setZIndexCounter(newZIndex);
                setOpenWindows(prev => prev.map(w => 
                  w.id === window.id ? { ...w, zIndex: newZIndex } : w
                ));
              }}
            >
              {React.createElement(window.icon, { size: 16, color: 'white', className: 'mr-2' })}
              <span className="text-white text-sm truncate max-w-xs">{window.name}</span>
            </div>
          ))}
        </div>
        
        <div className="text-white text-xs pr-2 pl-4">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}