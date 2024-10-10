"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ExperienceManage = () => {
  const [experiences, setExperiences] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const fetchExperiences = async () => {
    try {
      const responseExperience = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_URL}experience`
      );
      setExperiences(responseExperience.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddExperienceClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditExperienceClick = (experience) => {
    setSelectedExperience(experience);
    setIsEditModalOpen(true);
  };

  const handleSave = async (experience) => {
    if (selectedExperience) {
      // Update existing experience
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_DB_URL}experience/${selectedExperience._id}`,
          experience
        );
        fetchExperiences();
      } catch (error) {
        console.error("Error updating experience:", error);
      }
    } else {
      // Add new experience
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DB_URL}experience`,
          experience
        );
        fetchExperiences();
      } catch (error) {
        console.error("Error adding experience:", error);
      }
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedExperience(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DB_URL}experience/${id}`);
      fetchExperiences();
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Experience Management</h1>
        <Button
          variant="outlined"
          size="md"
          className="uppercase flex items-center gap-2"
          onClick={handleAddExperienceClick}
        >
          <span>New Experience</span>
        </Button>
      </div>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Company</th>
            <th className="py-3 px-6 text-left">Position</th>
            <th className="py-3 px-6 text-left">Duration</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => (
            <tr key={exp._id} className="border border-gray-200">
              <td className="py-3 px-6">{exp.company}</td>
              <td className="py-3 px-6">{exp.position}</td>
              <td className="py-3 px-6">{exp.duration}</td>
              <td className="py-3 px-6">
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                  onClick={() => handleEditExperienceClick(exp)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Experience Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded shadow-lg w-11/12 max-h-[90vh] overflow-auto">
            <h2 className="text-lg mb-2">
              {isAddModalOpen ? "Add Experience" : "Edit Experience"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  company: e.target.company.value,
                  position: e.target.position.value,
                  duration: e.target.duration.value,
                };
                handleSave(formData);
              }}
            >
              {/* Input fields */}
              <div className="mb-4">
                <label className="block mb-2">Company:</label>
                <input
                  name="company"
                  defaultValue={selectedExperience?.company || ""}
                  className="border border-accent p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Position:</label>
                <input
                  name="position"
                  defaultValue={selectedExperience?.position || ""}
                  className="border border-accent p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Duration:</label>
                <input
                  name="duration"
                  defaultValue={selectedExperience?.duration || ""}
                  className="border border-accent p-2 w-full"
                  required
                />
              </div>

              <div className="flex gap-2 mt-4">
                {/* Buttons for Cancel, Save, and Delete */}
                <Button
                  variant="warning"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedExperience(null);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="success"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                >
                  {isAddModalOpen ? "Add" : "Save"}
                </Button>

                {isEditModalOpen && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="flex items-center text-sm gap-2"
                    onClick={() => handleDelete(selectedExperience._id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceManage;
