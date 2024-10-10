/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import AddProjectModal from "@/components/AddProjectModal";
import { Button } from "@/components/ui/button";
import UploadResume from "@/components/UploadResume";
import AboutMange from "@/components/AboutMange";
import ExperienceManage from "@/components/ui/ExperienceManage";
import AchievementsManage from "@/components/AchievementsManage";
import EducationManage from "@/components/EducationManage";
import StatsManage from "@/components/StatsManage";

const Admin = () => {
  // Lock feature state
  const [pin, setPin] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const correctPin = "9847"; // Set your correct pin here

  // Project management state
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({
    title: "",
    description: "",
    // Add other default fields that your project contains
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [videoName, setvideoName] = useState("");
  const [imageName, setimageName] = useState("");

  const [mediaUrl, setMediaUrl] = useState("");
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const predefinedTags = ["All", "Web", "MERN", "React"];

  const router = useRouter();

  useEffect(() => {
    // Check if the user is on a mobile device
    const isMobile = window.innerWidth < 1024; // Assuming 1024px as desktop view threshold
    if (isMobile) {
      // Redirect to home page if accessed on mobile
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    // Automatically lock the page every 5 minutes
    const timer = setTimeout(() => {
      setIsLocked(true);
      toast("Session expired. Please enter the pin again.");
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [isLocked]);

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      setIsLocked(false);
      setPin(""); // Clear the pin input
    } else {
      toast.error("Incorrect pin, please try again.");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_URL}projects`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    if (!isLocked) {
      fetchProjects(); // Fetch projects when the page is unlocked
    }
  }, [isLocked]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject({
      title: "",
      description: "",
      // Reset to initial state if needed
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_URL}projects/${selectedProject._id}`,
        selectedProject
      );
      // Fetch updated projects after saving
      fetchProjects();
      closeModal();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const predefinedSkills = [
    "React",
    "AWS",
    "Nginx",
    "Vite",
    "Next.js",
    "Node.js",
    "Express",
    "EJS",
    "MongoDB",
    "Postman",
    "SQL",
    "MySQL",
    "PostgreSQL",
    "XAMPP",
    "PHP",
    "HTML5",
    "HTML",
    "JavaScript",
    "CSS",
    "Bootstrap 5",
    "VS Code",
    "Figma",
    "Tailwind CSS",
    "APIs",
    "Axios",
  ];

  // Function to handle adding a skill
  const handleSkillAdd = (skill) => {
    if (
      skill &&
      !selectedProject.skill.includes(skill) &&
      predefinedSkills.includes(skill)
    ) {
      setSelectedProject((prev) => ({
        ...prev,
        skill: [...prev.skill, skill],
      }));
    }
  };

  // Function to handle removing a skill
  const handleSkillRemove = (skillToRemove) => {
    setSelectedProject((prev) => ({
      ...prev,
      skill: prev.skill.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Function to handle adding a tag
  const handleTagAdd = (tag) => {
    if (
      tag &&
      !selectedProject.tag.includes(tag) &&
      predefinedTags.includes(tag)
    ) {
      setSelectedProject((prev) => ({
        ...prev,
        tag: [...prev.tag, tag],
      }));
    }
  };

  // Function to handle removing a tag
  const handleTagRemove = (tagToRemove) => {
    setSelectedProject((prev) => ({
      ...prev,
      tag: prev.tag.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleOpenMedia = (type) => {
    setMediaUrl(selectedProject[type]);
    setIsMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setIsMediaModalOpen(false);
  };

  const handleChangeMedia = async (type) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = type === "imgUrl" ? "image/*" : "video/*";
    const name = type === "imgUrl" ? "imgUrl" : "videoUrl";

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      const data = new FormData();
      data.set("file", file);
      const response = await fetch("api/upload", {
        method: "POST",
        body: data,
      });
      const value = `/Asset/projects/${file.name}`;
      type === "imgUrl" ? setimageName(file.name) : setvideoName(file.name);
      setSelectedProject((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    fileInput.click();
  };

  const handleRemoveVideo = () => {
    setSelectedProject((prev) => ({
      ...prev,
      videoUrl: "",
    }));

    // Set video name to "Video removed."
    setvideoName("Video removed.");
  };

  useEffect(() => {
    let timer;

    if (videoName === "Video removed.") {
      // Start the timer only if videoName is set
      timer = setTimeout(() => {
        setvideoName("");
      }, 5000);
    }

    // Cleanup function to clear the timer if needed
    return () => clearTimeout(timer);
  }, [videoName]); // Add videoName as a dependency

  if (isLocked) {
    return (
      <div className="flex items-center justify-center text-white h-full">
        <form
          onSubmit={handlePinSubmit}
          className="flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg"
        >
          <label className="text-accent text-xl font-semibold mb-4">
            Enter 4-digit Pin
          </label>
          <input
            type="password"
            maxLength="4"
            value={pin}
            onChange={handlePinChange}
            className="text-primary p-2 text-center rounded-lg text-2xl bg-white focus:outline-none"
          />
          <button
            type="submit"
            className={`mt-4 uppercase flex items-center gap-2 justify-center ${
              isLocked ? "" : "text-white border-white/60"
            }`}
          >
            <span>Unlock</span>
          </button>
        </form>
      </div>
    );
  }

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_DB_URL}projects/${projectId}`
      );
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
      closeModal();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <UploadResume />
      {/* project Manage */}
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Projects Management</h1>
          {/* Button to open the Add Project Modal */}
          <Button
            variant="outlined"
            size="md"
            className="uppercase flex items-center gap-2"
            onClick={openAddModal} // Ensure you have the onClick handler
          >
            <span>New Project</span>
          </Button>
        </div>

        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id} className="border border-gray-200">
                <td className="py-3 px-6">{project.title}</td>
                <td className="py-3 px-6">{project.description}</td>
                <td className="py-3 px-6">
                  <Button
                    variant="outlined"
                    size="sm"
                    className="flex items-center text-sm gap-2"
                    onClick={() => openModal(project)}
                  >
                    <span>Edit</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for editing project */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-6 rounded shadow-lg w-11/12 max-h-[90vh] overflow-auto">
              <h2 className="text-lg mb-2">Edit Project</h2>
              <div>
                {/* Input fields here as before */}
                <label className="block mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedProject.title}
                  onChange={handleChange}
                  className="border border-accent p-2 w-full mb-4"
                />

                <label className="block mb-2">Description</label>
                <textarea
                  name="description"
                  value={selectedProject.description}
                  onChange={handleChange}
                  className="border border-accent p-2 w-full mb-4"
                  rows="4"
                />

                {/* Image Section */}
                <div className="flex flex-col mb-4">
                  <label className="block mb-2">Image</label>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="success"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleOpenMedia("imgUrl")}
                    >
                      <span>Open</span>
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleChangeMedia("imgUrl")}
                    >
                      <span>Change</span>
                    </Button>
                    <p className="ml-4 italic ">
                      {imageName
                        ? imageName
                        : selectedProject.imgUrl.replace(
                            /^\/Asset\/projects/,
                            ""
                          )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mb-4">
                  <label className="block mb-2">Video</label>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="success"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleOpenMedia("videoUrl")}
                      disabled={!selectedProject.videoUrl} // Disable the button if videoUrl is empty
                    >
                      <span>Open</span>
                    </Button>

                    <Button
                      variant="warning"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleChangeMedia("videoUrl")}
                    >
                      <span>Change</span>
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleRemoveVideo()}
                    >
                      <span>Remove</span>
                    </Button>
                    <p className="ml-4 italic">
                      {videoName
                        ? selectedProject.videoUrl
                          ? videoName
                          : selectedProject.videoUrl.replace(
                              /^\/Asset\/projects/,
                              ""
                            )
                        : selectedProject.videoUrl.replace(
                            /^\/Asset\/projects/,
                            ""
                          )}
                    </p>
                  </div>
                </div>

                {isMediaModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                      {mediaUrl.endsWith(".mp4") ? (
                        <video controls className="w-full">
                          <source src={mediaUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img src={mediaUrl} alt="Media" className="w-full" />
                      )}
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                        onClick={closeMediaModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                <table className="w-full mb-4">
                  <tbody>
                    {/* Skills Section */}
                    <tr>
                      <td className="pr-4">
                        <label className="block mb-2">Skills</label>
                        <select
                          onChange={(e) => handleSkillAdd(e.target.value)}
                          className="border border-accent p-2 w-full"
                        >
                          <option value="">Select a skill</option>
                          {predefinedSkills.map((skill) => (
                            <option key={skill} value={skill}>
                              {skill}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <label className="block mb-2">Selected Skills</label>
                        <div className="flex flex-wrap p-2 h-full space-x-2">
                          {selectedProject.skill.map((skill) => (
                            <button
                              key={skill}
                              className="flex items-center border border-accent py-1 px-2 rounded-md"
                              onClick={() => handleSkillRemove(skill)}
                            >
                              {skill}
                              <span className="ml-2 text-red-500 font-bold">
                                &times;
                              </span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>

                    {/* Tags Section */}
                    <tr>
                      <td className="pr-4">
                        <label className="block mb-2">Tags</label>
                        <select
                          onChange={(e) => handleTagAdd(e.target.value)}
                          className="border border-accent p-2 w-full"
                        >
                          <option value="">Select a tag</option>
                          {predefinedTags.map((tag) => (
                            <option key={tag} value={tag}>
                              {tag}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <label className="block mb-2">Selected Tags</label>
                        <div className="flex flex-wrap p-2 h-full space-x-2">
                          {selectedProject.tag.map((tag) => (
                            <button
                              key={tag}
                              className="flex items-center border border-accent py-1 px-2 rounded-md"
                              onClick={() => handleTagRemove(tag)}
                            >
                              {tag}
                              <span className="ml-2 text-red-500 font-bold">
                                &times;
                              </span>
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <label className="block mb-2">GitHub Link</label>
                <input
                  type="text"
                  name="gitUrl"
                  value={selectedProject.gitUrl}
                  onChange={handleChange}
                  className="border border-accent p-2 w-full mb-4"
                />

                <label className="block mb-2">Preview Link</label>
                <input
                  type="text"
                  name="previewUrl"
                  value={selectedProject.previewUrl}
                  onChange={handleChange}
                  className="border border-accent p-2 w-full mb-4"
                />
              </div>
              <div className="flex gap-1">
                <Button
                  variant="success"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                  onClick={() => handleSave()}
                >
                  <span>Save</span>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                  onClick={() => deleteProject(selectedProject._id)}
                >
                  <span>Delete</span>
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                  onClick={() => closeModal()}
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* AddProjectModal Component */}
        <AddProjectModal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          setProjects={setProjects}
          predefinedTags={predefinedTags}
          predefinedSkills={predefinedSkills}
        />
      </div>
      <ExperienceManage />
      <AchievementsManage />
      <EducationManage />
      <StatsManage />
      <AboutMange />
    </>
  );
};

export default Admin;
