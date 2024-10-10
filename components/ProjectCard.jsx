/* eslint-disable react/jsx-key */
import { useState } from "react";
import { HiCodeBracket } from "react-icons/hi2";
import { LuEye } from "react-icons/lu";
import Link from "next/link";

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
import { motion } from "framer-motion";
import { FiDatabase } from "react-icons/fi";
import { FaAws } from "react-icons/fa";
import { SiNginx } from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { SiAxios } from "react-icons/si";

const skillsData = [
  {
    name: "React",
    icon: <FaReact />,
    color: "#61DAFB",
  },
  {
    name: "AWS",
    icon: <FaAws />,
    color: "#FFFFFF",
  },
  {
    name: "Nginx",
    icon: <SiNginx />,
    color: "#FFFFFF",
  },
  {
    name: "Vite",
    icon: <SiVite />,
    color: "#930dd3",
  },
  {
    name: "Next.js",
    icon: <RiNextjsFill />,
    color: "#fff",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs />,
    color: "#8CC84B",
  },
  {
    name: "Express",
    icon: <SiExpress />,
    color: "#FFFFFF",
  },
  {
    name: "EJS",
    icon: <SiEjs />,
    color: "#A91E50",
  },
  {
    name: "MongoDB",
    icon: <BiLogoMongodb />,
    color: "#47A248",
  },
  {
    name: "Postman",
    icon: <SiPostman />,
    color: "#FF6C37",
  },
  {
    name: "SQL",
    icon: <FiDatabase />,
    color: "#DB7533",
  },
  {
    name: "MySQL",
    icon: <SiMysql />,
    color: "#4479A1",
  },
  {
    name: "PostgreSQL",
    icon: <BiLogoPostgresql />,
    color: "#336791",
  },
  {
    name: "XAMPP",
    icon: <SiXampp />,
    color: "#fb7b1f",
  },
  {
    name: "PHP",
    icon: <FaPhp />,
    color: "#777BB4",
  },
  {
    name: "HTML5",
    icon: <TiHtml5 />,
    color: "#E44D26",
  },
  {
    name: "HTML",
    icon: <FaHtml5 />,
    color: "#E44D26",
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare />,
    color: "#F7DF1E",
  },
  {
    name: "CSS",
    icon: <FaCss3Alt />,
    color: "#1572B6",
  },
  {
    name: "Bootstrap V5",
    icon: <FaBootstrap />,
    color: "#7952B3",
  },
  {
    name: "VS Code",
    icon: <FaCode />,
    color: "#007ACC",
  },
  {
    name: "Figma",
    icon: <FaFigma />,
    color: "#FFFFFF",
  },
  {
    name: "Tailwind CSS",
    color: "#38B2AC",
    icon: <RiTailwindCssFill  />,
  },
  {
    name: "APIs",
    color: "#FFFFFF",
    icon: <TbApi />,
  },
  {
    name: "Axios",
    color: "#894798",
    icon: <SiAxios />,
  }
];

const ProjectCard = ({
  imgUrl,
  videoUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  skills,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="w-[400px]">
      <div
        className="relative h-52 xl:h-56 rounded-t-xl group bg-center bg-cover"
        style={{ backgroundImage: `url(${imgUrl})`, backgroundSize: "cover" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Video background */}
        {isHovered && videoUrl ? (
          <video
            src={videoUrl}
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
          />
        ) : null}

        {/* Overlay and icon */}
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#000000] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-10 transition-all duration-500 z-10">
          {/* GitHub Link */}
          <Link
            href={gitUrl ? gitUrl : "#"}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <HiCodeBracket className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            {!gitUrl && (
              <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/link:opacity-100 transition-opacity">
                GitHub link not available
              </span>
            )}
          </Link>

          {/* Preview Link */}
          <Link
            href={previewUrl ? previewUrl : "#"}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
          >
            <LuEye className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            {!previewUrl && (
              <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/link:opacity-100 transition-opacity">
                Preview not available
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="text-white rounded-b-xl bg-[#181818] py-6 px-4">
        <h5 className="font-xl font-semibold mb-0 text-accent">{title}</h5>
        <p className="text-while/60 mb-1">{description}</p>
        <div className="flex">
          {skills.map((skill, index) => {
            return (
              <div key={index}>
                {skillsData.map((skillData) => {
                  if (skill === skillData.name) {
                    return (
                      <div className="relative group">
                        <div
                          key={skillData.name}
                          className={`flex border-2 border-white/60 w-8 h-8 items-center justify-center rounded-full mr-1`}
                          style={{
                            color: skillData.color,
                          }}
                          alt={skillData.name}
                        >
                          {skillData.icon}
                        </div>
                        <span class="absolute left-1/2 top-full mt-2 w-max transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {skillData.name}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
