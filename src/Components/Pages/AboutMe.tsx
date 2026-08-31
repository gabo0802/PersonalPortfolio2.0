import React, { useMemo } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePortfolioData } from "../../Data/DataProvider";
import resumePdf from "../../generated/backend/GabrielCastejonResume.pdf";

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

          <div className="flex flex-col gap-8 md:gap-10">
            {highlightProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={project.slug}
                  className="w-full rounded-2xl backdrop-blur-md shadow-2xl overflow-hidden flex flex-col md:flex-row items-stretch border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                  style={{
                    backgroundColor: "var(--glass-surface)",
                    borderColor: "var(--glass-border)",
                  }}
                >
                  {/* Image Container */}
                  <div
                    className={`w-full md:w-[45%] h-56 md:h-auto min-h-[220px] bg-black/15 flex items-center justify-center p-6 relative overflow-hidden group ${
                      isEven ? "md:order-1" : "md:order-2"
                    }`}
                  >
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        className="max-w-full max-h-[90%] object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-white/50 text-sm">Preview unavailable</span>
                    )}
                  </div>

                  {/* Content Container */}
                  <div
                    className={`w-full md:w-[55%] p-6 md:p-8 flex flex-col justify-between ${
                      isEven ? "md:order-2" : "md:order-1"
                    }`}
                  >
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                        {project.title}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed text-white/80 mb-5">
                        {project.summary}
                      </p>

                      {/* Tech stack visuals */}
                      {project.tech && project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2.5 mb-6">
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
                    </div>

                    <div>
                      <Link to={`/projects/${project.slug}`}>
                        <Button
                          variant="none"
                          className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderColor: "rgba(255, 255, 255, 0.15)",
                            color: "white",
                            backdropFilter: "blur(4px)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.35)";
                            e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 255, 255, 0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          View project
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutMe;
