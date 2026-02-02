import React, { useMemo, useState } from "react";
import {
  Badge,
  Card,
  Carousel,
  ListGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { experiences } from "../../Data/experiences";
import { featuredSkills, skillsBySlug } from "../../Data/skills";
import { proficiencyRank } from "../../Data/types";
import type { Skill } from "../../Data/types";

// Image Imports
import linkedInBg from "../../Assets/images/linkedIn2.jpg";
import EABg from "../../Assets/images/EABackground.jpg";
import cafe from "../../Assets/images/cafe.jpg";

const orderedSkills = [...featuredSkills].sort(
  (a, b) => proficiencyRank[b.proficiency] - proficiencyRank[a.proficiency],
);

// README-style grouping by slug (matches GitHub README categories) :contentReference[oaicite:1]{index=1}
const skillGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Back-End",
    slugs: [
      "cpp",
      "java",
      "csharp",
      "dotnet",
      "python",
      "nodejs",
      "flask",
      "go",
    ],
  },
  {
    title: "Front-End",
    slugs: [
      "react",
      "angular",
      "materialui",
      "bootstrap",
      "html",
      "css",
      "sass",
      "javascript",
      "typescript",
      "tailwind",
      "figma",
      "androidstudio",
      "kotlin",
    ],
  },
  { title: "Database", slugs: ["mysql", "sqlite", "firebase"] },
  {
    title: "DevOps",
    slugs: ["docker", "kubernetes", "gcp", "jenkins", "githubactions"],
  },
  { title: "AI Tools", slugs: ["scikitlearn", "pytorch", "tensorflow"] },
  { title: "Version Control", slugs: ["git", "github", "gitlab"] },
  {
    title: "IDEs",
    slugs: ["vscode", "eclipse", "visualstudio", "clion", "intellij", "replit"],
  },
  {
    title: "Project Management",
    slugs: ["discord", "notion", "googletasks", "jira"],
  },
  {
    title: "Other Tools",
    slugs: [
      "markdown",
      "latex",
      "bash",
      "cmake",
      "matlab",
      "r",
      "unity",
      "godot",
    ],
  },
  { title: "Operating Systems", slugs: ["windows", "macos", "steamos"] },
];

// Type guard: filters missing skills cleanly
const isSkill = (s: Skill | undefined): s is Skill => s !== undefined;

function MainPage() {
  const [showSkills, setShowSkills] = useState(false);

  const groupedSkills = useMemo(() => {
    return skillGroups.map((g) => ({
      title: g.title,
      skills: g.slugs.map((slug) => skillsBySlug[slug]).filter(isSkill),
    }));
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1 */}
      <div
        className="bg-[#282c34] h-[75vh] w-full flex text-white"
        style={{
          backgroundImage: `url("${EABg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex-[0_0_35%] flex items-center justify-center">
          <div
            className="w-3/4 h-3/4 bg-black rounded-lg"
            style={{
              backgroundImage: `url("${linkedInBg}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Right side – remaining width */}
        <div className="flex-[0_0_65%] flex flex-col justify-center items-center px-12 space-y-6">
          <h1 className="text-black text-4xl md:text-5xl font-bold">
            Hi, I&apos;m Gabriel Castejon
          </h1>
          <Card className="bg-[#1f232b] text-white shadow-lg w-full max-w-2xl border-0">
            <Card.Title className="pt-5 text-xl font-bold">
              Software Engineer @ Electronic Arts
            </Card.Title>
            <Card.Body className="md:p-4">
              <Card.Text className="text-lg leading-relaxed text-left">
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
      <div className="relative h-[75vh] w-full overflow-hidden text-white">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0b102a 0%, #101b47 40%, #0c1638 100%)",
          }}
        />

        {/* Blobs (no custom colors required, but these are muted + nice) */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-24 -right-32 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-[560px] h-[560px] rounded-full bg-white/10 blur-3xl" />

        {/* Vignette to keep focus */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative h-full w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-10">
            My Journey:
          </h2>

          <div className="w-full px-4 flex items-center justify-center">
            <div className="w-full max-w-5xl">
              <Carousel indicators controls interval={5000} className="w-full">
                {experiences.map((exp) => (
                  <Carousel.Item key={exp.title}>
                    <div className="h-[320px] md:h-[360px] flex items-center justify-center">
                      <div className="w-full h-full rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md shadow-2xl px-10 md:px-16 flex flex-col justify-center text-center">
                        {exp.timeframe && (
                          <div className="text-sm md:text-base opacity-75 mb-4">
                            {exp.timeframe}
                          </div>
                        )}
                        <div className="text-2xl md:text-3xl font-semibold mb-2">
                          {exp.title}
                        </div>
                        {exp.subtitle && (
                          <div className="text-base md:text-lg opacity-80 mb-6">
                            {exp.subtitle}
                          </div>
                        )}
                        <p className="text-base md:text-lg opacity-90 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 — Education / Visual / Skills */}
      <div className="relative h-[75vh] w-full overflow-hidden text-white">
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0b102a 0%, #101b47 40%, #0c1638 100%)",
          }}
        />

        {/* Blobs */}
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full bg-white/10 blur-3xl" />

        {/* Vignette */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full w-full flex">
          {/* LEFT — Education */}
          <div className="flex-[0_0_33%] h-full px-6 py-10">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center px-8">
              <h2 className="text-3xl font-semibold mb-8">Education</h2>

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
          <div className="flex-[0_0_33%] h-full px-6 py-10">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 shadow-2xl overflow-hidden relative">
              <img
                src={/* replace with your image */ ""}
                alt="Section visual"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>

          {/* RIGHT — Skills */}
          <div className="flex-[0_0_33%] h-full px-6 py-10">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 shadow-2xl flex flex-col px-8 py-10">
              <h2 className="text-3xl font-semibold text-center">Skills</h2>
              <p className="text-sm opacity-80 text-center mt-2">
                A snapshot of some of the languages and tools I work with most.
              </p>

              {/* Skill list */}
              <div className="mt-8 space-y-4 flex-1 flex flex-col justify-center">
                {orderedSkills.map((skill) => (
                  <div
                    key={skill.slug}
                    className="flex items-center gap-4 justify-center"
                  >
                    <img
                      src={skill.visual}
                      alt={skill.name}
                      className="h-9"
                      loading="lazy"
                    />
                    <div className="min-w-[140px]">
                      <div className="font-semibold">{skill.name}</div>
                      <Badge bg="secondary" className="text-[0.7rem] mt-1">
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
        >
          <Modal.Header closeButton>
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
                          className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md"
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
                            <div className="text-xs opacity-70">
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

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSkills(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* SECTION 4 */}
      <div className="h-[75vh] w-full flex">
        {/* Left: white contact panel */}
        <div className="w-1/2 bg-[#f7f8f2] flex items-center justify-center">
          <div className="text-center text-black space-y-6">
            <h2 className="text-5xl font-light">Feel Free to Contact Me!</h2>

            <div className="text-2xl font-light leading-relaxed">
              <div>gabriel.castejon0802@gmail.com</div>
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
          className="w-1/2 h-full"
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
