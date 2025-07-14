import './App.css';
import useResponsive from './hooks/useResponsive';
import Desktop from './pages/Desktop';
import Mobile from './pages/Mobile';


function App() {
  const isMobile = useResponsive(1024);
  return (
    <div className="App">
      {isMobile ? <Mobile /> : <Desktop />}
    </div>
  );
}

export default App;