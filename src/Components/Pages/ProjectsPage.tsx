import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Project from "../Project";
import { usePortfolioData } from "../../Data/DataProvider";
import desktopBg from "../../Assets/images/desktop.jpg";

export default function ProjectsPage() {
  const { data } = usePortfolioData();
  const projects = data?.projects || [];

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        {/* Blurred Background Image */}
        <div
          className="absolute inset-0 scale-105"
          style={{
            backgroundImage: `url("${desktopBg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(6px) brightness(0.65)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "var(--about-contrast-vignette)" }}
        />
        <div className="relative min-h-[45vh] md:h-[55vh] flex items-center justify-center py-8 md:py-0">
          {/* Center hero card */}
          <Card
            className="shadow-xl w-11/12 md:w-3/4 rounded-2xl text-center"
            style={{
              backgroundColor: "var(--contact-surface)",
              color: "var(--about-foreground-text)",
              border: "1px solid var(--about-card-border)",
            }}
          >
            <Card.Body className="px-4 md:px-16 py-8 md:py-16">
              <Card.Title className="text-3xl md:text-5xl font-semibold mb-4 md:mb-6">
                My Personal Portfolio
              </Card.Title>
              <Card.Text className="text-sm md:text-lg opacity-80 max-w-2xl mx-auto">
                This is a compilation of some of my favorite projects that I&apos;ve
                contributed to. Feel free to take a look at these:
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* PROJECTS LIST SECTION */}
      <section id="projects-list-top" className="relative w-full py-10 md:py-16 overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{ background: "var(--journey-gradient)" }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{ background: "var(--journey-vignette)" }}
        />
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-24"
          style={{ background: "var(--section-bridge-top)" }}
        />

        <Container>
          {/* Section title */}
          <Row className="mb-12 relative z-10">
            <Col>
              <h2 className="text-2xl md:text-4xl font-semibold text-center">
                Projects
              </h2>
            </Col>
          </Row>

          {/* Projects grid */}
          <Row className="g-4 relative z-10">
            {projects.map((p) => (
              <Col key={p.slug} xs={12} lg={6}>
                <div
                  className="w-full h-full rounded-2xl backdrop-blur-md shadow-lg overflow-hidden flex flex-col sm:flex-row items-stretch border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                  style={{
                    backgroundColor: "var(--glass-surface)",
                    borderColor: "var(--glass-border)",
                  }}
                >
                  {/* Thumbnail Side */}
                  <div className="w-full sm:w-[40%] h-48 sm:h-auto min-h-[160px] bg-black/15 flex items-center justify-center p-4 relative overflow-hidden group">
                    {p.thumbnail ? (
                      <img
                        src={p.thumbnail}
                        alt={`${p.title} cover`}
                        className="max-w-full max-h-[90%] object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-white/50 text-sm">No thumbnail</span>
                    )}
                  </div>

                  {/* Details Side */}
                  <div className="w-full sm:w-[60%] p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                        {p.title}
                      </h3>
                      <p className="text-xs md:text-sm leading-relaxed text-white/80 mb-4 line-clamp-3">
                        {p.summary}
                      </p>

                      {/* Tech Stack */}
                      {p.tech && p.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {p.tech.map((t) => (
                            t.visual && (
                              <img
                                key={t.slug}
                                src={t.visual}
                                alt={t.name}
                                title={t.name}
                                className="h-6 w-auto object-contain transition-transform duration-200 hover:scale-105"
                                loading="lazy"
                              />
                            )
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <Link to={`/projects/${p.slug}`}>
                        <Button
                          variant="none"
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 border"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderColor: "rgba(255, 255, 255, 0.15)",
                            color: "white",
                            backdropFilter: "blur(4px)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
                            e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Modal route (overlay Project component) */}
      <Routes>
        <Route path=":slug" element={<Project />} />
      </Routes>
    </div>
  );
}
