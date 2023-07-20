const { model, Schema, default: mongoose } = require("mongoose");
const { types } = require("util");

const commentSchema = new Schema({
  text: String,
  author: String,
  author_image: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

const BlogSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  image_url: { type: String },
  description: { type: String, required: true },
  category: { type: String },
  author: { type: String, required: true },
  author_profile_pic: String,
  date: String,
  blog_comments:[commentSchema],
  blog_likes:{
    type: Boolean,
    default: false,
  }
});

const BlogModel = model("blog", BlogSchema);

module.exports = BlogModel;
