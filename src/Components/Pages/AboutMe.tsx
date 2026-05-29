import React, { useMemo } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../../Data/DataProvider";
import resumePdf from "../../Assets/docs/GabrielCastejonResume.pdf";

function AboutMe() {
  const { data } = usePortfolioData();
  const highlightProjects = useMemo(() => data?.projects.slice(0, 3) || [], [data]);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1 — About + Resume */}
      <section className="relative min-h-[95vh] w-full overflow-hidden text-white py-10 md:py-16">
        <div
          className="absolute inset-0"
          style={{ background: "var(--about-contrast-gradient)" }}
        />
        <div
          className="absolute inset-0 opacity-70"
          style={{ background: "var(--about-contrast-vignette)" }}
        />
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-28 w-[460px] h-[460px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 w-11/12 md:w-4/5 max-w-6xl mx-auto">
          <div className="mb-5 md:mb-8 text-left">
            <h1
              className="text-3xl md:text-5xl font-semibold tracking-wide"
              style={{ color: "var(--about-foreground-text)" }}
            >
              About Gabe...
            </h1>
          </div>

          <div className="flex justify-center">
            <Card
              className="text-white shadow-lg w-full"
              style={{
                backgroundColor: "var(--about-card-bg)",
                borderColor: "var(--about-card-border)",
              }}
            >
              <Card.Body className="px-4 md:px-10 py-6 md:py-10 text-center">
                <p className="text-sm md:text-lg leading-relaxed">
                  I&apos;m currently a Software Engineer at Electronic Arts, where I&apos;m part
                  of the Software Engineering Academy. I began my time at EA on the
                  College Football Modes team and now contribute to the AFL Live team.
                  Previously, I interned with EA&apos;s Football SHIELD team after interviewing
                  as an HSF Scholar, and later with Google on the Cloud Storage Encryption
                  team. I graduated from the University of Florida with a bachelor&apos;s
                  degree in Computer Science and minors in Business Administration and
                  Economics. At UF, I served as a Tech Fellow for CodePath, was a
                  founding E-Board member of UF&apos;s ColorStack chapter, later became Vice
                  President and National Chapter Ambassador, and conducted undergraduate
                  research applying AI to predict microstructure grain growth in materials
                  science. I&apos;ve remained actively involved with the Hispanic Scholarship
                  Fund, attending the HSF STEM Summit as a Scholar in 2023,
                  Mentor-in-Training in 2024, and Mentor in 2025.
                  Currently, I also serve as an Advisory Council Member in Orlando.
                </p>
              </Card.Body>
            </Card>
          </div>

          <div className="mt-8 md:mt-10">
            <div
              className="rounded-2xl shadow-2xl overflow-hidden p-3 md:p-6"
              style={{
                border: "1px solid var(--about-card-border)",
                backgroundColor: "var(--about-card-bg)",
              }}
            >
              <div className="px-4 md:px-6 py-3 md:py-4 border-b" style={{ borderColor: "var(--about-card-border)" }}>
                <h2 className="text-lg md:text-2xl font-semibold">Resume Preview</h2>
              </div>

              <div className="mt-4 rounded-xl overflow-hidden bg-black/20 max-w-5xl mx-auto">
                <div className="block md:hidden w-full aspect-[8.5/11] overflow-hidden">
                  <iframe
                    src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title="Gabriel Castejon Resume Preview (Mobile)"
                    className="w-[190%] h-[190%] scale-[0.53] origin-top-left pointer-events-none"
                    tabIndex={-1}
                  />
                </div>

                <iframe
                  src={resumePdf}
                  title="Gabriel Castejon Resume Preview"
                  className="hidden md:block w-full aspect-[8.5/11]"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <a href={resumePdf} download>
                <Button variant="dark" size="sm" className="md:!text-base md:px-4 md:py-2">
                  Download My Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Highlight Projects */}
      <section className="relative min-h-[70vh] w-full overflow-hidden text-white py-10 md:py-16">
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

        <div className="relative z-10 w-11/12 md:w-4/5 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-10 gap-2">
            <h2 className="text-2xl md:text-4xl font-semibold">My Latest Projects</h2>
            <Link to="/projects" className="text-white/80 hover:text-white transition">
              View all →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {highlightProjects.map((project) => (
              <Card
                key={project.slug}
                className="h-full w-full shadow-2xl overflow-hidden flex flex-col"
                style={{
                  backgroundColor: "var(--glass-surface)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="no-underline text-inherit flex-1 flex flex-col"
                >
                  {project.thumbnail ? (
                    <div className="h-44 bg-black/20 flex items-center justify-center">
                      <img
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="h-44 bg-black/25 flex items-center justify-center text-white/70 text-sm">
                      Preview image unavailable
                    </div>
                  )}

                  <Card.Body className="px-5 py-5 flex-1">
                    <Card.Title className="text-xl font-semibold mb-3 text-white">
                      {project.title}
                    </Card.Title>
                    <Card.Text className="text-sm md:text-base leading-relaxed text-white/85">
                      {project.summary}
                    </Card.Text>
                  </Card.Body>
                </Link>

                <Card.Footer className="bg-transparent border-0 px-5 pb-5 pt-0">
                  <Link to={`/projects/${project.slug}`}>
                    <Button variant="outline-light" size="sm">
                      View project
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutMe;
