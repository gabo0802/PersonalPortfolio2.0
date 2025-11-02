import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import MainPage from "./Components/Pages/MainPage";
import AboutMe from "./Components/Pages/AboutMe";
import ProjectsPage from "./Components/Pages/ProjectsPage";

function App() {
  return (
    <div className="App">
      <Header />
      <main style={{ }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/projects/*" element={<ProjectsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
