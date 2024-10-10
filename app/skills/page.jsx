"use client";

import React, { useState } from "react";
import {
  FaBootstrap,
  FaCode,
  FaCss3Alt,
  FaFigma,
  FaHtml5,
  FaJsSquare,
  FaNodeJs,
  FaPhp,
  FaReact,
} from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoMongodb, BiLogoPostgresql } from "react-icons/bi";
import { TiHtml5 } from "react-icons/ti";
import {
  SiEjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiVite,
  SiXampp,
} from "react-icons/si";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiDatabase } from "react-icons/fi";
import Cookies from "js-cookie";

const skills = [
  {
    id: 1,
    name: "React",
    color: "#61DAFB",
    icon: <FaReact />,
    projects: true,
    tag: "MERN",
    description:
      "React allows me to build fast, scalable, and modular web applications. Utilizing hooks and context, I create reusable components, optimize state management, and ensure a smooth user experience across various devices.",
  },
  {
    id: 2,
    name: "Vite",
    color: "#930dd3",
    icon: <SiVite />,
    projects: true,
    tag: "React",
    description:
      "Vite supercharges my development workflow with instant hot module replacement and lightning-fast builds. It’s my preferred tool for creating modern web applications with minimal setup.",
  },
  {
    id: 3,
    name: "Next.js",
    color: "#fff",
    icon: <RiNextjsFill />,
    projects: true,
    tag: "React",
    description:
      "Next.js empowers me to build full-stack applications with server-side rendering (SSR), static site generation (SSG), and API routes, enhancing both performance and SEO for web apps.",
  },
  {
    id: 4,
    name: "Node.js",
    color: "#8CC84B",
    icon: <FaNodeJs />,
    projects: true,
    tag: "MERN",
    description:
      "With Node.js, I develop high-performance, event-driven backend services. It’s the core of my ability to create full-stack JavaScript applications, including RESTful APIs and real-time data-driven platforms.",
  },
  {
    id: 5,
    name: "Express",
    color: "#FFFFFF",
    icon: <SiExpress />,
    projects: true,
    tag: "MERN",
    description:
      "Express is my go-to web framework for building robust backend applications in Node.js. It simplifies routing, middleware management, and API development, making it ideal for creating scalable RESTful services.",
  },
  {
    id: 6,
    name: "EJS",
    color: "#A91E50",
    icon: <SiEjs />,
    projects: false,
    description:
      "EJS is my templating engine of choice for embedding JavaScript into HTML. It allows me to create dynamic web pages efficiently by rendering server-side content directly into the frontend.",
  },
  {
    id: 15,
    name: "Tailwind CSS",
    color: "#38B2AC",
    icon: <RiTailwindCssFill />,
    projects: false,
    description:
      "Tailwind CSS enables me to rapidly style websites with a utility-first approach, reducing the need for custom CSS. Its flexibility allows me to focus on design without sacrificing performance or maintainability, ensuring responsive and modern layouts in my projects.",
  },
  {
    id: 7,
    name: "MongoDB",
    color: "#47A248",
    icon: <BiLogoMongodb />,
    projects: true,
    tag: "MERN",
    description:
      "MongoDB offers me a flexible, scalable NoSQL database solution for handling unstructured data. Its JSON-like documents and powerful querying capabilities enable rapid development of data-centric applications.",
  },
  {
    id: 8,
    name: "Postman",
    color: "#FF6C37",
    icon: <SiPostman />,
    projects: false,
    description:
      "Postman is my go-to tool for API development, testing, and debugging. It simplifies API workflows, allowing me to test endpoints efficiently, inspect responses, and automate tests, ensuring smooth backend communication.",
  },
  {
    id: 9,
    name: "SQL",
    color: "#DB7533",
    icon: <FiDatabase />,
    projects: true,
    tag: "Web",
    description:
      "SQL is essential for my database management, allowing me to design, query, and maintain relational databases. I use it to manage complex datasets, optimize queries, and ensure efficient data retrieval in my applications.",
  },
  {
    id: 10,
    name: "MySQL",
    color: "#4479A1",
    icon: <SiMysql />,
    projects: true,
    tag: "Web",
    description:
      "MySQL is my preferred relational database for scalable and reliable data management. I use it to design efficient database schemas, write complex queries, and manage large datasets across my applications.",
  },
  {
    id: 11,
    name: "PostgreSQL",
    color: "#336791",
    icon: <BiLogoPostgresql />,
    projects: false,
    description:
      "PostgreSQL is my choice for powerful, open-source relational database management. Its advanced features like JSONB support and complex queries enable me to handle a variety of data models, ensuring robust performance and scalability.",
  },
  {
    id: 12,
    name: "XAMPP",
    color: "#fb7b1f",
    icon: <SiXampp />,
    projects: true,
    tag: "Web",
    description:
      "XAMPP is my go-to solution for setting up a local development environment. It combines Apache, MySQL, and PHP, allowing me to quickly test and deploy web applications without needing complex server configurations.",
  },
  {
    id: 13,
    name: "PHP",
    color: "#777BB4",
    icon: <FaPhp />,
    projects: true,
    tag: "Web",
    description:
      "PHP powers my backend development for dynamic websites and server-side applications. I use it to handle server logic, interact with databases, and integrate with content management systems like WordPress.",
  },
  {
    id: 14,
    name: "HTML5",
    color: "#E44D26",
    icon: <TiHtml5 />,
    projects: true,
    tag: "Web",
    description:
      "HTML5 introduces advanced features such as native audio and video elements, local storage, and more semantic tags, allowing me to create modern, performant web applications with enhanced functionality and structure.",
  },
  {
    id: 16,
    name: "JavaScript",
    color: "#F7DF1E",
    icon: <FaJsSquare />,
    projects: true,
    tag: "Web",
    description:
      "JavaScript is my go-to language for adding interactivity and logic to the web. From DOM manipulation to working with APIs, I leverage modern ES6+ features to create dynamic, feature-rich applications.",
  },
  {
    id: 17,
    name: "CSS",
    color: "#1572B6",
    icon: <FaCss3Alt />,
    projects: true,
    tag: "Web",
    description:
      "With CSS, I transform basic web structure into visually appealing and responsive designs, mastering layout techniques like Flexbox, Grid, and custom animations to bring user interfaces to life.",
  },
  {
    id: 18,
    name: "Bootstrap V5",
    color: "#7952B3",
    icon: <FaBootstrap />,
    projects: true,
    tag: "Web",
    description:
      "Bootstrap 5 is my go-to front-end framework for building responsive and mobile-first web applications. With its pre-built components and flexible grid system, I can quickly prototype and develop sleek, consistent UIs.",
  },
  {
    id: 19,
    name: "VS Code",
    color: "#007ACC",
    icon: <FaCode />,
    projects: false,
    description:
      "Visual Studio Code is my primary code editor, offering a rich ecosystem of extensions, intelligent code completion, and integrated terminal support. It optimizes my workflow with debugging and Git integration.",
  },
  {
    id: 20,
    name: "Figma",
    color: "#FFFFFF",
    icon: <FaFigma />,
    projects: false,
    description:
      "Figma helps me design intuitive and responsive user interfaces, allowing for seamless collaboration and prototyping. I use it to create wireframes and high-fidelity designs, ensuring a smooth handoff from design to development.",
  },
];

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill.id === selectedSkill ? null : skill.id); // Toggle between expanded and collapsed state
  };

  const handleClick = (skill) => {
    Cookies.set("skillTag", skill, { expires: 7 });
  };

  return (
    <motion.div
      className="flex flex-col items-center mb-12"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 1.8, duration: 0.4, ease: "easeInOut" },
      }}
    >
      <h2 className="text-2xl font-semibold mb-6">My Skills</h2>
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-6">
        {skills.map((skill) => {
          const isSelected = selectedSkill === skill.id;

          return (
            <div
              key={skill.id}
              className={`relative p-4 w-full border-2 border-gray-300 rounded-lg transition-all duration-300 flex flex-col justify-center cursor-pointer ${
                isSelected
                  ? "col-span-2 xl:col-span-5 h-80 xl:h-60" // Enlarged box
                  : "h-32 hover:border-accent" // Small box
              }`}
              onClick={() => handleSkillClick(skill)}
              onMouseEnter={() => {
                if (!isSelected) {
                  document.getElementById(
                    `skill-name-${skill.id}`
                  ).style.color = "var(--accent-color)";
                  document.getElementById(
                    `skill-icon-${skill.id}`
                  ).style.color = skill.color;
                }
              }}
              onMouseLeave={() => {
                if (!isSelected) {
                  document.getElementById(
                    `skill-name-${skill.id}`
                  ).style.color = "gray";
                  document.getElementById(
                    `skill-icon-${skill.id}`
                  ).style.color = "gray";
                }
              }}
            >
              {/* Icon and Name for Small Box */}
              {!isSelected && (
                <>
                  <div
                    id={`skill-icon-${skill.id}`}
                    className="text-4xl text-gray-500"
                    style={{
                      color: isSelected ? skill.color : "gray",
                    }}
                  >
                    {skill.icon}
                  </div>
                  <p
                    id={`skill-name-${skill.id}`}
                    className="mt-2 text-lg text-gray-600 transition-colors duration-300 font-bold hover:text-accent"
                  >
                    {skill.name}
                  </p>
                </>
              )}

              {/* Icon and Name for Enlarged Box */}
              {isSelected && (
                <>
                  <div className="absolute top-4 left-4 text-lg font-bold">
                    <p id={`skill-name-${skill.id}`} className="text-accent">
                      {skill.name}
                    </p>
                  </div>

                  <div
                    id={`skill-icon-${skill.id}`}
                    className="absolute top-4 right-4 text-4xl"
                    style={{
                      color: skill.color,
                    }}
                  >
                    {skill.icon}
                  </div>

                  <p className="text-white/80 xl:mt-2 mt-12 w-full max-w-4xl">
                    {skill.description}
                  </p>
                  {/* Projects Button */}
                  {skill.projects ? (
                    <Link href="/projects">
                      <button
                        onClick={handleClick(skill.tag)}
                        className="text-xs mt-4 py-1 px-2 rounded-full border hover:text-accent hover:border-accent transition-all duration-300"
                      >
                        See Projects
                      </button>
                    </Link>
                  ) : null}
                </>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Skills;
