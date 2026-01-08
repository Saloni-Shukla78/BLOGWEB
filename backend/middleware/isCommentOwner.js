const { Post } = require("../models/post.js");

const isCommentOwner = async (req, res, next) => {
    const userId = req.user.id;
  try {
    const blog = await Post.findById(req.params.blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }
    const comment = blog.comments.id(req.params.id);
    if (!comment) {
      return res.status(404).json({
        message: "comment not found.",
      });
    }
    
    if (comment.user && comment.user.toString() === userId) {
       req.blog = blog;
    req.comment = comment;
      return next();
    } else {
      return res.status(403).json({
        message: "You are not comment owner.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = isCommentOwner;
