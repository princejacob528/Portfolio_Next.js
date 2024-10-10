"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const EducationManage = () => {
  const [education, setEducation] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);

  const fetchEducation = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_URL}education`
      );
      setEducation(response.data);
    } catch (error) {
      console.error("Error fetching Education:", error);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleAddEducationClick = () => {
    setIsAddModalOpen(true);
  };

  const handleEditEducationClick = (education) => {
    setSelectedEducation(education);
    setIsEditModalOpen(true);
  };

  const handleSave = async (education) => {
    if (selectedEducation) {
      // Update existing education
      try {
        await axios.put(
          `${process.env.NEXT_PUBLIC_DB_URL}education/${selectedEducation._id}`,
          education
        );
        fetchEducation();
      } catch (error) {
        console.error("Error updating education:", error);
      }
    } else {
      // Add new education
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DB_URL}education`,
          education
        );
        fetchEducation();
      } catch (error) {
        console.error("Error adding education:", error);
      }
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedEducation(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DB_URL}education/${id}`);
      fetchEducation();
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Education Management</h1>
        <Button
          variant="outlined"
          size="md"
          className="uppercase flex items-center gap-2"
          onClick={handleAddEducationClick}
        >
          <span>New Education</span>
        </Button>
      </div>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Degree</th>
            <th className="py-3 px-6 text-left">Field</th>
            <th className="py-3 px-6 text-left">Duration</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {education.map((exp) => (
            <tr key={exp._id} className="border border-gray-200">
              <td className="py-3 px-6">{exp.degree}</td>
              <td className="py-3 px-6">{exp.field}</td>
              <td className="py-3 px-6">{exp.duration}</td>
              <td className="py-3 px-6">
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center text-sm gap-2"
                  onClick={() => handleEditEducationClick(exp)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Education Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded shadow-lg w-11/12 max-h-[90vh] overflow-auto">
            <h2 className="text-lg mb-2">
              {isAddModalOpen ? "Add Education" : "Edit Education"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  degree: e.target.degree.value,
                  field: e.target.field.value,
                  institution: e.target.institution.value,
                  duration: e.target.duration.value,
                };
                handleSave(formData);
              }}
            >
              {/* Input fields */}
              <div className="mb-4">
                <label className="block mb-2">Degree:</label>
                <input
                  name="degree"
                  defaultValue={selectedEducation?.degree || ""}
                  className="border border-accent p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Field:</label>
                <input
                  name="field"
                  defaultValue={selectedEducation?.field || ""}
                  className="border border-accent p-2 w-full"                  
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Institution:</label>
                <input
                  name="institution"
                  defaultValue={selectedEducation?.institution || ""}
                  className="border border-accent p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Duration:</label>
                <input
                  name="duration"
                  defaultValue={selectedEducation?.duration || ""}
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
                    setSelectedEducation(null);
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
                    onClick={() => handleDelete(selectedEducation._id)}
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

export default EducationManage;
