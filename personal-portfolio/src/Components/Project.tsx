import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { getProjectBySlug } from "../Data/projects";
import { isImage, isVideo } from "../Utils/media";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <article className="mt-10">
      <Link to="/projects" className="text-blue-500 hover:underline">
        ← Back to All Projects
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="mt-3 opacity-90">{project.description}</p>
      </header>

      {project.thumbnail && (
        <div className="mt-6 rounded-xl overflow-hidden border">
          <img
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {project.tech?.length ? (
        <section className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tech</h3>
          <ul className="list-disc list-inside space-y-1">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {(project.links?.demo || project.links?.repo) && (
        <section className="mt-6 space-x-4">
          {project.links.demo && (
            <a
              className="inline-block underline"
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo
            </a>
          )}
          {project.links.repo && (
            <a
              className="inline-block underline"
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          )}
        </section>
      )}

      {/* --- Bottom gallery --- */}
      {project.gallery?.length ? (
        <section className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Gallery</h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((m, i) => {
              const type = m.type ?? (isVideo(m.url) ? "video" : "image");

              return (
                <figure
                  key={`${m.url}-${i}`}
                  className="border rounded-xl overflow-hidden"
                >
                  {type === "image" && isImage(m.url) ? (
                    <a href={m.url} target="_blank" rel="noreferrer">
                      <img
                        src={m.thumbnailUrl ?? m.url}
                        alt={m.caption ?? `Media ${i + 1}`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <video
                      className="w-full h-48 object-cover"
                      src={m.url}
                      controls
                      preload="metadata"
                    />
                  )}
                  {m.caption ? (
                    <figcaption className="p-2 text-sm opacity-80">
                      {m.caption}
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </div>
        </section>
      ) : null}
    </article>
  );
}
