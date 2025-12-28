import React from "react";
import { Badge, Card, Carousel, ListGroup } from "react-bootstrap";
import { experiences } from "../../Data/experiences";
import { featuredSkills } from "../../Data/skills";
import { proficiencyRank } from "../../Data/types";


const orderedSkills = [...featuredSkills].sort(
  (a, b) => proficiencyRank[b.proficiency] - proficiencyRank[a.proficiency]
);

function MainPage() {
    return (
        <div className="flex flex-col w-full">
      {/* SECTION 1 */}
      <div className="bg-[#282c34] h-[75vh] w-full flex text-white">
        <div className="flex-[0_0_35%] flex items-center justify-center">
          {/* Placeholder for image – 50% of this area's width/height */}
          <div className="w-1/2 h-1/2 bg-black rounded-lg" />
        </div>

        {/* Right side – remaining width */}
        <div className="flex-[0_0_65%] flex flex-col justify-center items-center px-12 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Hi, I&apos;m Gabriel Castejon
          </h1>
          <Card className="bg-[#1f232b] text-white shadow-lg w-full max-w-xl border-0">
            <Card.Title className="pt-5 text-xl font-bold">Software Engineer @ Electronic Arts</Card.Title>
            <Card.Body className="md:p-4">
            <Card.Text className="text-lg leading-relaxed">
                This is a short introduction about who I am, what I do, and what
                this portfolio is about. I&apos;ll replace this placeholder text
                with a proper summary of my work and interests.
            </Card.Text>
            </Card.Body>
            </Card>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
        <div className="flex-[0_0_25%] flex items-center justify-center px-4">
            <p>toReplace</p>
        </div>
        <div className="flex-[0_0_50%] flex items-center justify-center px-4">
            <Carousel indicators={true} controls={true} className="h-full w-full max-w-2xl" interval={5000}>
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
        <div className="flex-[0_0_25%] flex items-center justify-center px-4">
            <p>test</p>
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
            <Card.Title className="text-2xl font-bold mb-3">Skills</Card.Title>
            <Card.Text className="text-sm opacity-80 mb-3">
            A snapshot of some of the languages and tools I work with most.
            </Card.Text>
            <div className="space-y-3">
            {orderedSkills.map((skill) => (
                <div
                key={skill.slug}
                className="flex items-center gap-3"
                >
                {/* Badge/logo */}
                <img
                    src={skill.visual}
                    alt={skill.name}
                    className="h-8"
                />

                {/* Name + proficiency */}
                <div className="flex flex-col">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-xs opacity-70 flex items-center gap-2">
                    <Badge bg="secondary" className="text-[0.65rem]">
                        {skill.proficiency}
                    </Badge>
                    </span>
                </div>
                </div>
            ))}
            </div>
        </Card.Body>
        </Card>
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

    <div className="flex-[0_0_60%] flex items-center justify-center px-6">
        <div className="w-full max-w-2xl border border-dashed border-gray-500 rounded-2xl h-2/3 flex items-center justify-center text-center opacity-70">
        <p className="text-sm md:text-base">
            Future content goes here – maybe a contact form, map, or a final call-to-action.
        </p>
        </div>
    </div>
    </div>
    </div>
    );
}

export default MainPage;