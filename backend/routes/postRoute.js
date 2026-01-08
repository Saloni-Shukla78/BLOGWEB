const express = require("express");
const router = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getPost,
  addComment,
  getAllComments,
  editComment,
  deleteComment,
} = require("../controllers/postController");

const authMiddleware = require('../middleware/authMiddleware');
const isAuthor = require('../middleware/isAuthor');
const isCommentOwner = require('../middleware/isCommentOwner');

router.post("/create", authMiddleware, createPost);
router.put("/update/:id", authMiddleware, isAuthor, updatePost);
router.delete("/delete/:id",authMiddleware , isAuthor, deletePost);
router.get("/allpost", getAllPost);
router.get("/:id", getPost);
router.post("/:id/comment",authMiddleware, addComment);
router.get("/:id/comments", getAllComments);
router.put("/edit-comment/:blogId/:id",authMiddleware , isCommentOwner , editComment);
router.delete("/delete-comment/:blogId/:id",authMiddleware, isCommentOwner , deleteComment);

module.exports = router;
