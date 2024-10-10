/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const filterBtn = ["All", "Web", "MERN", "React"];

const Project = () => {
  const [projectData, setProjectsData] = useState([]);
  const [skills, setSkills] = useState("");
  let skillValue = null;

  useEffect(() => {
    const skillTag = Cookies.get("skillTag");
    if (skillTag) {
      setSkills(skillTag);
      skillValue = skillTag;
    } else {
      setSkills("All");
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DB_URL}projects`
        );
        setProjectsData(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  
  const filterProject = projectData.filter((project) =>
    project.tag.includes(skills)
  );

  const handleChangeValue = (newSkills) => {
    setSkills(newSkills);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="flex flex-col items-center"
    >
      <div className="text-white flex justify-center items-center gap-2 py-6">
        {filterBtn.map((skill) => {
          return (
            <Button
              onClick={() => handleChangeValue(skill)}
              key={skill}
              variant="outlined"
              size="md"
              className={`uppercase flex items-center gap-2 ${
                skills === skill ? "" : "text-white border-white/60"
              }`}
            >
              <span>{skill}</span>
            </Button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xxl:grid-cols-3 gap-8 mb-8">
        {filterProject.map((project) => {
          return (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.imgUrl}
              videoUrl={project.videoUrl}
              skills={project.skill}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Project;
