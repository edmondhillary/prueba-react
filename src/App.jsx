import "./App.css";
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

import Series from "./components/Pages/Series/Series";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Peliculas from "./components/Pages/Peliculas/Peliculas";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/peliculas" element={<Peliculas />} />
            <Route path="/series" element={<Series />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
