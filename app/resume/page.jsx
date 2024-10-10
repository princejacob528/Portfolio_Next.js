/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";


// Modal Component
const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative bg-[#232329] p-8 rounded-lg w-[60vw] h-[70vh] max-h-[80vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-accent border-2 border-accent w-[40px] h-[40px] text-[40px] flex items-center justify-center "
        >
          &times;
        </button>
        {/* Secure Image */}
        <Image
          src={imageUrl}
          priority
          quality={100}
          alt="Certificate"
          className="select-none pointer-events-none no-print object-contain"
          style={{ userSelect: "none", pointerEvents: "none" }}
          fill
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};

const Resume = () => {
  const [about, setAbout] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAbout = await axios.get(
          `${process.env.NEXT_PUBLIC_DB_URL}about`
        );
        setAbout(responseAbout.data);
      } catch (error) {
        console.error("Error fetching about:", error);
      }
      try {
        const responseEducation = await axios.get(
          `${process.env.NEXT_PUBLIC_DB_URL}education`
        );
        setEducation(responseEducation.data);
      } catch (error) {
        console.error("Error fetching education:", error);
      }
      try {
        const responseExperience = await axios.get(
          `${process.env.NEXT_PUBLIC_DB_URL}experience`
        );
        setExperience(responseExperience.data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
      try {
        const responseAchievements = await axios.get(
          `${process.env.NEXT_PUBLIC_DB_URL}achievements`
        );
        setAchievements(responseAchievements.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
      try {
        const responseCategories = await axios.get(
          `${process.env.NEXT_PUBLIC_DB_URL}categories`
        );
        setCategories(responseCategories.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchData();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [imageToShow, setImageToShow] = useState("");

  const handleViewClick = (image) => {
    setImageToShow(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="achievement">Achievements</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="about">About Me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">
                  {categories.find((item) => item.name === "experience")
                    ?.title || ""}
                </h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {categories.find((item) => item.name === "experience")
                    ?.description || ""}
                </p>
                <ScrollArea className="xl:h-[400px] h-[550px]">
                  <ul className="grid gird-col-1 lg:grid-cols-2 gap-[30px]">
                    {experience.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[68px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div></div>
                          <div className="w-full flex justify-between items-center">
                            {/* Left - Company */}
                            <div className="flex items-center gap-3">
                              {/* Dot */}
                              <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                              <p className="text-white/868">{item.company}</p>
                            </div>
                            {/* Right - View Certificate Button */}
                            <div className="mb-3">
                              {item.certificate ? (
                                <button
                                  onClick={() =>
                                    handleViewClick(item.certificate)
                                  }
                                  className="mt-4 text-accent underline"
                                >
                                  Certificate
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* achievement */}
            <TabsContent value="achievement" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">
                  {categories.find((item) => item.name === "achievements")
                    ?.title || ""}
                </h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {categories.find((item) => item.name === "achievements")
                    ?.description || ""}
                </p>
                <ScrollArea className="xl:h-[400px] h-[550px]">
                  <ul className="grid gird-col-1 lg:grid-cols-2 gap-[30px]">
                    {achievements.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[270px] xl:h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[460px] min-h-[68px] text-center lg:text-left">
                            {item.course}
                          </h3>
                          <div className="w-full flex flex-col justify-between items-center xl:flex-row">
                            <div className="flex items-center gap-3">
                              {/* dot */}
                              <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                              <p className="text-white/70 text-[13px]">
                                {item.institution}
                              </p>
                            </div>
                            <div className="mb-3">
                              {item.certificate ? (
                                <button
                                  onClick={() =>
                                    handleViewClick(item.certificate)
                                  }
                                  className="mt-4 text-accent underline"
                                >
                                  Certificate
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">
                  {categories.find((item) => item.name === "education")
                    ?.title || ""}
                </h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {categories.find((item) => item.name === "education")
                    ?.description || ""}
                </p>
                <ScrollArea className="xl:h-[400px] h-[550px]">
                  <ul className="grid gird-col-1 lg:grid-cols-2 gap-[30px]">
                    {education.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-full py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.degree}</span>
                          {item.field ? (
                            <h3 className="max-w-[280px] min-h-[40px] text-center lg:text-left font-extrabold">
                              {item.field}
                            </h3>
                          ) : (
                            ""
                          )}
                          <p className="text-[13px]">{item.institution}</p>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/868">{item.duration}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* about */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">
                  {categories.find((item) => item.name === "about")
                    ?.title || ""}
                </h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {categories.find((item) => item.name === "about")
                    ?.description || ""}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 mx-auto xl:mx-0">
                  {about.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-start gap-4"
                      >
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal} imageUrl={imageToShow} />
    </motion.div>
  );
};

export default Resume;
