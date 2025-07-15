import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Folder, FileText, Mail, Gamepad2, Calculator as CalculatorIcon, Contact, MoreHorizontal, Home, Sun, Wifi, Battery, X, Divide, Minus, Plus, Percent, ArrowLeft, Cloud, CloudSun, CloudRain } from 'lucide-react';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import ContactMe from '../components/ContactMe';
import Games from '../components/Games';
import Resume from '../components/Resume';
import Calculator from '../components/Calculator';
import Weather from '../components/Weather';

const APPS_CONFIG = [
    { id: 'about', name: 'About Me', icon: Contact, isDocked: true, component: 'AboutMe' },
    { id: 'projects', name: 'Projects', icon: Folder, isDocked: true, component: 'Projects' },
    { id: 'contact', name: 'Contact Me', icon: Mail, isDocked: true, component: 'ContactMe' },
    { id: 'more', name: 'More Apps', icon: MoreHorizontal, isDocked: true, isDrawerToggle: true },
    { id: 'games', name: 'Games', icon: Gamepad2, isDocked: false, component: 'Games' },
    { id: 'resume', name: 'My Resume', icon: FileText, isDocked: false, component: 'Resume' },
    { id: 'calculator', name: 'Calculator', icon: CalculatorIcon, isDocked: false, component: 'Calculator' },
];

const APP_COMPONENTS = {
    AboutMe, Projects, ContactMe, Games, Resume, Calculator, Weather
};

const AppIcon = ({ app, onClick, isDrawerIcon = false }) => (
    <div
        className="flex flex-col items-center justify-center text-center group h-full"
        onClick={onClick ? () => onClick(app) : undefined}
    >
        <div className={`
            w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center 
            transition-all duration-300 group-hover:bg-purple-500/50 group-hover:scale-110
            ${isDrawerIcon ? 'w-16 h-16' : 'w-14 h-14'}`}>
            {React.createElement(app.icon, { size: isDrawerIcon ? 36 : 30, color: "white", strokeWidth: 1.5 })}
        </div>
        <span className={`text-white text-xs mt-2 w-full truncate px-1 ${isDrawerIcon ? 'text-sm' : ''}`}>
            {app.name}
        </span>
    </div>
);

const AppContainer = ({ app, onGoHome }) => {
    const AppComponent = APP_COMPONENTS[app.component];
    if (!AppComponent) return null;

    return (
        <div className="w-full h-full bg-gray-50 rounded-3xl overflow-hidden shadow-2xl animate-app-open">
            <div className="h-full flex flex-col">
                <header className="flex-shrink-0 p-2 bg-gray-100 border-b flex items-center justify-between z-10">
                    <button onClick={onGoHome} className="p-2 rounded-full hover:bg-gray-200">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <span className="font-semibold text-gray-700">{app.name}</span>
                    <div className="w-8"></div>
                </header>
                <main className="flex-grow overflow-y-auto">
                    <AppComponent />
                </main>
            </div>
        </div>
    );
};

const DraggableItem = ({ children, index, className, onDragStart, onDragEnter, onDragEnd, onClick }) => {
    const longPressTimer = useRef();
    const startPos = useRef({ x: 0, y: 0 });
    const [isLongPress, setIsLongPress] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleInteractionStart = (x, y) => {
        startPos.current = { x, y };
        longPressTimer.current = setTimeout(() => {
            setIsLongPress(true);
        }, 500);
    };

    const handleInteractionMove = (x, y) => {
        const dx = Math.abs(x - startPos.current.x);
        const dy = Math.abs(y - startPos.current.y);
        if (dx > 10 || dy > 10) {
            clearTimeout(longPressTimer.current);
        }
    };

    const handleInteractionEnd = () => {
        clearTimeout(longPressTimer.current);
        if (!isLongPress) {
            onClick();
        }
        setTimeout(() => setIsLongPress(false), 50);
    };

    const handleDragStartInternal = (e) => {
        if (!isLongPress) {
            e.preventDefault();
            return;
        }
        setIsDragging(true);
        onDragStart(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEndInternal = () => {
        setIsDragging(false);
        onDragEnd();
        setIsLongPress(false);
    };

    return (
        <div
            draggable={isLongPress}
            onMouseDown={(e) => handleInteractionStart(e.clientX, e.clientY)}
            onMouseUp={handleInteractionEnd}
            onMouseMove={(e) => handleInteractionMove(e.clientX, e.clientY)}
            onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleInteractionEnd}
            onTouchMove={(e) => handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY)}
            onDragStart={handleDragStartInternal}
            onDragEnter={() => onDragEnter(index)}
            onDragEnd={handleDragEndInternal}
            onDragOver={(e) => e.preventDefault()}
            className={`${className} transition-transform duration-200 cursor-pointer 
                ${isDragging ? 'opacity-50 scale-110 z-50' : ''}
                ${isLongPress && !isDragging ? 'animate-pulse scale-105' : ''}
            `}
        >
            {children}
        </div>
    );
};

