// src/Components/ProjectsPage.tsx
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { getAllProjects } from "../../Data/projects";
import Project from "../Project";

export default function ProjectsPage() {
    
  const projects = getAllProjects();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">All Projects</h1>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="border rounded-2xl overflow-hidden hover:shadow transition"
            >
              <Link to={`/projects/${p.slug}`} className="block">
                {p.thumbnail ? (
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={p.thumbnail}
                      alt={`${p.title} cover`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                    No thumbnail
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  <p className="opacity-80 mt-1">{p.summary}</p>
                  {p.tech?.length ? (
                    <div className="mt-2 text-xs opacity-70">
                      {p.tech.join(" • ")}
                    </div>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Nested detail route renders below list if a slug is present */}
      <Routes>
        <Route path=":slug" element={<Project />} />
      </Routes>
    </div>
  );
}
