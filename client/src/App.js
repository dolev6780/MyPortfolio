import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Desktop from './pages/Desktop';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/' element={  <Desktop/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
