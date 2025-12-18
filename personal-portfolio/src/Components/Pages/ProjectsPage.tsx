import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAllProjects } from "../../Data/projects";
import Project from "../Project";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col w-full bg-[#f7f8f2]">
      {/* HERO SECTION */}
      <section className="w-full">
        <div className="relative h-[55vh] flex items-center justify-center">
          {/* Center hero card */}
          <Card className="bg-[#fafbf6] text-black shadow-xl border border-gray-200 w-11/12 md:w-3/4 rounded-2xl text-center">
            <Card.Body className="px-6 md:px-16 py-10 md:py-16">
              <Card.Title className="text-4xl md:text-5xl font-semibold mb-6">
                My Personal Portfolio
              </Card.Title>
              <Card.Text className="text-base md:text-lg opacity-80 max-w-2xl mx-auto">
                This is a compilation of some of my favorite projects that I&apos;ve
                contributed to. Feel free to take a look at these:
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </section>

      {/* PROJECTS LIST SECTION */}
      <section className="w-full py-16">
        <Container>
          {/* Section title */}
          <Row className="mb-12">
            <Col>
              <h2 className="text-3xl md:text-4xl font-semibold text-center">
                Projects
              </h2>
            </Col>
          </Row>

          {/* Projects grid */}
          <Row className="g-4">
            {projects.map((p) => (
              <Col key={p.slug} md={4}>
                <Card className="h-100 shadow-md border border-gray-200 rounded-2xl overflow-hidden">
                  <Link
                    to={`/projects/${p.slug}`}
                    className="text-reset text-decoration-none"
                  >
                    {/* Thumbnail */}
                    {p.thumbnail ? (
                      <div className="bg-gray-100 d-flex align-items-center justify-content-center" style={{ height: "160px" }}>
                        <Card.Img
                          src={p.thumbnail}
                          alt={`${p.title} cover`}
                          className="h-100 w-100 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-100 d-flex align-items-center justify-content-center text-sm text-gray-500" style={{ height: "160px" }}>
                        No thumbnail
                      </div>
                    )}

                    {/* Content */}
                    <Card.Body>
                      <Card.Title className="text-lg font-semibold mb-3">
                        {p.title}
                      </Card.Title>
                      <Card.Text className="text-sm leading-relaxed opacity-80">
                        {p.summary}
                      </Card.Text>
                    </Card.Body>
                  </Link>

                  {/* Read More button */}
                  <Card.Footer className="bg-transparent border-0 pt-0 pb-4 px-4">
                    <Link to={`/projects/${p.slug}`}>
                      <Button
                        variant="outline-dark"
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
