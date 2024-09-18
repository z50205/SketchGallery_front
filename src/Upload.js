import React, { useState } from "react";

function Upload({ onUploadSuccess }) {
  //Definition of hook
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Definition of hook function
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  //Submit function
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title||!image||!description) {
      alert("Please incert all info.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("description", description);
    setTitle("");
    setImage(null);
    setDescription("");

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const result = await response.json();
      console.log("File uploaded successfully:", result);
      onUploadSuccess();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="row justify-content-md-left my-3">
        <h3>Upload image</h3>
        <div className="col-4">
          <label htmlFor="inputEmail4" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="col-4">
          <label htmlFor="formFile" className="form-label">
            Upload Image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-8 mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Upload;
