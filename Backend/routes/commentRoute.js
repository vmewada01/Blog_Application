require("dotenv").config();
const { Router } = require("express");

const UserModel = require("../models/User.model");
const BlogModel = require("../models/Blog.model");
const BlogComment = require("../models/BlogComment.model");

const commentBlog = Router();

commentBlog.delete("/:blogId/comment/:commentId", async (req, res) => {
  const { blogId, commentId } = req.params;
  //  console.log(blogId)
  //  console.log(commentId)
 
  const user_Data = await BlogModel.findByIdAndUpdate(
    commentId,
    {
      $pull: {
        blog_comments: {
          _id: blogId,
        },
      },
    },
    { new: true }
  );
 // console.log(user_Data)
  if (!user_Data) {
    res.status(404).send({ message: "Blog not found" });
  } else {
    res.status(200).send({ message: "comment deleted Successfull" });
  }
});

commentBlog.post("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  // console.log(blogId)
  const { comment, author, image } = req.body;
  const user_Data = await BlogModel.findOne({ _id: blogId });
  //console.log(user_Data)
  try {
    if (!user_Data) {
      return res.status(404).send({ message: "Blog not found" });
    } else {
      const updatedBlog = await BlogModel.updateMany(
        { _id: blogId },
        {
          $set: {
            blog_comments: [
              ...user_Data.blog_comments,
              { text: comment, author: author, author_image: image },
            ],
          },
        }
      );
      //console.log("updated succesfully")
      // res.json(updatedBlog);
      return res.status(200).send({ msg: "message updated successfully" });
    }
  } catch (err) {
    return res.status(404).send({ message: "something went wrong" });
  }
});

module.exports = commentBlog;
