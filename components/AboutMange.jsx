import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const AboutManage = () => {
  const [aboutData, setAboutData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState({
    fieldName: "",
    fieldValue: "",
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const responseAbout = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_URL}about`
      );
      setAboutData(responseAbout.data);
    } catch (error) {
      console.error("Error fetching about:", error);
    }
  };

  const handleEditClick = (content) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Make the PUT request here to save the edited content
      const reason = await axios.put(
        `${process.env.NEXT_PUBLIC_DB_URL}about/${editingContent._id}`,
        editingContent
      );      
      fetchAboutData();
      closeModal();
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContent({});
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">About Management</h1>
        {/* Optional: You could add an "Add New" button here if needed */}
      </div>

      {/* Displaying About Fields */}
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Field Name</th>
            <th className="py-3 px-6 text-left">Field Value</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {aboutData.map((item) => (
            <tr key={item._id} className="border border-gray-200">
              <td className="py-3 px-6">{item.fieldName}</td>
              <td className="py-3 px-6">{item.fieldValue}</td>
              <td className="py-3 px-6">
                <Button
                  variant="outlined"
                  size="xs"
                  className="flex items-center text-sm gap-2"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg mb-2">Edit: {editingContent.fieldName}</h2>
            <input
              type="text"
              name="fieldValue"
              value={editingContent.fieldValue}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
              required
            />
            <div className="flex justify-end">
              <Button variant="success" size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button variant="danger" size="sm" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutManage;
