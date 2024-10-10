import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const StatsManage = () => {
  const [statsData, setStatsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState({
    num: 0,
    text: "",
    plus: false,
  });

  useEffect(() => {
    fetchStatsData();
  }, []);

  const fetchStatsData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_DB_URL}stats`);
      setStatsData(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleEditClick = (content) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingContent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      const { _id, ...updatedContent } = editingContent;
      if (_id) {
        await axios.put(`${process.env.NEXT_PUBLIC_DB_URL}stats/${_id}`, updatedContent);
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_DB_URL}stats`, updatedContent);
      }
      fetchStatsData();
      closeModal();
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_DB_URL}stats/${id}`);
      fetchStatsData();
    } catch (error) {
      console.error("Error deleting stat:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingContent({ num: 0, text: "", plus: false });
  };

  const handleAddNewClick = () => {
    setEditingContent({ num: 0, text: "", plus: false });
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Stats Management</h1>
        <Button onClick={handleAddNewClick}>Add New Stat</Button>
      </div>

      {/* Displaying Stats Fields */}
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Heading</th>
            <th className="py-3 px-6 text-left">Count</th>
            <th className="py-3 px-6 text-left">Plus</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {statsData.map((item) => (
            <tr key={item._id} className="border border-gray-200">
              <td className="py-3 px-6">{item.text}</td>
              <td className="py-3 px-6">{item.num}</td>
              <td className="py-3 px-6">{item.plus ? "Yes" : "No"}</td>
              <td className="py-3 px-6 flex gap-2">
                <Button
                  variant="outlined"
                  size="xs"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="xs"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing/Adding */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center text-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg mb-2">
              {editingContent._id ? "Edit Stat" : "Add New Stat"}
            </h2>            
            <input
              type="text"
              name="text"
              value={editingContent.text}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 w-full mb-4"
              required
            />
            <input
              type="number"
              name="num"
              value={editingContent.num}
              onChange={handleChange}
              placeholder="Number"
              className="border p-2 w-full mb-4"
              required
            />
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                name="plus"
                checked={editingContent.plus}
                onChange={handleChange}
              />
              Plus
            </label>
            <div className="flex justify-end gap-2">
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

export default StatsManage;
