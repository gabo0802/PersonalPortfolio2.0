import React, { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Button, Badge, Modal, Carousel } from "react-bootstrap";
import { getProjectBySlug } from "../Data/projects";
import { isImage, isVideo, isYouTubeUrl, toYouTubeEmbedUrl } from "../Utils/media";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const isItchThumbnail = project?.thumbnail?.includes("img.itch.zone") ?? false;
  const panelRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const previousScrollY = window.scrollY;

    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }

    if (panelRef.current) {
      panelRef.current.scrollTop = 0;
      panelRef.current.focus({ preventScroll: true });
    }

    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalLeft = document.body.style.left;
    const originalRight = document.body.style.right;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${previousScrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.left = originalLeft;
      document.body.style.right = originalRight;
      document.body.style.width = originalWidth;
      window.scrollTo({ top: previousScrollY, left: 0, behavior: "auto" });
    };
  }, [slug]);

  if (!project) return <Navigate to="/projects" replace />;

  const handleClose = () => {
    navigate("/projects");
  };

  const openGalleryAt = (index: number) => {
    setActiveGalleryIndex(index);
    setShowGalleryModal(true);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (showGalleryModal) return;
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return createPortal(
    // Full-screen overlay
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/60 backdrop-blur-sm pt-10 md:pt-0"
      onClick={handleOverlayClick}
    >
      {/* Main panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="w-[95%] md:w-[90%] max-h-[calc(100vh-2.5rem)] md:max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
        style={{
          backgroundColor: "var(--modal-bg)",
          color: "var(--modal-text)",
          border: "1px solid var(--modal-border)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close project details"
          className="absolute top-3 right-4 text-2xl leading-none z-10"
          style={{ color: "var(--modal-muted)" }}
        >
          &times;
        </button>

        {/* Hero thumbnail behind title */}
        {project.thumbnail && (
          <div className="px-3 md:px-6 pt-8 md:pt-20">
            <div
              className="w-full h-44 md:h-72 rounded-xl overflow-hidden flex items-center justify-center bg-black/20"
            >
              <img
                src={project.thumbnail}
                alt={`${project.title} thumbnail`}
                className={
                  isItchThumbnail
                    ? "w-full h-full object-cover object-center"
                    : "max-h-full max-w-full object-contain"
                }
                loading="lazy"
              />
            </div>
          </div>
        )}

        <div className="px-4 md:px-12 pb-8 md:pb-10 pt-5 md:pt-6">
          {/* Back button row */}
          <div className="flex justify-start mb-4">
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleClose}
            >
              ← Go Back
            </Button>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-semibold text-center mb-5 md:mb-6">
            {project.title}
          </h1>

          {/* Description block like the mock – centered column */}
          <section className="flex justify-center">
            <p className="max-w-3xl text-sm md:text-lg leading-relaxed text-white/90">
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
                  variant="outline-light"
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
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
                Project Gallery
              </h3>

              <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((m, i) => {
                  const type = m.type ?? (isVideo(m.url) ? "video" : "image");

                  return (
                    <figure
                      key={`${m.url}-${i}`}
                      className="border rounded-xl overflow-hidden"
                      style={{
                        borderColor: "var(--glass-border)",
                        backgroundColor: "var(--glass-surface)",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => openGalleryAt(i)}
                        className="w-full text-left"
                        aria-label={`Open gallery item ${i + 1}`}
                      >
                        {type === "image" && isImage(m.url) ? (
                          <img
                            src={m.thumbnailUrl ?? m.url}
                            alt={m.caption ?? `Media ${i + 1}`}
                            className="w-full h-40 md:h-48 object-cover"
                            loading="lazy"
                          />
                        ) : isYouTubeUrl(m.url) ? (
                          <div className="w-full h-40 md:h-48 bg-black/40 flex items-center justify-center text-white/80">
                            Play video in carousel
                          </div>
                        ) : (
                          <video
                            className="w-full h-40 md:h-48 object-cover"
                            src={m.url}
                            preload="metadata"
                            muted
                          />
                        )}
                      </button>

                      {m.caption && (
                        <figcaption className="p-2 text-sm opacity-80 text-white/85">
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

      <Modal
        show={showGalleryModal}
        onHide={() => setShowGalleryModal(false)}
        centered
        size="xl"
        contentClassName="skills-modal-content"
      >
        <Modal.Header closeButton closeVariant="white" className="skills-modal-header">
          <Modal.Title>Project Media</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          {project.gallery?.length ? (
            <Carousel
              activeIndex={activeGalleryIndex}
              onSelect={(selectedIndex) => setActiveGalleryIndex(selectedIndex)}
              interval={null}
              indicators={project.gallery.length > 1}
            >
              {project.gallery.map((m, i) => {
                const type = m.type ?? (isVideo(m.url) ? "video" : "image");

                return (
                  <Carousel.Item key={`${m.url}-carousel-${i}`}>
                    <div
                      className="w-full h-[52vh] md:h-[70vh] flex items-center justify-center"
                      style={{ background: "var(--journey-gradient)" }}
                    >
                      {type === "image" && isImage(m.url) ? (
                        <img
                          src={m.url}
                          alt={m.caption ?? `Gallery item ${i + 1}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : isYouTubeUrl(m.url) ? (
                        <iframe
                          className="w-full h-full"
                          src={toYouTubeEmbedUrl(m.url)}
                          title={m.caption ?? `YouTube video ${i + 1}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          className="max-h-full max-w-full"
                          src={m.url}
                          controls
                          autoPlay
                          preload="metadata"
                        />
                      )}
                    </div>
                    {m.caption && (
                      <Carousel.Caption>
                        <p>{m.caption}</p>
                      </Carousel.Caption>
                    )}
                  </Carousel.Item>
                );
              })}
            </Carousel>
          ) : null}
        </Modal.Body>
      </Modal>
    </div>,
    document.body
  );
}
