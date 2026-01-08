import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TbHttpDelete } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { BiCommentDetail } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import AllComments from "./AllComments";
import CommentPost from "./CommentPost";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const token = localStorage.getItem("token");
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchDetail = async (_id) => {
      try {
        const res = await axios.get(`http://localhost:3000/post/${_id}`);
        setBlog(res.data.result);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchDetail(_id);
  }, [_id]);
  const deleteBlog = async (_id) => {
    try {
      await axios.delete(`http://localhost:3000/post/delete/${blog._id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        }
      );
      alert("Blog deleted successfully.");
      navigate("/admin/all-blogs");
    } catch (error) {
      console.error(error.message);
    }
  };
  const userId = localStorage.getItem("userId");
  const isAdmin = localStorage.getItem("role") === "admin";
  return (
    <>
      <div className="min-vh-100 bg-gradient d-flex flex-column justify-content-center align-items-center">
        <div
          className="card border-0 shadow-lg d-flex flex-column flex-md-column flex-wrap flex-lg-nowrap bg-white rounded-4 m-5 p-5  justify-content-center"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div>
            {" "}
            <div className="col-12 col-md-12 ">
              <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid bg-light rounded-3 border-0"
                style={{
                  height: "100%",
                  maxHeight: "380px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="mt-3 col-12 col-lg-12 d-flex flex-column justify-content-center pe-5">
              <h2 className="fw-bold text-primary mb-3">{blog.title}</h2>
              <p className="text-dark">{blog.content}</p>
              <div className="d-flex flex-column gap-2">
                <span className="text-muted">
                  <strong className="text-dark">Created By: </strong>
                  {blog.author?.fullname || "Unknown"}
                </span>
                <span className="text-muted">
                  <strong className="text-dark">Category: </strong>
                  {blog.category}
                </span>
              </div>
              <p className="mb-0 mt-3 text-primary">{blog.tags}</p>

              <div className="mt-4 d-flex justify-content-between align-items-center flex-wrap gap-2 hover">
                {isAdmin && blog.author?._id === userId ? (
                  <>
                    <div
                      className="d-flex flex-column align-items-center"
                      data-bs-toggle="collapse"
                      title="Comments"
                      data-bs-target="#commentsSection"
                    >
                      <span className="text-warning fw-bold fs-4">
                        <BiCommentDetail />
                      </span>
                      <span className="text-muted small">Comments</span>
                    </div>
                    <div
                      className="d-flex flex-column align-items-center"
                      onClick={() => navigate(`/admin/edit/${blog._id}`)}
                      data-bs-toggle="tooltip"
                      title="Edit Blog"
                    >
                      <span className="text-success fw-bold fs-4">
                        <FaEdit />
                      </span>
                      <span className="text-muted small">Edit Blog</span>
                    </div>
                    <div
                      className="d-flex flex-column align-items-center"
                      onClick={deleteBlog}
                      data-bs-toggle="tooltip"
                      title="Delete Blog"
                    >
                      <span className="text-danger fw-bold fs-4">
                        <RiDeleteBin6Line />
                      </span>
                      <span className="text-muted small">Delete Blog</span>
                    </div>
                  </>
                ) : (
                  <button
                    className="btn btn-warning d-flex align-items-center gap-2 fw-bolds"
                    data-bs-toggle="collapse"
                    data-bs-target="#commentsSection"
                  >
                    <BiCommentDetail className="fs-5 " />
                    Show Comments
                  </button>
                )}
              </div>
            </div>
          </div>
          <div id="commentsSection" className="collapse" >
            <AllComments id={_id} />
          </div>
          
        </div>
      
      </div>
    </>
  );
};
export default BlogDetails;
{
  /* <div className="btn-group">
                  <button
                    onClick={() => navigate(`/admin/edit/${blog._id}`)}
                    type="button"
                    className="btn btn-outline-success"
                    data-bs-toggle="tooltip"
                    title="Edit Blog"
                  >
                    <FaEdit className="fs-3 fw-bold" />
                  </button>
                  <button
                    onClick={deleteBlog}
                    type="button"
                    className="btn btn-outline-danger"
                    data-bs-toggle="tooltip"
                    title="Delete Blog"
                  >
                    <TbHttpDelete className="fs-3 fw-bold" />
                  </button>
                </div> */
}
