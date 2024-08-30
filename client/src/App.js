import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar';
import Home from './pages/home/Home';
import Background from './components/Background';
import BackToTopButton from './components/BackToTopButton';
import Footer from './components/Footer';
import cv from './assets/Dolev cv.pdf'
import PdfViewer from './components/PdfViewer';
import { pdfjs } from 'react-pdf';
import ShowCv from './components/ShowCv';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
