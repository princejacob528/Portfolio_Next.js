/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AchievementsManage = () => {
  const [achievements, setAchievements] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const [imageName, setImageName] = useState("");

  const [mediaUrl, setMediaUrl] = useState("");
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Fetch achievements from the backend
  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_URL}achievements`
      );
      setAchievements(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleAddAchievementClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
    setIsEditModalOpen(true);
  };

  const handleSave = async (achievement) => {
    if (selectedAchievement) {
      // Update existing achievement
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_DB_URL}achievements/${selectedAchievement._id}`,
          achievement
        );
        setSelectedAchievement(null);
        fetchAchievements();
      } catch (error) {
        console.error("Error updating achievement:", error);
      }
    } else {
      // Add new achievement
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DB_URL}achievements`,
          achievement
        );
        fetchAchievements();
      } catch (error) {
        console.error("Error adding achievement:", error);
      }
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedAchievement(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DB_URL}achievements/${id}`);
      fetchAchievements();
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };
  const handleOpenMedia = (type) => {
    setMediaUrl(selectedAchievement[type]);
    setIsMediaModalOpen(true);
  };

  const closeMediaModal = () => {
    setIsMediaModalOpen(false);
  };

  const handleChangeMedia = async (type) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // Only accept images for certificates
    const name = "certificate"; // Set this to certificate

    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      const data = new FormData();
      data.set("file", file);
      const response = await fetch("api/certificateUpload", {
        method: "POST",
        body: data,
      });
      const value = `/Asset/Certificate/${file.name}`;
      setImageName(file.name); // Assuming setImageName sets the certificate file name
      setSelectedAchievement((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    fileInput.click();
  };

  const handleRemoveCertificate = () => {
    setSelectedAchievement((prev) => ({
      ...prev,
      certificate: "",
    }));

    // Set certificate name to "Certificate removed."
    setImageName("Certificate removed.");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Achievements Management</h1>
        <Button
          variant="outlined"
          size="md"
          className="uppercase flex items-center gap-2"
          onClick={handleAddAchievementClick}
        >
          <span>New Achievement</span>
        </Button>
      </div>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Institution</th>
            <th className="py-3 px-6 text-left">Course</th>
            <th className="py-3 px-6 text-left">Duration</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {achievements.map((ach) => (
            <tr key={ach._id} className="border border-gray-200">
              <td className="py-3 px-6">{ach.institution}</td>
              <td className="py-3 px-6">{ach.course}</td>
              <td className="py-3 px-6">{ach.duration}</td>
              <td className="py-3 px-6">
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                  onClick={() => handleEditAchievementClick(ach)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing achievements */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded shadow-lg w-11/12 max-h-[90vh] overflow-auto">
            <h2 className="text-lg mb-2">
              {isAddModalOpen ? "Add Achievement" : "Edit Achievement"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  institution: e.target.institution.value,
                  course: e.target.course.value,
                  duration: e.target.duration.value,
                  certificate: selectedAchievement?.certificate || "",
                };
                handleSave(formData);
              }}
            >
              <div>
                {/* Input fields */}
                <label className="block mb-2">Institution</label>
                <input
                  type="text"
                  name="institution"
                  defaultValue={selectedAchievement?.institution || ""}
                  className="border border-accent p-2 w-full mb-4"
                  required
                />

                <label className="block mb-2">Course</label>
                <input
                  type="text"
                  name="course"
                  defaultValue={selectedAchievement?.course || ""}
                  className="border border-accent p-2 w-full mb-4"
                  required
                />

                <label className="block mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  defaultValue={selectedAchievement?.duration || ""}
                  className="border border-accent p-2 w-full mb-4"
                  required
                />

                <div className="flex flex-col mb-4">
                  <label className="block mb-2">Certificate</label>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button" // Prevents form submission
                      variant="success"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleOpenMedia("certificate")} // Handles image opening logic
                      disabled={!selectedAchievement?.certificate}
                    >
                      <span>Open</span>
                    </Button>

                    <Button
                      type="button" // Prevents form submission
                      variant="warning"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleChangeMedia("certificate")} // Handles image changing logic
                    >
                      <span>Change</span>
                    </Button>

                    <Button
                      type="button" // Prevents form submission
                      variant="danger"
                      size="sm"
                      className="flex items-center text-sm gap-2"
                      onClick={() => handleRemoveCertificate()} // Handles image removal logic
                    >
                      <span>Remove</span>
                    </Button>

                    <p className="ml-4 italic">
                      {imageName
                        ? selectedAchievement?.certificate
                          ? imageName
                          : selectedAchievement.certificate.replace(
                              /^\/Asset\/certificates/,
                              ""
                            )
                        : selectedAchievement?.certificate?.replace(
                            /^\/Asset\/certificates/,
                            ""
                          )}
                    </p>
                  </div>
                </div>
              </div>

              {isMediaModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full max-h-[80vh] overflow-auto">
                    <img
                      src={mediaUrl}
                      alt="Certificate"
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                      onClick={closeMediaModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button type="submit" variant="success" size="sm">
                  {isAddModalOpen ? "Add" : "Save"}
                </Button>
                {isEditModalOpen && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(selectedAchievement._id)}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedAchievement(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsManage;
