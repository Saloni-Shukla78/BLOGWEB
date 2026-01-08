const { Post } = require("../models/post");

//Create a Blog
const createPost = async (req, res) => {
  try {
    const { title, content, category, image, tags } = req.body;
    const newPost = new Post({
      title,
      content,
      category,
      image,
      author: req.user.id,
      tags,
    });
    await newPost.save();
    res.status(201).json({
      message: "Blog created Successfully.",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Blog not created.",
      error: error.message,
    });
  }
};
//Update the Blog
const updatePost = async (req, res) => {
  try {
    const id = req.params.id;

    const { title, content, category, image, tags } = req.body;
    // const post = await Post.findById(id);
    // if (!post) {
    //   return res.status(400).json({ message: "Blog not found" });
    // }
    const editPost = await Post.updateOne(
      { _id: id },
      { $set: { title, content, category, image, tags } }
    );
    res.status(201).json({
      message: "Blog updated Successfully.",
      result: editPost,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Blog not updated.", error: error.message });
  }
};
//Delete Blog
const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    // const post = await Post.findById(id);
    // if (!post) {
    //   return res.status(400).json({ message: "Blog not found." });
    // }
    await Post.deleteOne({ _id: id });
    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Blog not deleted.", error: error.message });
  }
};
//Display All Blog..
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: "All Blogs found.",
      result: posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Blogs not found.",
      error: error.message,
    });
  }
};
//Display one Blog..
const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id).populate("author", "fullname email");
    res.status(200).json({
      message: "Blog found.",
      result: post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Blog not found.",
      error: error.message,
    });
  }
};

//To add the comment....
const addComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { msg, fullname } = req.body;

    const blog = await Post.findById(id).populate("author", "fullname email");
    if (!blog) {
      return res.status(400).json({
        message: "Blog not found",
      });
    }

    blog.comments.push({
      fullname: fullname || "UnKnown",
      msg,
      user: req.user.id,
      date: new Date(),
    });

    await blog.save();

    res.status(201).json({
      message: "Comment posted successfully.",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Comment not posted.",
      error: error.message,
    });
  }
};
//Fetch all comments..
const getAllComments = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Post.findById(id).select("comments");
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
      });
    }
    res.status(201).json({
      message: "Comment fetch successfully.",
      comment: blog.comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Comments not fetched.",
      error: error.message,
    });
  }
};
//Edit comment option...
const editComment = async (req, res) => {
  try {
    // const blogId = req.params.blogId;
    // const commentId = req.params.id;
    // const { msg } = req.body;
    // const blog = await Post.findById(blogId);
    // if (!blog) {
    //   return res.status(404).json({
    //     message: "Blog not found",
    //   });
    // }
    // const comment = blog.comments.id(commentId);
    // if (!comment) {
    //   return res.status(404).json({
    //     message: "Comment not found",
    //   });
    // }
    //  comment.msg = msg;
    // comment.date = new Date();
    // await blog.save();
    const blog = req.blog;
    const comment = req.comment;
    comment.msg = req.body.msg;
    comment.date = new Date();
    await blog.save();

    res.status(200).json({
      message: "Comment edited successfully.",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Comment not edited.",
      error: error.message,
    });
  }
};
//Delete one Comment
const deleteComment = async (req, res) => {
  try {
    // const blogId = req.params.blogId;
    // const commentId = req.params.id;
    // const blog = await Post.findById(blogId);
    // if (!blog) {
    //   return res.status(404).json({
    //     message: "Blog not found.",
    //   });
    // }
    // const comment = blog.comments.id(commentId);
    // if (!comment) {
    //   return res.status(404).json({
    //     message: "Comment not found",
    //   });
    // }
    const blog = req.blog;
    const comment = req.comment;
    comment.deleteOne();
    await blog.save();
    res.status(200).json({
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Comment not deleted.",
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getPost,
  addComment,
  getAllComments,
  editComment,
  deleteComment,
};
