require("dotenv").config();
const { Router } = require("express");

const UserModel = require("../models/User.model");
const BlogModel = require("../models/Blog.model");
const {authentication_Like_Comment} = require("../middlewares/authentication")

const likeBlog = Router();

likeBlog.post("/:_id",authentication_Like_Comment, async (req, res) => {
  try {
    const {_id}= req.params;
    console.log(_id)
    const blog = await BlogModel.findOne({_id});
   if(!blog){
     return res.status(404).send({ message: "Blog not found" });
   }

   const updatedBlog= await BlogModel.findByIdAndUpdate(
    _id,
    {blog_likes: !blog.blog_likes} ,
    {new: true}
   );

 return res.status(200).send({ message: "Blog updated successfully" });

  }
   catch (error) {
    return res.status(404).send({ message: "something went wrong" });
  }
});


module.exports = likeBlog;
