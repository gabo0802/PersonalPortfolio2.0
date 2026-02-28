import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Header/Footer";
import MainPage from "./Components/Pages/MainPage";
import AboutMe from "./Components/Pages/AboutMe";
import ProjectsPage from "./Components/Pages/ProjectsPage";
import { featuredSkills } from "./Data/skills";
import { projects } from "./Data/projects";

import linkedInBg from "./Assets/images/linkedIn2.jpg";
import EABg from "./Assets/images/EABackground.jpg";
import cafe from "./Assets/images/cafe.jpg";

function App() {
  const location = useLocation();
  const [isAppReady, setIsAppReady] = useState(false);

  const preloadUrls = useMemo(() => {
    const staticUrls = [
      EABg,
      linkedInBg,
      cafe,
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    ];

    const skillUrls = featuredSkills.map((skill) => skill.visual);

    const projectImageUrls = projects.flatMap((project) => {
      const thumbnail = project.thumbnail ? [project.thumbnail] : [];
      const galleryImages =
        project.gallery
          ?.filter((media) => media.type !== "video")
          .map((media) => media.url) ?? [];
      return [...thumbnail, ...galleryImages];
    });

    return Array.from(
      new Set([...staticUrls, ...skillUrls, ...projectImageUrls]),
    ).filter(Boolean);
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const preloadImage = (url: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = url;
      });

    Promise.all(preloadUrls.map(preloadImage)).then(() => {
      if (!isCancelled) {
        setIsAppReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [preloadUrls]);

  if (!isAppReady) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0b102a 0%, #101b47 40%, #0c1638 100%)",
          color: "var(--color-text-primary)",
        }}
      >
        <div className="text-lg md:text-xl tracking-wide">Loading...</div>
      </div>
    );
  }

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
