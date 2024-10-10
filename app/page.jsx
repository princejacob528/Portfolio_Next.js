/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";

// components
import Socials from "@/components/Socials";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* Hero Head */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  1000,
                  "Front-End Developer",
                  1000,
                  "Back-End Developer",
                  1000,
                  "Web Developer",
                  1000,
                  "React Developer",
                  1000,
                  "Next.js Developer",
                  1000,
                  "JavaScript Developer",
                  1000,
                  "UI/UX Developer",
                  1000,
                  "Web App Developer",
                  1000,
                  "Full-Stack JavaScript Developer",
                  1000,
                  "Frontend Engineer",
                  1000,
                  "Backend Engineer",
                  1000,
                  "API Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
            <h1 className="h1 mb-6">
              Hello I'm <br />
              <span className="text-accent">Prince Jacob</span>
            </h1>
            <p className="max-w-[600px] mb-9 text-white/80">
              I excel at crafting elegant digital experiences and I am
              proficient in various programming languages and technologies.
            </p>
            {/* Btn & socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a
                href="/Asset/CV/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outlined"
                  size="lg"
                  className="uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>

              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent tex-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Hero Photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
