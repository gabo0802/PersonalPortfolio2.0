import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Header/Footer";
import MainPage from "./Components/Pages/MainPage";
import AboutMe from "./Components/Pages/AboutMe";
import ProjectsPage from "./Components/Pages/ProjectsPage";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <main style={{ }}>
        <div key={location.pathname} className="route-transition">
          <Routes location={location}>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/projects/*" element={<ProjectsPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
