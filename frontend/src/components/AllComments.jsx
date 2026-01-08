import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { useParams } from "react-router-dom";
import CommentPost from "./CommentPost";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../styles/MyStyle.css";

// Extend dayjs with the plugin — this is REQUIRED
dayjs.extend(relativeTime);

const AllComments = ({ id }) => {
  // const { id } = useParams();
  // console.log(id)
  const [comments, setComment] = useState([]);
  const [editData,setEditData]=useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token=localStorage.getItem("token");
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/post/${id}/comments`);
      setComment(res.data.comment);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [id]);
  const commentDeleteHandler = async (comment_id) => {
    try {
      await axios.delete(
        `http://localhost:3000/post/delete-comment/${id}/${comment_id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        }
      );
      // alert("Comment deleted successfully.");
      fetchComments();
    } catch (error) {
      console.error(error.message);
    }
  };
  const commentEditHandler = (comment_id,msg) => {
    setEditData({comment_id,msg})
    setIsEditing(true);
  };

  const userId=localStorage.getItem('userId')
  return (
    <>
      <div className="container my-4">
        <div className="mb-4">
          <CommentPost
            id={id}
            fetchComments={fetchComments}
            editData={editData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
        <div
          className="card border-0 shadow-sm rounded-4 p-4 bg-light mt-2"
          style={{
            maxHeight: "300px", // Fixed height
            overflowY: "auto", // Enable scroll
            paddingRight: "10px", // Prevent scrollbar overlap
          }}
        >
          {/* Single Comment */}
          {comments.length >0  ? (comments.map((comment) => (
            <div key={comment._id} className="d-flex justify-content-between align-items-start mb-3 border-bottom border-secondary pb-3">
              {/* Profile + Comment Info */}
              <div className="d-flex">
                <div className="me-3">
                  <CgProfile className="fs-2 text-secondary" />
                </div>
                <div>
                  <h6 className="mb-1 fw-semibold">{comment.fullname}</h6>
                  <p className="mb-0 text-muted">{comment.msg}</p>
                </div>
              </div>
              <div className="text-muted small d-flex flex-row gap-1 align-items-center">
                {" "}
                {dayjs(comment.date).fromNow()}{" "}
                {/* {Edit & Delete buttons} */}
                {comment.user === userId && (
                  <div className="d-flex justify-content-end dropdown">
                  <BsThreeDotsVertical
                    className="dropdown-toggle hover text-dark"
                    data-bs-toggle="dropdown"
                  />
                  <ul
                    className="dropdown-menu"
                    style={{
                      fontSize: "12px",
                      minWidth: "80px",
                      overflow: "hidden",
                    }}
                  >
                    <li
                      onClick={() =>
                        commentEditHandler(comment._id, comment.msg)
                      }
                    >
                      <a className="dropdown-item">Edit</a>
                    </li>
                    <li onClick={() => commentDeleteHandler(comment._id)}>
                      <a className="dropdown-item">Delete</a>
                    </li>
                  </ul>
                </div>
                )}
              </div>
            </div>
          ))):<p className="text-secondary text-center">There is no comments yet 
            ! Make first comment.</p>}
        </div>
      </div>
    </>
  );
};

export default AllComments;
