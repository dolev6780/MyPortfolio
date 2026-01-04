import React, { useState } from 'react';
import './App.css';
import useResponsive from './hooks/useResponsive';
import Desktop from './pages/Desktop';
import Mobile from './pages/Mobile';
import LoginScreen from './components/LoginScreen';
import ShutdownScreen from './components/ShutdownScreen';

function App() {
  const isMobile = useResponsive(1024);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Start logged in for dev convenience
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsSigningOut(true);
    // Simulate shutdown delay
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsSigningOut(false);
    }, 2000); // 2 seconds delay
  };

  if (isSigningOut) {
    return <ShutdownScreen />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      {isMobile ? <Mobile /> : <Desktop onLogout={handleLogout} />}
    </div>
  );
}

export default App;