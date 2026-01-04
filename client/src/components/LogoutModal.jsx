import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#1f1f1f] border border-white/10 p-6 rounded-lg shadow-2xl w-[400px] transform transition-all scale-100">
                <h3 className="text-white text-xl font-semibold mb-2">Sign out?</h3>
                <p className="text-gray-300 text-sm mb-6">
                    Are you sure you want to sign out of current session?
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors text-sm font-medium"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
