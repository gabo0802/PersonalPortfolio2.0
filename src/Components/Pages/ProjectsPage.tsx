import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Project from "../Project";
import { usePortfolioData } from "../../Data/DataProvider";

export default function ProjectsPage() {
  const { data } = usePortfolioData();
  const projects = data?.projects || [];

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "var(--about-contrast-gradient)" }}
        />
        <div
          className="absolute inset-0 opacity-70"
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
              <Col key={p.slug} xs={12} sm={6} lg={4}>
                <Card
                  className="h-100 shadow-md rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "var(--glass-surface)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <Link
                    to={`/projects/${p.slug}`}
                    className="text-reset text-decoration-none"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {/* Thumbnail */}
                    {p.thumbnail ? (
                      <div className="bg-black/20 d-flex align-items-center justify-content-center" style={{ height: "160px" }}>
                        <Card.Img
                          src={p.thumbnail}
                          alt={`${p.title} cover`}
                          className="h-100 w-100 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="bg-black/20 d-flex align-items-center justify-content-center text-sm text-white/70" style={{ height: "160px" }}>
                        No thumbnail
                      </div>
                    )}

                    {/* Content */}
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-3 text-white">
                        {p.title}
                      </Card.Title>
                      <Card.Text className="text-sm leading-relaxed opacity-85 text-white">
                        {p.summary}
                      </Card.Text>
                    </Card.Body>
                  </Link>

                  {/* Read More button */}
                  <Card.Footer className="bg-transparent border-0 pt-0 pb-4 px-4">
                    <Link to={`/projects/${p.slug}`}>
                      <Button
                        variant="outline-light"
                        size="sm"
                        className="px-4"
                      >
                        Read More
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
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
