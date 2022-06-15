import NavBar from './components/NavBar/NavBar';
import SideNav from './components/SideNav/SideNav';
import CvButton from './components/CvButton/CvButton'
import './App.css';

function App() {
  return (
    <div className="App">
     <NavBar/>
     <SideNav/>
     <CvButton/>
    </div>
  );
}

export default App;
