import axios from "axios";
import React, { useState } from "react";

const AddProjectModal = ({
  isOpen,
  onClose,
  setProjects,
  predefinedSkills,
  predefinedTags,
}) => {
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    imgUrl: "",
    videoUrl: "",
    gitUrl: "",
    previewUrl: "",
    skill: [],
    tag: [],
  });

  const [videoName, setvideoName] = useState("");
  const [imageName, setimageName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillAdd = (skill) => {
    if (skill && !newProject.skill.includes(skill)) {
      setNewProject((prev) => ({
        ...prev,
        skill: [...prev.skill, skill],
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setNewProject((prev) => ({
      ...prev,
      skill: prev.skill.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleTagAdd = (tag) => {
    if (tag && !newProject.tag.includes(tag)) {
      setNewProject((prev) => ({
        ...prev,
        tag: [...prev.tag, tag],
      }));
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setNewProject((prev) => ({
      ...prev,
      tag: prev.tag.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleUploadMedia = async (type) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = type === "imgUrl" ? "image/*" : "video/*";
    const name = type === "imgUrl" ? "imgUrl" : "videoUrl";

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return; // Ensure a file is selected

      const data = new FormData();
      data.set("file", file);

      try {
        const response = await fetch("api/upload", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          throw new Error("Failed to upload file");
        }

        const value = `/Asset/projects/${file.name}`;
        if (type === "imgUrl") {
          setimageName(file.name);
        } else {
          setvideoName(file.name);
        }

        setNewProject((prev) => ({
          ...prev,
          [name]: value,
        }));
      } catch (error) {
        console.error("Error uploading media:", error);
      }
    };

    fileInput.click();
  };

  const handleSave = () => {
    // Add your API call to save the project here
    addProject(newProject);
    // Reset the form
    setNewProject({
      title: "",
      description: "",
      imgUrl: "",
      videoUrl: "",
      gitUrl: "",
      previewUrl: "",
      skill: [],
      tag: [],
    });
    onClose(); // Close the modal after saving
  };
  const handleClose = () => {    
    setNewProject({
      title: "",
      description: "",
      imgUrl: "",
      videoUrl: "",
      gitUrl: "",
      previewUrl: "",
      skill: [],
      tag: [],
    });
    onClose(); // Close the modal after saving
  };

  const addProject = async (newProject) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_URL}projects`,
        newProject
      );
      // Assuming the response contains the added project
      const addedProject = response.data;
      setProjects((prevProjects) => [...prevProjects, addedProject]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white text-black p-6 rounded shadow-lg w-11/12 max-h-[90vh] overflow-auto">
          <h2 className="text-lg mb-2">Add New Project</h2>
          <div>
            {/* Title Field */}
            <label className="block mb-2">
              Title <span className="text-red-500 italic text-sm">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleChange}
              required
              className="border border-accent p-2 w-full mb-4"
            />

            {/* Description Field */}
            <label className="block mb-2">
              Description <span className="text-red-500 italic text-sm">*</span>
            </label>
            <textarea
              name="description"
              value={newProject.description}
              onChange={handleChange}
              required
              className="border border-accent p-2 w-full mb-4"
              rows="4"
            />

            {/* Image Section */}
            <div className="flex flex-col mb-4">
              <label className="block mb-2">
                Image URL <span className="text-red-500 italic text-sm">*</span>
              </label>
              <div className="flex items-center">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                  onClick={() => handleUploadMedia("imgUrl")}
                >
                  Upload
                </button>
                <p className="ml-4 italic">{imageName ? imageName : ""}</p>
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className="block mb-2">Video URL</label>
              <div className="flex items-center">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                  onClick={() => handleUploadMedia("videoUrl")}
                >
                  Upload
                </button>
                <p className="ml-4 italic">{videoName ? videoName : ""}</p>
              </div>
            </div>

            {/* GitHub URL Field */}
            <label className="block mb-2">GitHub URL</label>
            <input
              type="text"
              name="gitUrl"
              value={newProject.gitUrl}
              onChange={handleChange}
              className="border border-accent p-2 w-full mb-4"
            />

            {/* Preview URL Field */}
            <label className="block mb-2">Preview URL</label>
            <input
              type="text"
              name="previewUrl"
              value={newProject.previewUrl}
              onChange={handleChange}
              className="border border-accent p-2 w-full mb-4"
            />

            <table className="w-full mb-4">
              <tbody>
                {/* Skills Section */}
                <tr>
                  <td className="pr-4">
                    <label className="block mb-2">
                      Skills{" "}
                      <span className="text-red-500 italic text-sm">*</span>
                    </label>
                    <select
                      onChange={(e) => handleSkillAdd(e.target.value)}
                      className="border border-accent p-2 w-full mb-4"
                      required
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
                    <div className="flex flex-wrap p-2 h-full space-x-2 mb-4">
                      {newProject.skill.map((skill) => (
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
                    <label className="block mb-2">
                      Tags{" "}
                      <span className="text-red-500 italic text-sm">*</span>
                    </label>
                    <select
                      onChange={(e) => handleTagAdd(e.target.value)}
                      className="border border-accent p-2 w-full mb-4"
                      required
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
                    <div className="flex flex-wrap p-2 h-full space-x-2 mb-4">
                      {newProject.tag.map((tag) => (
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

            {/* Action Buttons */}
            <button
              className="bg-green-500 text-white py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddProjectModal;
