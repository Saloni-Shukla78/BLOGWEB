import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdSend } from "react-icons/io";

const CommentPost = ({
  id,
  fetchComments,
  editData,
  isEditing,
  setIsEditing,
}) => {
  const [comment, setComment] = useState({ msg: "" });
  useEffect(() => {
    if (isEditing && editData?.msg) {
      setComment({ msg: editData.msg });
    }
  }, [editData, isEditing]);

  const onChangeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const commentHandler = async (e, id) => {
    e.preventDefault();
    const userName = localStorage.getItem("name");
    const fullComment = {
      msg: comment.msg,
      fullname: userName,
    };
    const token = localStorage.getItem("token");
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/post/edit-comment/${id}/${editData.comment_id}`,
          fullComment,
          {
            headers :{
              Authorization:`Bearer ${token}`,
            }
          }
        );
        setIsEditing(false);
      }
      // console.log("Submitting comment:", fullComment);
      await axios.post(`http://localhost:3000/post/${id}/comment`, fullComment,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          }
        }
      );
      // alert("Comment Posted successfully.");
      setComment({ msg: "" });
      fetchComments();
      
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => commentHandler(e, id)}
        className="d-flex flex-column flex-sm-row gap-2 align-items-stretch mt-2"
      >
        <textarea
          name="msg"
          value={comment.msg}
          onChange={onChangeHandler}
          className="form-control shadow-sm rounded-4"
          placeholder="Add Comment"
          style={{
            height: "40px",
            resize: "none",
            paddingTop: "8px",
          }}
          rows={1}
        />
        <button
          type="submit"
          className="btn btn-primary px-3 rounded-4"
          style={{ height: "40px" }}
        >
          <IoMdSend className="fs-4" />
        </button>
      </form>
    </>
  );
};
export default CommentPost;
