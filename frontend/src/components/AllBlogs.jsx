import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/MyStyle.css";
import CommentPost from "./CommentPost";

const AllBlogs = () => {
  // const {_id} = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get("http://localhost:3000/post/allpost");
        setBlogs(res.data.result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBlog();
  }, []);
  const handleBlogDetailPage = (blog) => {
    const isAdmin = localStorage.getItem("role");
    if (isAdmin === "admin") {
      navigate(`/admin/blog/${blog._id}`);
    } else {
      navigate(`/blog/${blog._id}`);
    }
  };
  return (
    <>
      <div className="min-vh-100 bg-gradient d-flex justify-content-center align-items-center">
        <div className="col-12 d-flex flex-wrap gap-5 my-5 justify-content-center align-items-centers">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card border-0 shadow-lg px-4 py-4 bg-white gap-1 rounded rounded-4 col-md-5 col-10 hover-shadow"
              // style={{ maxWidth: "460px", width: "100%" }}
            >
              <img
                src={blog.image}
                alt={blog.image}
                className="card-img-top mb-4 bg-light rounded rounded-4 shadow-sm"
                style={{ height: "280px", width: "100%", objectFit: "contain" }}
              />
              <h4
                onClick={() => handleBlogDetailPage(blog)}
                className="text-dark hover"
              >
                {blog.title}
              </h4>
              <p
                onClick={() => handleBlogDetailPage(blog)}
                className="text-muted text-truncate-2 hover"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {blog.content}
              </p>

              <p className="mt-1 mb-0 text-primary fs-6">{blog.tags}</p>
              <div className="col-12">
                <div>
                  <CommentPost id={blog._id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default AllBlogs;
