import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { experiences } from "../../Data/experiences";

function MainPage() {
    return (
        <div className="flex flex-col w-full">
      {/* SECTION 1 */}
      <div className="bg-[#282c34] h-[75vh] w-full flex text-white">
        {/* Left side – 35% width */}
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
        <p className="text-3xl">Section 3</p>
      </div>

      {/* SECTION 4 */}
      <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
        <p className="text-3xl">Section 4</p>
      </div>
    </div>
    );
}

export default MainPage;