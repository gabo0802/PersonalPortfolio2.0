import React, { useMemo, useState } from "react";
import { Badge, Card, Carousel, ListGroup, Button, Modal } from "react-bootstrap";
import { experiences } from "../../Data/experiences";
import { featuredSkills, skillsBySlug } from "../../Data/skills";
import { proficiencyRank } from "../../Data/types";
import type { Skill } from "../../Data/types";

// Image Imports
import linkedInBg from "../../Assets/images/linkedIn2.jpg";
import EABg from "../../Assets/images/EABackground.jpg";
import cafe from "../../Assets/images/cafe.jpg";


const orderedSkills = [...featuredSkills].sort(
  (a, b) => proficiencyRank[b.proficiency] - proficiencyRank[a.proficiency]
);

// README-style grouping by slug (matches GitHub README categories) :contentReference[oaicite:1]{index=1}
const skillGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Back-End",
    slugs: ["cpp", "java", "csharp", "dotnet", "python", "nodejs", "flask", "go"],
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
  { title: "DevOps", slugs: ["docker", "kubernetes", "gcp", "jenkins", "githubactions"] },
  { title: "AI Tools", slugs: ["scikitlearn", "pytorch", "tensorflow"] },
  { title: "Version Control", slugs: ["git", "github", "gitlab"] },
  { title: "IDEs", slugs: ["vscode", "eclipse", "visualstudio", "clion", "intellij", "replit"] },
  { title: "Project Management", slugs: ["discord", "notion", "googletasks", "jira"] },
  { title: "Other Tools", slugs: ["markdown", "latex", "bash", "cmake", "matlab", "r", "unity", "godot"] },
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
      <div className="bg-[#282c34] h-[75vh] w-full flex text-white" 
      style={{
          backgroundImage: `url("${EABg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="flex-[0_0_35%] flex items-center justify-center" >
          <div className="w-3/4 h-3/4 bg-black rounded-lg" 
          style={{
          backgroundImage: `url("${linkedInBg}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}/>
        </div>

        {/* Right side – remaining width */}
        <div className="flex-[0_0_65%] flex flex-col justify-center items-center px-12 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Hi, I&apos;m Gabriel Castejon
          </h1>
          <Card className="bg-[#1f232b] text-white shadow-lg w-full max-w-2xl border-0">
            <Card.Title className="pt-5 text-xl font-bold">Software Engineer @ Electronic Arts</Card.Title>
            <Card.Body className="md:p-4">
            <Card.Text className="text-lg leading-relaxed text-left">
                - Graduate from the <strong>University of Florida</strong> 🐊 with a Computer Science Major and Business Administration and Economics Minors<br></br>
                - Prev SWE Intern @ <strong>Google</strong> and <strong>Electronic Arts</strong><br></br>
                - <strong>ColorStack</strong> and <strong>SHPE</strong> Member, <strong>HSF</strong> Scholar<br></br>
                - Currently a Software Engineer at the <strong>EA SPORTS Academy</strong> program, as a back-end engineer in the College Football Modes team.<br></br>
                - Mostly been front-end / full stack developer, but with experience in tons of other tools, see some of what I've worked with below ~<br></br>
            </Card.Text>
            </Card.Body>
            </Card>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="bg-[#151B54] h-[75vh] w-full flex items-center justify-center text-white">
        <div className="flex-[0_0_10%] h-full flex items-center justify-center px-4">
        </div>
        <div className="flex-[0_0_80%] flex items-center justify-center px-4">
            <Carousel indicators={true} controls={true} className="h-full w-full max-w-4xl" interval={5000}>
            {experiences.map((exp) => (
                <Carousel.Item key={exp.title}>
                <div className="h-[260px] md:h-[340px] flex items-stretch">
                    <Card className="bg-[#1f232b] text-white border-0 shadow-lg w-full h-full">
                    <Card.Body className="h-full flex flex-col justify-center p-6 md:p-8">
                        <Card.Title className="text-xl md:text-2xl font-bold">
                        {exp.title}
                        </Card.Title>

                        {exp.subtitle && (
                        <Card.Subtitle className="mt-1 mb-2 text-sm opacity-80">
                            {exp.subtitle}
                        </Card.Subtitle>
                        )}

                        {exp.timeframe && (
                        <div className="text-xs mb-3 opacity-70">
                            {exp.timeframe}
                        </div>
                        )}

                        <Card.Text className="text-sm md:text-base leading-relaxed">
                        {exp.description}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                </div>
                </Carousel.Item>
            ))}
            </Carousel>
        </div>
        <div className="flex-[0_0_10%] flex items-center justify-center px-4">
        </div>
      </div>

      {/* SECTION 3 */}
      <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
        {/* Education Section */}
        <div className="flex-[0_0_33%] flex items-center justify-center px-6">
            <Card bg="dark" text="white" className="w-full max-w-sm border-0 shadow-lg pb-2">
            <Card.Body>
                <Card.Title className="text-2xl font-bold">Education</Card.Title>
            </Card.Body>
            <ListGroup variant="flush" className="bg-transparent">
                <ListGroup.Item className="bg-transparent text-white border-0">
                <h3 className="text-lg font-semibold">High School (Valedictorian)</h3>
                <p className="text-sm opacity-80">
                    Charles W. Flanagan
                </p>
                <p className="text-xs opacity-60">
                    2017-2021
                </p>
                </ListGroup.Item>
                <div className="text-center text-gray-400 text-sm my-1">↓</div>
                <ListGroup.Item className="bg-transparent text-white border-0">
                <h3 className="text-lg font-semibold">
                    Associate Degree (Highest Honors)
                </h3>
                <p className="text-sm opacity-80">
                    Broward College
                </p>
                <p className="text-xs opacity-60">
                    2017-2021
                </p>
                </ListGroup.Item>
                <div className="text-center text-gray-400 text-sm my-1">↓</div>
                <ListGroup.Item className="bg-transparent text-white border-0">
                <h3 className="text-lg font-semibold">Bachelor&apos;s Degree (Magna Cum Laude)</h3>
                <p className="text-sm opacity-80">
                    University of Florida
                </p>
                <p className="text-xs opacity-60">
                    2021-2025
                </p>
                </ListGroup.Item>
            </ListGroup>
            </Card>
        </div>

        {/* Middle image column */}
        <div className="flex-[0_0_33%] flex items-center justify-center px-6">
            {/* Placeholder for image */}
            <div className="w-3/4 h-3/4 bg-black rounded-xl" />
        </div>

        {/* Skills column*/}
        <div className="flex-[0_0_33%] flex items-center justify-center px-6">
        <Card bg="dark" text="white" className="w-full max-w-sm border-0 shadow-lg">
            <Card.Body>
            <Card.Title className="text-2xl font-bold mb-3 text-center">Skills</Card.Title>
            <Card.Text className="text-sm opacity-80 mb-3 text-center">
            A snapshot of some of the languages and tools I work with most.
            </Card.Text>

            {/* Highlight skills (featuredSkills) */}
            <div className="space-y-3 flex flex-col items-center">
            {orderedSkills.map((skill) => (
            <div key={skill.slug} className="flex items-center gap-3 justify-center">
                <img src={skill.visual} alt={skill.name} className="h-8" />

                <div className="flex flex-col text-center">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-xs opacity-70 flex items-center gap-2 justify-center">
                <Badge bg="secondary" className="text-[0.65rem]">
                {skill.proficiency}
                </Badge>
                </span>
                </div>
                </div>
                ))}
            </div>

            {/* Button to open full list */}
            <div className="mt-4 flex justify-center">
                <Button
                variant="outline-light"
                size="sm"
                onClick={() => setShowSkills(true)}
                >
                View all skills
                </Button>
            </div>
            </Card.Body>
        </Card>

        {/* Modal popup (GitHub README style groups) */}
        <Modal
            show={showSkills}
            onHide={() => setShowSkills(false)}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
            <Modal.Title>Languages & Tools</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <div className="space-y-4">
                {groupedSkills.map((group) =>
                group.skills.length ? (
                    <div key={group.title}>
                    <h5 className="font-semibold mb-2">{group.title}</h5>

                    <div className="flex flex-wrap gap-2">
                        {group.skills.map((s) => (
                        <img
                            key={s.slug}
                            src={s.visual}
                            alt={s.name}
                            title={`${s.name} • ${s.proficiency}`}
                            className="h-8"
                            loading="lazy"
                        />
                        ))}
                    </div>
                    </div>
                ) : null
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
    </div>


      {/* SECTION 4 */}
    <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
    {/* Left column – 40%: Contact Me */}
    <div className="flex-[0_0_40%] flex items-center justify-center px-6">
        <Card bg="dark" text="white" className="w-full max-w-md border-0 shadow-lg">
        <Card.Body>
            <Card.Title className="text-3xl font-bold mb-4">
            Contact Me
            </Card.Title>

            <Card.Text className="text-sm opacity-80 mb-4">
            Feel free to reach out if you&apos;d like to chat about opportunities,
            projects, or anything tech-related.
            </Card.Text>

            {/* Social links */}
            <div className="flex flex-col gap-3">
            {/* GitHub */}
            <a
                href="https://github.com/gabo0802"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center"
            >
                <img
                src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
                alt="GitHub"
                />
            </a>

            {/* LinkedIn */}
            <a
                href="https://www.linkedin.com/in/gabriel-castejon/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center"
            >
                <img
                src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"
                alt="LinkedIn"
                />
            </a>

            {/* Email */}
            <div className="mt-2">
                <div className="text-xs uppercase opacity-60">Email</div>
                <a
                href="mailto:gabriel.castejon0802@gmail.com"
                className="text-sm text-blue-400 hover:underline break-all"
                >
                gabriel.castejon0802@gmail.com
                </a>
            </div>
            </div>
        </Card.Body>
        </Card>
    </div>

    <div className="flex-[0_0_60%] flex items-center justify-center px-6 h-full w-full" style={{
          backgroundImage: `url(${cafe})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        </div>
    </div>
    </div>
    );
}

export default MainPage;