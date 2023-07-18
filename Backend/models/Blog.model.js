const { model, Schema, default: mongoose } = require("mongoose");
const { types } = require("util");

const BlogSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  image_url: { type: String },
  description: { type: String, required: true },
  category: { type: String },
  author: { type: String, required: true },
  author_profile_pic: String,
  date: String,
  blog_comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment'}],
  blog_likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'BlogLike'}]
});

const BlogModel = model("blog", BlogSchema);

module.exports = BlogModel;
