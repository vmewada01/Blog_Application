require("dotenv").config();
const { Router } = require("express");


const UserModel = require("../models/User.model");
const BlogModel = require("../models/Blog.model");
const BlogComment = require("../models/BlogComment.model");

const commentBlog = Router();

commentBlog.post("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId)
  try {
    const user_Data = await BlogModel.findOne({ userId: blogId });
      console.log(user_Data)
    if (!user_Data) {
      return res.status(404).send({ message: "Blog not found" });
    } else {
       const {comment}= req.body;
      let current_user_comment = user_Data.userId;
      const commented_Data = await BlogComment.findOne({
        blog_id: blogId,
        user_id: current_user,
      });

   
        const payload= { comment }

        const commentBlogDoc = new BlogComment({
          blog_id: blogId,
          user_id: current_user,
          comment: payload
        });
        const comment_blog = await BlogComment.save();

        await BlogComment.updateOne(
          {
            _id: blogId,
          },
          {
            $push: { blog_comments: comment_blog._id },
          }
        );
        return res.status(200).send({ message: "Comment added  successfully" });
      } 
    
    }

  
  catch (error) {
    return res.status(404).send({ message: "something went wrong" });
  }
});

module.exports = commentBlog;
