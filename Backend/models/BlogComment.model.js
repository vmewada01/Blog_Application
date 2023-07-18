const mongoose = require("mongoose")
const bcrypt = require("bcrypt");


const CommentSchema = new mongoose.Schema({
    comment: String,
    blog_id: {type: mongoose.Schema.Types.ObjectId, ref: "blog"},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
},{
    timestamps:true,
});

const BlogComment = mongoose.model("blogComment",CommentSchema);

module.exports = BlogComment;