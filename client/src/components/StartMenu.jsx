import React, { useRef, useEffect } from 'react';
import { Power } from 'lucide-react';

const StartMenu = ({ isOpen, onClose, apps, onAppClick, onLogoutRequest }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="absolute bottom-12 left-2 w-[400px] h-[500px] bg-gray-900/60 backdrop-blur-xl border border-white/20 rounded-t-xl rounded-r-xl shadow-2xl flex flex-col z-50 animate-slide-up origin-bottom-left overflow-hidden"
        >
            {/* Pinned Section */}
            <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
                <h3 className="text-white/60 text-xs font-semibold mb-4 ml-2">Pinned</h3>
                <div className="grid grid-cols-4 gap-4">
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            onClick={() => {
                                onAppClick(app);
                                onClose();
                            }}
                            className="flex flex-col items-center justify-center p-2 rounded hover:bg-white/10 cursor-pointer transition-colors duration-200 group"
                        >
                            <div className="bg-white/5 p-2 rounded-lg mb-2 group-hover:bg-white/10 transition-colors">
                                {React.createElement(app.icon, { size: 32, color: "white" })}
                            </div>
                            <span className="text-white text-xs text-center">{app.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommended/Recent Section (Static for now) */}
            <div className="p-6 pt-0">
                <h3 className="text-white/60 text-xs font-semibold mb-3 ml-2">Recommended</h3>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center p-2 rounded hover:bg-white/10 cursor-pointer">
                        <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center mr-3">
                            <span className="text-blue-300 text-xs">New</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm">Welcome to my Portfolio</span>
                            <span className="text-white/40 text-xs">Recently added</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Bar */}
            <div className="h-16 bg-black/40 border-t border-white/10 flex items-center justify-between px-6 mt-auto">
                <div className="flex items-center hover:bg-white/10 p-2 rounded cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs mr-3">
                        DC
                    </div>
                    <span className="text-white text-sm font-medium">Dolev Cohen</span>
                </div>
                <div
                    className="hover:bg-red-500/20 hover:text-red-400 p-2 rounded cursor-pointer transition-colors"
                    onClick={() => {
                        if (onLogoutRequest) onLogoutRequest();
                        onClose();
                    }}
                >
                    <Power size={18} className="text-white hover:text-red-400" />
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
