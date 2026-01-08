const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: { type: String },
    comments: [
      {
        fullname: { type: String, required: true },
        msg: { type: String },
        date: { type: Date, required: true },
        user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
