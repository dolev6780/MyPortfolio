import React, { useState, useEffect } from 'react';
import { Folder, FileText, Mail, Gamepad2, Calculator, Contact, MoreHorizontal } from 'lucide-react';

/**
 * Placeholder component for rendering the content of an "app".
 * In a real application, this would likely use the 'path' to dynamically import
 * and render the correct component (e.g., AboutMe, Projects).
 */
const AppContent = ({ app, onGoHome }) => (
  <div className="p-4 bg-gray-100 text-gray-800 h-full">
    <h2 className="text-2xl font-bold mb-4">{app.name}</h2>
    <p>This is the content for the {app.name} application.</p>
    <p>Path: <code>{app.path}</code></p>
    <button onClick={onGoHome} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg">Go Back</button>
  </div>
);

/**
 * Mobile Component
 * Renders an Android-like OS environment for mobile and tablet views.
 */
export default function Mobile() {
  // --- STATE MANAGEMENT ---
  const [apps, setApps] = useState([
    // Docked Apps
    { id: 1, name: 'About Me', icon: Contact, path: "aboutme", isDocked: true },
    { id: 6, name: 'Contact Me', icon: Mail, path: "contactme", isDocked: true },
    { id: 5, name: 'Calculator', icon: Calculator, path: "calculator", isDocked: true },
    { id: 2, name: 'Projects', icon: Folder, path: "projects", isDocked: true },
    // Home Screen Apps
    { id: 3, name: 'Games', icon: Gamepad2, path: "games", isDocked: false },
    { id: 4, name: 'My Resume', icon: FileText, path: "cv", isDocked: false },
  ]);

  const [openApp, setOpenApp] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // --- DERIVED STATE ---
  const homeScreenApps = apps.filter(app => !app.isDocked);
  const dockedApps = apps.filter(app => app.isDocked);

  // --- EFFECTS ---

  // Effect for updating the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // --- EVENT HANDLERS ---

  const handleOpenApp = (app) => {
    setOpenApp(app);
    setDrawerOpen(false); // Close drawer when an app is opened
  };

  const handleGoHome = () => {
    setOpenApp(null);
  };
  
  const handleToggleDrawer = () => {
    setDrawerOpen(prev => !prev);
  };

  // --- RENDER LOGIC ---

  const renderIcon = (app, isDrawerIcon = false) => (
    <div
      key={app.id}
      className="flex flex-col items-center justify-center text-center cursor-pointer group"
      onClick={() => handleOpenApp(app)}
    >
      <div className={`
        w-14 h-14 rounded-2xl bg-gray-200/20 flex items-center justify-center 
        transition-all duration-200 group-hover:bg-blue-500 group-hover:scale-110
        ${isDrawerIcon ? 'w-16 h-16' : ''}
      `}>
        {React.createElement(app.icon, { size: 32, color: "white" })}
      </div>
      <span className={`text-white text-xs mt-2 w-full truncate px-1 ${isDrawerIcon ? 'text-sm' : ''}`}>
        {app.name}
      </span>
    </div>
  );

  // Main render return
  return (
    <div className="w-full h-screen overflow-hidden relative select-none bg-gray-900">
      {/* Video Background */}
      <video autoPlay loop muted playsInline className="absolute w-full h-full left-1/2 top-1/2 object-cover transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-40">
        <source src="/backgroundVideo.mp4" type="video/mp4" />
      </video>
      
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Status Bar */}
        <div className="w-full h-8 px-4 flex justify-end items-center text-white text-sm">
          <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* --- Main Content: Home Screen or Open App --- */}
        <main className="flex-grow w-full h-[calc(100%-8rem)] p-4">
          {openApp ? (
            // Render the open application view
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-fade-in">
               <AppContent app={openApp} onGoHome={handleGoHome} />
            </div>
          ) : (
            // Render the Home Screen icons
            <div className="grid grid-cols-4 gap-y-6">
              {homeScreenApps.map(app => renderIcon(app))}
            </div>
          )}
        </main>

        {/* --- App Drawer --- */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-xl rounded-t-3xl transition-transform duration-300 ease-in-out z-20
            ${isDrawerOpen ? 'transform-none' : 'translate-y-[calc(100%-6rem)]'}
          `}
          style={{ height: '70vh' }}
        >
          <div className="p-5">
            <div className="w-10 h-1 bg-gray-500 rounded-full mx-auto mb-6 cursor-pointer" onClick={handleToggleDrawer}></div>
            <div className="grid grid-cols-4 gap-y-8">
              {apps.map(app => renderIcon(app, true))}
            </div>
          </div>
        </div>
        
        {/* --- Navigation & Dock --- */}
        <footer className="w-full h-24 flex flex-col justify-end z-10">
          {/* Dock */}
          <div className="mx-auto mb-4 p-2 w-full max-w-sm h-20 bg-black/40 backdrop-blur-lg rounded-3xl flex justify-around items-center">
            {dockedApps.map(app => renderIcon(app))}
             {/* Drawer Toggle Button */}
            <div
              className="flex flex-col items-center justify-center text-center cursor-pointer group"
              onClick={handleToggleDrawer}
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-200/20 flex items-center justify-center transition-all duration-200 group-hover:bg-white/30 group-hover:scale-110">
                <MoreHorizontal size={32} color="white" />
              </div>
            </div>
          </div>

          {/* Android-style navigation buttons (optional, can be controlled by a parent component) */}
          <div className="w-32 h-1.5 bg-white rounded-full mx-auto mb-2 cursor-pointer" onClick={handleGoHome}></div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}