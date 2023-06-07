import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Series from "./components/Pages/Series/Series";
import Main from "./components/Main/Main";
import Peliculas from "./components/Pages/Peliculas/Peliculas";
import Footer from './components/Footer/Footer'

function App() {


  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/peliculas' element={<Peliculas />} />
            <Route path='/series' element={<Series />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
