import React, { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import { usePortfolioData } from "../Data/DataProvider";
import { isImage, isVideo, isYouTubeUrl, toYouTubeEmbedUrl } from "../Utils/media";

export default function Project() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data } = usePortfolioData();
  const project = slug ? data?.projects.find((p) => p.slug === slug) : undefined;
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

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const renderGalleryItem = (media: { url: string; caption?: string; type?: "image" | "video" }, idx: number) => {
    const type = media.type ?? (isVideo(media.url) ? "video" : "image");

    if (type === "image" && isImage(media.url)) {
      return (
        <img
          src={media.url}
          alt={media.caption ?? `Gallery item ${idx + 1}`}
          className="max-h-full max-w-full object-contain rounded-lg"
          loading="lazy"
        />
      );
    } else if (isYouTubeUrl(media.url)) {
      return (
        <iframe
          className="w-full h-full rounded-lg"
          src={toYouTubeEmbedUrl(media.url)}
          title={media.caption ?? `YouTube video ${idx + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      );
    } else {
      return (
        <video
          className="max-h-full max-w-full rounded-lg"
          src={media.url}
          controls
          preload="metadata"
        />
      );
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
        className="w-[95%] md:w-[90%] max-w-6xl max-h-[calc(100vh-2.5rem)] md:max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative p-6 md:p-10"
        style={{
          backgroundColor: "var(--modal-bg)",
          color: "var(--modal-text)",
          border: "1px solid var(--modal-border)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button - Circular glass button */}
        <button
          onClick={handleClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-30 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition shadow-md focus:outline-none"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Two-column layout container */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 mt-4">
          
          {/* LEFT COLUMN: Static Thumbnail + Action Links */}
          <div className="w-full md:w-[48%] flex flex-col gap-6">
            {/* Static Thumbnail */}
            {project.thumbnail && (
              <div
                className="w-full h-64 md:h-[320px] rounded-xl overflow-hidden bg-black/15 relative border flex items-center justify-center p-4"
                style={{ borderColor: "var(--glass-border)" }}
              >
                <img
                  src={project.thumbnail}
                  alt={`${project.title} cover`}
                  className="max-h-full max-w-full object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {/* Action Links */}
            {(project.links?.demo || project.links?.repo) && (
              <div className="flex flex-col sm:flex-row gap-3">
                {project.links.demo && (
                  <Button
                    as="a"
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "var(--hero-heading-text, #3b82f6)",
                      borderColor: "var(--hero-heading-text, #3b82f6)",
                      color: "white",
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Demo
                  </Button>
                )}
                {project.links.repo && (
                  <Button
                    as="a"
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    variant="none"
                    className="flex-grow py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 border flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      color: "white",
                      backdropFilter: "blur(4px)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                    }}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    Source Code
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Project Info */}
          <div className="w-full md:w-[52%] flex flex-col">
            {/* Title */}
            <h1 className="text-2xl md:text-3.5xl font-bold text-white mb-4 text-left">
              {project.title}
            </h1>

            {/* Tech Stack Visuals */}
            {project.tech && project.tech.length > 0 && (
              <div className="flex flex-wrap gap-2.5 mb-5">
                {project.tech.map((t) => (
                  t.visual && (
                    <img
                      key={t.slug}
                      src={t.visual}
                      alt={t.name}
                      title={t.name}
                      className="h-7 w-auto object-contain transition-transform duration-200 hover:scale-105"
                      loading="lazy"
                    />
                  )
                ))}
              </div>
            )}

            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-sm md:text-base leading-relaxed text-white/90 whitespace-pre-line text-left">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Dedicated Gallery Carousel (Full Width) */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-8 border-t pt-8" style={{ borderColor: "var(--glass-border)" }}>
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-left text-white">
              Project Gallery
            </h3>
            <div
              className="w-full rounded-xl overflow-hidden bg-black/15 relative border"
              style={{ borderColor: "var(--glass-border)" }}
            >
              <Carousel
                interval={null}
                indicators={project.gallery.length > 1}
                className="project-detail-carousel"
              >
                {project.gallery.map((media, idx) => (
                  <Carousel.Item key={`${media.url}-${idx}`}>
                    {media.caption && (
                      <div className="text-center py-2 bg-black/35 text-xs text-white/80 border-b border-white/5">
                        {media.caption}
                      </div>
                    )}
                    <div className="h-64 md:h-[420px] flex items-center justify-center p-4">
                      {renderGalleryItem(media, idx)}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
