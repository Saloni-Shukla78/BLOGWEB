import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { _id } = useParams();
  // console.log(_id)
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    tags: "",
    author: "",
  });
  const onChangeHandler = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchBlog = async (_id) => {
      try {
        const res = await axios.get(`http://localhost:3000/post/${_id}`);
        setBlog(res.data.result);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBlog(_id);
  }, [_id]);
  const updateBlog = async (blog) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.put(
        `http://localhost:3000/post/update/${blog._id}`,
        blog,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/admin/blog/${blog._id}`);
    } catch (error) {
      console.error(error.message);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    updateBlog(blog);
  };

  return (
    <div className="min-vh-100 bg-gradient px-4 py-5 d-flex justify-content-center align-items-start">
      <div
        className="card border-0 shadow-lg p-4 bg-white rounded-4"
        style={{ maxWidth: "800px", width: "100%" }}
      >
        <h2 className="text-primary fw-bold text-center mb-4">Edit Blog</h2>

        <form onSubmit={onSubmitHandler} className="row g-4">
          {/* Title */}
          <div className="col-12">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Enter the updated title"
              required
            />
          </div>

          {/* Content */}
          <div className="col-12">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              value={blog.content}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              rows="3"
              placeholder="Enter the updated content"
              required
            />
          </div>

          {/* Image URL */}
          <div className="col-12">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              value={blog.image}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Enter the updated image URL"
            />
          </div>

          {/* Category & Tags */}
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              value={blog.category}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Enter the updated category"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tags</label>
            <input
              type="text"
              name="tags"
              value={blog.tags}
              onChange={onChangeHandler}
              className="form-control shadow-sm"
              placeholder="Enter tags (comma separated)"
            />
          </div>

          {/* Submit Button */}
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-primary px-5 rounded-3">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
