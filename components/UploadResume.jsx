"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/resumeUpload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(result.message);
      setSuccess(result.success);
    } catch (error) {
      setMessage("An error occurred during the upload.");
      setSuccess(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col justify-between mt-8 mb-4 gap-3">
        <h1 className="text-3xl font-bold">Upload Resume</h1>
        <div className="flex gap-3">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="uppercase flex items-center gap-2 mt-4 border border-accent bg-transparent w-full max-w-xl" 
          />

          <Button
            variant="outlined"
            size="sm"
            className="uppercase flex items-center gap-2 mt-4"
            onClick={handleUpload} // Ensure you have the onClick handler
          >
            <span>Upload Resume</span>
          </Button>
        </div>
        {message && (
          <p style={{ color: success ? "green" : "red" }}>{message}</p>
        )}
      </div>
    </div>
  );
}
