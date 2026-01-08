import React, { useState } from "react";
import axios from "axios";

const AddBlogs = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    tags: "",
    author: localStorage.getItem("name") || "",
  });

  const onChangeHandler = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
     
    try {
      // console.log("Sending blog:", blog);
      const token = localStorage.getItem('token');
      await axios.post("http://localhost:3000/post/create", blog,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      alert("Blog Posted Successfully!");
    } catch (error) {
      console.error("Failed to Post Blog", error.message);
      alert("Blog post failed.");
    }
    setBlog({
      title: "",
      content: "",
      category: "",
      image: "",
      tags: "",
      author: localStorage.getItem("name") || "Anonymous",
    });
  };

  return (
    <div className="min-vh-100 bg-gradient px-5 py-3 d-flex justify-content-center align-items-start">
      <div
        className="card border-0 shadow-lg px-5 py-4 bg-white"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <h2 className="text-primary fw-bold mb-4 text-center">Create Blog</h2>
        <form onSubmit={onSubmitHandler} className="row g-4">
          <div className="col-12">
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={onChangeHandler}
              className="form-control  shadow-sm"
              placeholder="Blog Title"
              required
            />
          </div>

          <div className="col-12">
            <textarea
              name="content"
              value={blog.content}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              rows="5"
              placeholder="Blog Content"
              required
            ></textarea>
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="category"
              value={blog.category}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Category"
              required
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="tags"
              value={blog.tags}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Tags (comma separated)"
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="image"
              value={blog.image}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Cover Image URL"
            />
          </div>

          <div className="col-md-6">
            <input
              type="text"
              name="author"
              value={blog.author}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Author"
              readOnly
            />
          </div>

          <div className="col-12">
            <button className="btn btn-primary btn-lg w-100 shadow-sm">
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
