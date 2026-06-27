import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Header from "./Components/Header/Header";
import Footer from "./Components/Header/Footer";
import MainPage from "./Components/Pages/MainPage";
import AboutMe from "./Components/Pages/AboutMe";
import ProjectsPage from "./Components/Pages/ProjectsPage";
import { usePortfolioData } from "./Data/DataProvider";

import linkedInBg from "./Assets/images/linkedIn2.jpg";
import EABg from "./Assets/images/EABackground.jpg";
import cafe from "./Assets/images/cafe.jpg";

function App() {
  const location = useLocation();
  const [isAppReady, setIsAppReady] = useState(false);

  const { data, loading: dataLoading, error } = usePortfolioData();

  const preloadUrls = useMemo(() => {
    if (!data) return [];
    
    const staticUrls = [
      EABg,
      linkedInBg,
      cafe,
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    ];

    const skillUrls = data.featuredSkills.map((skill) => skill.visual);

    const projectImageUrls = data.projects.flatMap((project) => {
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
  }, [data]);

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

  if (error) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center p-6"
        style={{
          background: "linear-gradient(135deg, #0b102a 0%, #101b47 40%, #0c1638 100%)",
          color: "var(--color-text-primary)",
        }}
      >
        <div 
          className="max-w-md w-full rounded-2xl p-8 text-center border backdrop-blur-md"
          style={{
            background: "rgba(16, 27, 71, 0.4)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
          }}
        >
          <div className="w-16 h-16 bg-red-950/40 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              className="w-8 h-8 text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">System Error</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
            {error.message}
          </p>
          <div className="text-xs text-gray-500 border-t border-white/5 pt-4">
            If you are Gabe, please log into your Supabase console to restore service.
          </div>
        </div>
      </div>
    );
  }

  if (dataLoading || !isAppReady || !data) {
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
