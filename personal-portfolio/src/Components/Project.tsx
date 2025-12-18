import React from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import { getProjectBySlug } from "../Data/projects";
import { isImage, isVideo } from "../Utils/media";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/projects" replace />;

  const handleClose = () => {
    navigate("/projects");
  };

  return (
    // Full-screen overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Main panel */}
      <div className="w-[90%] max-h-[90vh] overflow-y-auto bg-[#f7f8f2] rounded-2xl shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close project details"
          className="absolute top-3 right-4 text-2xl leading-none text-gray-700 hover:text-black z-10"
        >
          &times;
        </button>

        {/* Hero thumbnail behind title */}
        {project.thumbnail && (
          <div
            className="h-64 md:h-80 w-full rounded-t-2xl bg-center bg-cover"
            style={{ backgroundImage: `url(${project.thumbnail})` }}
          />
        )}

        <div className="px-6 md:px-12 pb-10 pt-6">
          {/* Back button row */}
          <div className="flex justify-start mb-4">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={handleClose}
            >
              ← Go Back
            </Button>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-gray-900">
            {project.title}
          </h1>

          {/* Description block like the mock – centered column */}
          <section className="flex justify-center">
            <p className="max-w-3xl text-base md:text-lg leading-relaxed text-gray-900">
              {project.description}
            </p>
          </section>

          {/* Links (only render what exists) */}
          {(project.links?.demo || project.links?.repo) && (
            <section className="mt-6 flex flex-wrap justify-center gap-3">
              {project.links.demo && (
                <Button
                  as="a"
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                  size="sm"
                >
                  Live Demo
                </Button>
              )}
              {project.links.repo && (
                <Button
                  as="a"
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline-dark"
                  size="sm"
                >
                  Source
                </Button>
              )}
            </section>
          )}

          {/* Skills section, centered */}
          {project.tech?.length ? (
            <section className="mt-10 text-center">
              <h3 className="text-xl font-semibold mb-4">Skills Used:</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {project.tech.map((t) => (
                  <Badge
                    key={t.name}
                    bg="secondary"
                    className="text-xs py-2 px-3"
                  >
                    {t.name}
                  </Badge>
                ))}
              </div>
            </section>
          ) : null}

          {/* Gallery */}
          {project.gallery?.length ? (
            <section className="mt-10">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Project Gallery
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((m, i) => {
                  const type = m.type ?? (isVideo(m.url) ? "video" : "image");

                  return (
                    <figure
                      key={`${m.url}-${i}`}
                      className="border rounded-xl overflow-hidden bg-white"
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
                      {m.caption && (
                        <figcaption className="p-2 text-sm opacity-80">
                          {m.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
