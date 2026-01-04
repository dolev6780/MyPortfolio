import React from 'react';

const ShutdownScreen = () => {
    return (
        <div className="w-full h-screen bg-black flex flex-col items-center justify-center z-[9999]">
            <div className="flex flex-col items-center animate-pulse">
                {/* Simple CSS Spinner */}
                <div className="w-16 h-16 border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-white text-2xl font-light tracking-wider">Signing out...</h2>
            </div>
        </div>
    );
};

export default ShutdownScreen;
