import React, { useState, useEffect } from 'react';

const LoginScreen = ({ onLogin }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && !showLogin) {
                setShowLogin(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showLogin]);

    const handleScreenClick = () => {
        if (!showLogin) setShowLogin(true);
    };

    return (
        <div
            className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center relative overflow-hidden select-none"
            style={{ backgroundImage: "url('/desktop_wallpaper.jpg')" }}
            onClick={handleScreenClick}
        >
            {/* Overlay to darken background */}
            <div className={`absolute inset-0 bg-black/40 transition-all duration-500 ${showLogin ? 'backdrop-blur-md' : 'backdrop-blur-sm'}`}></div>

            {!showLogin ? (
                // Lock Screen View
                <div className="z-10 flex flex-col items-center animate-fade-in text-white drop-shadow-lg">
                    <div className="text-9xl font-thin tracking-wider mb-4">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </div>
                    <div className="text-4xl font-light">
                        {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="mt-20 animate-bounce text-white/70 text-sm">
                        Click to unlock
                    </div>
                </div>
            ) : (
                // Login Prompt View
                <div className="z-10 flex flex-col items-center animate-slide-up bg-black/30 p-12 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-4xl mb-6 shadow-lg border-4 border-white/20">
                        DC
                    </div>
                    <h2 className="text-3xl font-semibold text-white mb-8 tracking-wide">Dolev Cohen</h2>
                    <button
                        onClick={(e) => { e.stopPropagation(); onLogin(); }}
                        className="px-12 py-3 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/10 transition-all duration-200 font-medium tracking-wide active:scale-95"
                    >
                        Sign In
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginScreen;
