import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar';
import Home from './pages/home/Home';
import Background from './components/Background';
import BackToTopButton from './components/BackToTopButton';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
      <Background/>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <Footer/>
      <BackToTopButton/>
      </Router>
    </div>
  );
}

export default App;
