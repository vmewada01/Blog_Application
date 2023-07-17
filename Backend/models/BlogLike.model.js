const mongoose = require("mongoose")
const bcrypt = require("bcrypt");


const LikeSchema = new mongoose.Schema({
    blog_id: {type: mongoose.Schema.Types.ObjectId, ref: "blog"},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
},{
    timestamps:true,
});

const BlogLike = mongoose.model("blogLike",LikeSchema);

module.exports = BlogLike;