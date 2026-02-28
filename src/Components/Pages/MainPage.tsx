import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Badge,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import { experiences } from "../../Data/experiences";
import { featuredSkills, skillsBySlug, skillGroups } from "../../Data/skills";
import { proficiencyRank } from "../../Data/types";
import type { Skill } from "../../Data/types";

// Image Imports
import linkedInBg from "../../Assets/images/linkedIn2.jpg";
import EABg from "../../Assets/images/EABackground.jpg";
import cafe from "../../Assets/images/cafe.jpg";
import sectionVisual from "../../Assets/images/agapornifischeri.jpg";

const orderedSkills = [...featuredSkills].sort(
  (a, b) => proficiencyRank[b.proficiency] - proficiencyRank[a.proficiency],
);

// Type guard: filters missing skills cleanly
const isSkill = (s: Skill | undefined): s is Skill => s !== undefined;

function MainPage() {
  const [showSkills, setShowSkills] = useState(false);
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0);
  const [isExperienceVisible, setIsExperienceVisible] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);
  const experienceTransitionTimer = useRef<number | null>(null);
  const journeyStripRef = useRef<HTMLDivElement | null>(null);
  const journeyItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const isDraggingJourneyRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);

  const activeExperience = experiences[activeExperienceIndex] ?? experiences[0];
  const hasExperiences = experiences.length > 0;

  const switchExperienceWithTransition = useCallback((nextIndex: number) => {
    if (!hasExperiences || nextIndex === activeExperienceIndex) return;

    if (experienceTransitionTimer.current) {
      window.clearTimeout(experienceTransitionTimer.current);
    }

    setIsExperienceVisible(false);
    experienceTransitionTimer.current = window.setTimeout(() => {
      setActiveExperienceIndex(nextIndex);
      setIsExperienceVisible(true);
    }, 140);
  }, [activeExperienceIndex, hasExperiences]);

  const scrollJourneyStrip = (direction: "left" | "right") => {
    const strip = journeyStripRef.current;
    if (!strip) return;

    const offset = direction === "left" ? -260 : 260;
    strip.scrollBy({ left: offset, behavior: "smooth" });
  };

  const shiftExperience = (direction: "left" | "right") => {
    if (!hasExperiences) return;

    const nextIndex =
      direction === "left"
        ? (activeExperienceIndex - 1 + experiences.length) % experiences.length
        : (activeExperienceIndex + 1) % experiences.length;

    switchExperienceWithTransition(nextIndex);
  };

  const handleJourneyArrowClick = (direction: "left" | "right") => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      shiftExperience(direction);
      return;
    }

    scrollJourneyStrip(direction);
  };

  const handleJourneyDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    const strip = journeyStripRef.current;
    if (!strip) return;

    isDraggingJourneyRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = strip.scrollLeft;
  };

  const handleJourneyDragMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingJourneyRef.current) return;
    const strip = journeyStripRef.current;
    if (!strip) return;

    const deltaX = event.clientX - dragStartXRef.current;
    strip.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const handleJourneyDragEnd = () => {
    isDraggingJourneyRef.current = false;
  };

  useEffect(() => {
    let isCancelled = false;

    const preloadImage = (url: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = url;
      });

    const staticImageUrls = [
      EABg,
      linkedInBg,
      cafe,
      sectionVisual,
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    ];

    const skillImageUrls = orderedSkills.map((skill) => skill.visual);

    const urlsToPreload = Array.from(
      new Set([...staticImageUrls, ...skillImageUrls]),
    ).filter(Boolean);

    Promise.all(urlsToPreload.map(preloadImage)).then(() => {
      if (!isCancelled) {
        setIsPageReady(true);
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (experienceTransitionTimer.current) {
        window.clearTimeout(experienceTransitionTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasExperiences || experiences.length < 2) return;

    const autoAdvanceTimer = window.setInterval(() => {
      const nextIndex =
        activeExperienceIndex === experiences.length - 1
          ? 0
          : activeExperienceIndex + 1;
      switchExperienceWithTransition(nextIndex);
    }, 6500);

    return () => {
      window.clearInterval(autoAdvanceTimer);
    };
  }, [activeExperienceIndex, hasExperiences, switchExperienceWithTransition]);

  useEffect(() => {
    const strip = journeyStripRef.current;
    const activeItem = journeyItemRefs.current[activeExperienceIndex];

    if (!strip || !activeItem) return;

    const targetLeft =
      activeItem.offsetLeft - strip.clientWidth / 2 + activeItem.clientWidth / 2;

    strip.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [activeExperienceIndex]);

  const groupedSkills = useMemo(() => {
    return skillGroups.map((g) => ({
      title: g.title,
      skills: g.slugs.map((slug) => skillsBySlug[slug]).filter(isSkill),
    }));
  }, []);

  if (!isPageReady) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ background: "var(--journey-gradient)", color: "var(--color-text-primary)" }}
      >
        <div className="text-lg md:text-xl tracking-wide">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1 */}
      <div
        className="relative min-h-[95vh] md:h-[75vh] w-full flex flex-col md:flex-row text-white overflow-hidden"
        style={{
          backgroundImage: `url("${EABg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "var(--section-bridge-bottom)" }}
        />
        <div className="w-full md:flex-[0_0_35%] flex items-center justify-center pt-10 md:pt-0">
          <div
            className="w-11/12 md:w-3/4 h-56 md:h-3/4 bg-black rounded-lg"
            style={{
              backgroundImage: `url("${linkedInBg}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Right side – remaining width */}
        <div className="relative w-full md:flex-[0_0_65%] flex flex-col justify-center items-center px-4 md:px-12 py-8 md:py-0 space-y-4 md:space-y-6">
          <h1
            className="text-3xl md:text-5xl font-bold text-center md:text-left"
            style={{ color: "var(--hero-heading-text)" }}
          >
            Hi, I&apos;m Gabriel Castejon
          </h1>
          <Card
            className="text-white shadow-lg w-full max-w-2xl"
            style={{
              backgroundColor: "var(--hero-card-bg)",
              borderColor: "var(--hero-card-border)",
            }}
          >
            <Card.Title className="pt-4 md:pt-5 text-lg md:text-xl font-bold">
              Software Engineer @ Electronic Arts
            </Card.Title>
            <Card.Body className="p-3 md:p-4">
              <Card.Text className="text-sm md:text-lg leading-relaxed text-left">
                - Graduate from the <strong>University of Florida</strong> 🐊
                with a Computer Science Major and Business Administration and
                Economics Minors<br></br>- Prev SWE Intern @{" "}
                <strong>Google</strong> and <strong>Electronic Arts</strong>
                <br></br>- <strong>ColorStack</strong> and <strong>SHPE</strong>{" "}
                Member, <strong>HSF</strong> Scholar<br></br>- Currently a
                Software Engineer at the <strong>EA SPORTS Academy</strong>{" "}
                program, as a back-end engineer in the College Football Modes
                team.<br></br>- Mostly been front-end / full stack developer,
                but with experience in tons of other tools, see some of what
                I've worked with below ~<br></br>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* SECTION 2 — Option 4: Modern gradient + blobs */}
      <div className="relative min-h-[95vh] md:h-[75vh] w-full overflow-hidden text-white py-10 md:py-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "var(--journey-gradient)",
          }}
        />

        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-30"
          style={{ background: "var(--section-bridge-top)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-30"
          style={{ background: "var(--section-bridge-bottom)" }}
        />

        {/* Blobs (no custom colors required, but these are muted + nice) */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-24 -right-32 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[560px] h-[560px] rounded-full bg-white/10 blur-3xl" />

        {/* Vignette to keep focus */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "var(--journey-vignette)",
          }}
        />

        {/* Content */}
        <div className="relative h-full w-full flex flex-col items-center justify-center px-3 md:px-0">
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-8 md:mb-10 text-center">
            My Journey:
          </h2>

          <div className="w-full px-1 md:px-4 flex items-center justify-center">
            <div className="w-full max-w-6xl">
              <div className="relative mb-8 md:mb-10">
                <div className="absolute left-7 right-7 top-4 h-[2px] bg-white/25" />

                <button
                  type="button"
                  onClick={() => handleJourneyArrowClick("left")}
                  className="absolute left-4 top-4 -translate-y-1/2 z-20 h-6 w-6 flex items-center justify-center text-white/70 hover:text-white transition"
                  aria-label="Scroll journey left"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => handleJourneyArrowClick("right")}
                  className="absolute right-4 top-4 -translate-y-1/2 z-20 h-6 w-6 flex items-center justify-center text-white/70 hover:text-white transition"
                  aria-label="Scroll journey right"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>

                <div
                  ref={journeyStripRef}
                  className="no-scrollbar relative flex items-start gap-3 md:gap-6 overflow-x-auto pb-2 px-8 md:px-10"
                  onMouseDown={handleJourneyDragStart}
                  onMouseMove={handleJourneyDragMove}
                  onMouseUp={handleJourneyDragEnd}
                  onMouseLeave={handleJourneyDragEnd}
                >
                  {experiences.map((exp, index) => {
                    const isActive = index === activeExperienceIndex;
                    const company = exp.subtitle?.split(" · ")[0];

                    return (
                      <button
                        key={`${exp.title}-${index}`}
                        type="button"
                        onClick={() => switchExperienceWithTransition(index)}
                        ref={(element) => {
                          journeyItemRefs.current[index] = element;
                        }}
                        className="group min-w-[150px] md:min-w-[170px] flex flex-col items-center text-center focus:outline-none"
                        aria-label={`Select journey item: ${exp.title}`}
                        aria-pressed={isActive}
                      >
                        <div
                          className={`h-8 w-8 rounded-full border-2 transition-all duration-300 ${
                            isActive
                              ? "bg-white border-white shadow-lg shadow-white/30"
                              : "bg-transparent border-white/60 group-hover:border-white"
                          }`}
                        />
                        <div
                          className={`mt-3 text-sm font-semibold transition-opacity ${
                            isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                          }`}
                        >
                          {exp.title}
                        </div>
                        {company && (
                          <div className="text-[0.68rem] md:text-[0.72rem] opacity-85 mt-1 max-w-[150px] md:max-w-[170px] truncate">
                            {company}
                          </div>
                        )}
                        {exp.timeframe && (
                          <div className="text-xs opacity-70 mt-1">{exp.timeframe}</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {activeExperience && (
                <div className="min-h-[330px] md:h-[320px] flex items-center justify-center">
                  <div
                    className={`w-full rounded-2xl backdrop-blur-md shadow-2xl px-4 md:px-12 py-6 md:py-8 flex flex-col justify-center text-center transition-all duration-300 ease-in-out ${
                      isExperienceVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                    style={{
                      borderColor: "var(--glass-border)",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      backgroundColor: "var(--glass-surface)",
                    }}
                  >
                    {activeExperience.timeframe && (
                      <div className="text-xs md:text-base opacity-75 mb-3 md:mb-4">
                        {activeExperience.timeframe}
                      </div>
                    )}
                    <div className="text-xl md:text-3xl font-semibold mb-2">
                      {activeExperience.title}
                    </div>
                    {activeExperience.subtitle && (
                      <div className="text-sm md:text-lg opacity-80 mb-4 md:mb-6">
                        {activeExperience.subtitle}
                      </div>
                    )}
                    <p className="text-sm md:text-lg opacity-90 leading-relaxed">
                      {activeExperience.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Education / Visual / Skills */}
      <div className="relative min-h-[120vh] md:min-h-0 md:h-[70vh] w-full overflow-hidden text-white py-6 md:py-0">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "var(--journey-gradient)",
          }}
        />

        {/* Blobs */}
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />

        {/* Vignette */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: "var(--journey-vignette)",
          }}
        />

        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-24"
          style={{ background: "var(--section-bridge-top)" }}
        />

        {/* Content */}
        <div className="relative z-10 h-full w-full flex flex-col md:flex-row">
          {/* LEFT — Education */}
          <div className="w-full md:flex-[0_0_33%] h-auto md:h-full px-4 md:px-6 py-3 md:py-6">
            <div
              className="h-full rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center px-4 md:px-8 py-6 md:py-0"
              style={{
                backgroundColor: "var(--glass-surface)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">Education</h2>

              <div className="space-y-8">
                <div>
                  <div className="text-xl font-semibold">
                    High School (Valedictorian)
                  </div>
                  <div className="text-sm opacity-80 mt-1">
                    Charles W. Flanagan
                  </div>
                  <div className="text-xs opacity-60 mt-1">2017–2021</div>
                </div>

                <div className="opacity-60">↓</div>

                <div>
                  <div className="text-xl font-semibold">
                    Associate Degree (Highest Honors)
                  </div>
                  <div className="text-sm opacity-80 mt-1">Broward College</div>
                  <div className="text-xs opacity-60 mt-1">2017–2021</div>
                </div>

                <div className="opacity-60">↓</div>

                <div>
                  <div className="text-xl font-semibold">
                    Bachelor&apos;s Degree (Magna Cum Laude)
                  </div>
                  <div className="text-sm opacity-80 mt-1">
                    University of Florida
                  </div>
                  <div className="text-xs opacity-60 mt-1">2021–2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE — Visual */}
          <div className="w-full md:flex-[0_0_33%] h-64 md:h-full px-0 py-0">
            <div
              className="h-full w-full overflow-hidden relative"
            >
              <img
                src={sectionVisual}
                alt="Section visual"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs md:text-sm font-medium text-white/90 tracking-wide px-3 py-1 rounded-md bg-black/35">
                my favorite animal :)
              </div>
            </div>
          </div>

          {/* RIGHT — Skills */}
          <div className="w-full md:flex-[0_0_33%] h-auto md:h-full px-4 md:px-6 py-3 md:py-6">
            <div
              className="h-full rounded-2xl shadow-2xl flex flex-col md:justify-center px-3 md:px-8 py-5 md:py-8"
              style={{
                backgroundColor: "var(--glass-surface)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-center">Skills</h2>
              <p className="text-xs md:text-sm opacity-80 text-center mt-2 px-2">
                A snapshot of some of the languages and tools I work with most.
              </p>

              {/* Skill list */}
              <div className="mt-5 md:mt-7 space-y-3 md:space-y-4 flex flex-col min-w-0">
                {orderedSkills.map((skill) => (
                  <div
                    key={skill.slug}
                    className="w-full min-w-0 flex items-center justify-center gap-2 md:gap-4"
                  >
                    <img
                      src={skill.visual}
                      alt={skill.name}
                      className="hidden md:block h-9 w-auto max-w-[150px] object-contain"
                      loading="lazy"
                    />
                    <div className="min-w-[104px] md:min-w-[140px] text-center md:text-left">
                      <div className="font-semibold text-sm md:text-base leading-tight">{skill.name}</div>
                      <Badge bg="secondary" className="text-[0.66rem] md:text-[0.7rem] mt-1">
                        {skill.proficiency}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="pt-6 flex justify-center">
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => setShowSkills(true)}
                >
                  View all skills
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Skills Modal (RESTORED) --- */}
        <Modal
          show={showSkills}
          onHide={() => setShowSkills(false)}
          centered
          size="lg"
          dialogClassName="skills-modal-dialog"
          contentClassName="skills-modal-content"
        >
          <Modal.Header
            closeButton
            closeVariant="white"
            className="skills-modal-header"
          >
            <Modal.Title>Languages &amp; Tools</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="space-y-4">
              {groupedSkills.map((group) =>
                group.skills.length ? (
                  <div key={group.title}>
                    <h5 className="font-semibold mb-2">{group.title}</h5>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((s) => (
                        <div
                          key={s.slug}
                          className="skills-modal-chip flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-2 px-2 py-2 md:py-1 rounded-md text-center md:text-left"
                          title={`${s.name} • ${s.proficiency}`}
                        >
                          <img
                            src={s.visual}
                            alt={s.name}
                            className="h-8"
                            loading="lazy"
                          />
                          <div className="text-sm">
                            <div className="font-medium">{s.name}</div>
                            <div className="text-xs skills-modal-muted">
                              {s.proficiency}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          </Modal.Body>

          <Modal.Footer className="skills-modal-footer">
            <Button variant="outline-light" onClick={() => setShowSkills(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* SECTION 4 */}
      <div className="min-h-[90vh] md:h-[75vh] w-full flex flex-col md:flex-row">
        {/* Left: themed contact panel */}
        <div
          className="w-full md:w-1/2 flex items-center justify-center py-10 md:py-0 px-4"
          style={{ backgroundColor: "var(--contact-surface)" }}
        >
          <div
            className="text-center space-y-6"
            style={{ color: "var(--contact-text)" }}
          >
            <h2 className="text-3xl md:text-5xl font-light">Feel Free to Contact Me!</h2>

            <div className="text-base md:text-2xl font-light leading-relaxed px-2 max-w-full">
              <div className="break-all text-sm md:text-2xl">gabriel.castejon0802@gmail.com</div>
              <div>+1 (954) 918-8054</div>
            </div>

            <div className="flex items-center justify-center gap-8 pt-2">
              <a
                href="https://github.com/gabo0802"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition"
                aria-label="GitHub"
              >
                <img
                  className="h-10 w-10"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="GitHub"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/gabriel-castejon/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition"
                aria-label="LinkedIn"
              >
                <img
                  className="h-10 w-10"
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Right: full-height image */}
        <div
          className="w-full md:w-1/2 h-64 md:h-full"
          style={{
            backgroundImage: `url(${cafe})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}

export default MainPage;