const HomeScreen = ({ items, setItems, onOpenApp }) => {
    const dragItemIndex = useRef(null);
    const dragOverItemIndex = useRef(null);

    const handleDragStart = (index) => {
        dragItemIndex.current = index;
    };

    const handleDragEnter = (index) => {
        dragOverItemIndex.current = index;
    };

    const handleDragEnd = () => {
        if (dragItemIndex.current === null || dragOverItemIndex.current === null || dragItemIndex.current === dragOverItemIndex.current) {
            return;
        }
        const newItems = [...items];
        const draggedItem = newItems.splice(dragItemIndex.current, 1)[0];
        newItems.splice(dragOverItemIndex.current, 0, draggedItem);
        dragItemIndex.current = null;
        dragOverItemIndex.current = null;
        setItems(newItems);
    };

    return (
        <div className="grid grid-cols-4 gap-x-4 gap-y-8 p-4 pt-8 animate-fade-in">
            {items.map((item, index) => (
                <DraggableItem
                    key={item.id}
                    index={index}
                    className={item.type === 'widget' ? 'col-span-4 h-32' : 'col-span-1 h-20'}
                    onDragStart={handleDragStart}
                    onDragEnter={handleDragEnter}
                    onDragEnd={handleDragEnd}
                    onClick={() => {
                        if (item.type !== 'widget') {
                            onOpenApp(item);
                        }
                    }}
                >
                    {item.type === 'widget' ? <Weather /> : <AppIcon app={item} />}
                </DraggableItem>
            ))}
        </div>
    );
};

const Dock = ({ apps, onOpenApp, onToggleDrawer }) => (
    <div className="mx-auto mb-3 p-2 w-full max-w-sm h-20 bg-black/30 backdrop-blur-xl rounded-3xl flex justify-around items-center">
        {apps.map(app => (
            <AppIcon
                key={app.id}
                app={app}
                onClick={app.isDrawerToggle ? onToggleDrawer : onOpenApp}
            />
        ))}
    </div>
);

const AppDrawer = ({ isOpen, onToggleDrawer, apps, onOpenApp }) => {
    const touchStartY = useRef(0);
    const drawerRef = useRef(null);

    const handleTouchStart = (e) => {
        touchStartY.current = e.targetTouches[0].clientY;
    };

    const handleTouchMove = (e) => {
        const touchCurrentY = e.targetTouches[0].clientY;
        const deltaY = touchCurrentY - touchStartY.current;
        if (deltaY > 50) { // Swipe down to close
            onToggleDrawer();
        }
    };

    return (
        <div
            ref={drawerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className={`
            absolute top-0 left-0 right-0 h-full bg-black/70 backdrop-blur-2xl
            transition-transform duration-500 ease-in-out z-40
            ${isOpen ? 'transform-none' : 'translate-y-full'}
        `}>
            <div className="p-5 h-full flex flex-col">
                <div
                    className="w-full flex justify-center py-4 flex-shrink-0"
                    onClick={onToggleDrawer}
                >
                    <div className="w-10 h-1.5 bg-gray-500 rounded-full cursor-pointer"></div>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    <div className="grid grid-cols-4 gap-y-8 mt-4">
                        {apps.map(app => (
                            <div key={app.id} className="cursor-pointer" onClick={() => { onOpenApp(app); onToggleDrawer(); }}>
                                <AppIcon app={app} isDrawerIcon={true} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function App() {
    const [openApp, setOpenApp] = useState(null);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const [homeItems, setHomeItems] = useState([
        { id: 'weather', type: 'widget', component: 'WeatherWidget' },
        ...APPS_CONFIG.filter(app => !app.isDocked && !app.isDrawerToggle)
    ]);

    const dockedApps = useMemo(() => APPS_CONFIG.filter(app => app.isDocked), []);
    const allApps = useMemo(() => APPS_CONFIG.filter(app => !app.isDrawerToggle), []);
    
    const touchStartY = useRef(0);

    const handleOpenApp = (app) => {
        if (app.component) {
            setOpenApp(app);
            setDrawerOpen(false);
        }
    };

    const handleGoHome = () => setOpenApp(null);
    const handleToggleDrawer = () => setDrawerOpen(prev => !prev);

    const handleTouchStart = (e) => {
        touchStartY.current = e.targetTouches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;
        // If swipe up is significant and from the bottom of the screen
        if (deltaY > 75 && touchStartY.current > window.innerHeight - 150) {
            if (!openApp) {
               handleToggleDrawer();
            }
        }
    };

    return (
        <div
            className="w-full h-screen overflow-hidden relative select-none bg-gray-900 font-sans"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <img
                className="absolute w-full h-full left-1/2 top-1/2 object-cover transform -translate-x-1/2 -translate-y-1/2 z-0"
                src="https://images.unsplash.com/photo-1576686271399-2349d0a35883?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzOTAzMDB8MHwxfGFsbHx8fHx8fHx8fDE3MjA4ODQ5NjZ8&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Mobile wallpaper"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/1080x1920/1a202c/ffffff?text=Image+Error'; }}
            />
            <div className="relative z-10 w-full h-full flex flex-col">
                <main className="flex-grow w-full h-full">
                    {openApp ? (
                        <AppContainer app={openApp} onGoHome={handleGoHome} />
                    ) : (
                        <HomeScreen items={homeItems} setItems={setHomeItems} onOpenApp={handleOpenApp} />
                    )}
                </main>
                
                <AppDrawer
                    isOpen={isDrawerOpen}
                    onToggleDrawer={handleToggleDrawer}
                    apps={allApps}
                    onOpenApp={handleOpenApp}
                />
                
                {!openApp && (
                    <footer className="absolute bottom-0 w-full h-24 flex flex-col justify-end z-20">
                        <Dock apps={dockedApps} onOpenApp={handleOpenApp} onToggleDrawer={handleToggleDrawer} />
                        <div className="w-32 h-1.5 bg-white/80 rounded-full mx-auto mb-2 cursor-pointer" onClick={handleGoHome}></div>
                    </footer>
                )}
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');
                .font-sans { font-family: 'Inter', sans-serif; }
                
                @keyframes app-open {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-app-open {
                    animation: app-open 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
}
