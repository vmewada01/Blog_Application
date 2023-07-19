require("dotenv").config();
const { Router } = require("express");


const UserModel = require("../models/User.model");
const BlogModel = require("../models/Blog.model");
const BlogComment = require("../models/BlogComment.model");

const commentBlog = Router();

commentBlog.get("/:blogId", async(req,res)=> {
  const { blogId } = req.params;
 // console.log(blogId)
  const user_Data = await BlogModel.findOne({ userId: blogId });
  //console.log(user_Data)
if (!user_Data) {
   res.status(404).send({ message: "Blog not found" });
} else {

  const commented_Data = await BlogComment.find({user_id: blogId});
      console.log(commented_Data)
    if (!commented_Data) {
       res.status(404).send({ message: "Comment not found" });
    }else{
       res.status(200).send(commented_Data);
    }
  }
})


commentBlog.post("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId)
  try {
    const user_Data = await BlogModel.findOne({ userId: blogId });
      //console.log(user_Data)
    if (!user_Data) {
      return res.status(404).send({ message: "Blog not found" });
    } else {
       const {comment}= req.body;
      let current_user_comment = user_Data._id;
     // consol.log(current_user_comment)
      const commented_Data = await BlogComment.findOne({
        blog_id: blogId,
        user_id: current_user_comment,
      });

   
        const commentBlogDoc = new BlogComment({
          blog_id: blogId,
          user_id: current_user_comment,
          comment: comment,
        });
        const comment_blog = await commentBlogDoc.save();
        const updatedBlog= await BlogModel.findOneAndUpdate(
          {
            userId: blogId,
          },
          {
            $push: { blog_comments: comment_blog._id }
          },
          {new: true}
          
          );
          if (!updatedBlog) {
            return res.status(404).send({ msg: "Blog not found" });
          }
          
          console.log(updatedBlog);
          res.status(200).send({ msg: "Blog updated successfully" });
        // console.log(new_Blog)
        // return res.status(200).send({ message: "Liked  successfully" });
      }
      } 
    
  catch (error) {
    return res.status(404).send({ message: "something went wrong" });
  }
});

module.exports = commentBlog;
