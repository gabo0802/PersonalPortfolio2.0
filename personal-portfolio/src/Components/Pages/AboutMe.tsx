import React from "react";
import { Card, Button } from "react-bootstrap";

function AboutMe() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1 */}
      <div className="bg-[#282c34] h-[75vh] w-full flex items-center justify-center text-white">
        {/* Inner container matching the screenshot layout */}
        <div className="w-11/12 md:w-3/4 flex flex-col">
          {/* Top row: title (left) + resume button (right) */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              About Gabe...
            </h1>

            <a href="/resume.pdf" download>
              <Button variant="primary">
                Download My Resume
              </Button>
            </a>
          </div>

          {/* Separator line */}
          <div className="border-t border-gray-400 mb-8" />

          {/* Centered card below */}
          <div className="flex justify-center">
            {/* Card: 75% of this inner container, with some height */}
            <Card className="bg-[#1f232b] text-white shadow-lg border border-gray-300 w-3/4 h-1/2">
              <Card.Body className="h-full flex flex-col items-center justify-center text-center px-6 md:px-10">
                <p className="text-base md:text-lg leading-relaxed">
                  Born and raised in Caracas, Venezuela, I always found the software
                  around me to be fascinating. Once I moved to the United States, I took
                  the first opportunities I found to take as many computer-programming
                  related courses and bootcamps as possible. Once I graduated high school
                  and entered the University of Florida, I stumbled upon CodePath, a
                  non-profit organization that has furthered my understanding of the
                  software engineering field and provided me with opportunities that I
                  could have only dreamed of when I first moved into this country. My
                  willingness to learn fast is what drives me in this industry!
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
