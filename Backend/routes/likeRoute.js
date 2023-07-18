require("dotenv").config();
const { Router } = require("express");


const UserModel = require("../models/User.model");
const BlogModel = require("../models/Blog.model");
const BlogLike = require("../models/BlogLike.model");

const likeBlog = Router();

likeBlog.post("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  console.log(blogId)
  try {
    const user_Data = await BlogModel.findOne({ userId: blogId });
      console.log(user_Data)
    if (!user_Data) {
      return res.status(404).send({ message: "Blog not found" });
    } else {
      let current_user = user_Data.userId;
      const like_Data = await BlogLike.findOne({
        blog_id: blogId,
        user_id: current_user,
      });

      if (!like_Data) {
        const likeBlogDoc = new BlogLike({
          blog_id: blogId,
          user_id: current_user,
        });
        const liked_blog = await likeBlogDoc.save();

        await BlogModel.updateOne(
          {
            _id: blogId,
          },
          {
            $push: { blog_likes: liked_blog._id },
          }
        );
        return res.status(200).send({ message: "Liked  successfully" });
      } else {
        await BlogLike.deleteOne({
          _id: like_Data._id,
        });

        await BlogModel.updateOne(
          {
            _id: like_Data.blog_id,
          },
          {
            $pull: { blog_likes: like_Data._id },
          }
        );
        return res
          .status(200)
          .send({ message: "Liked has been removed successfully" });
      }
    }
  }
  
  catch (error) {
    return res.status(404).send({ message: "something went wrong" });
  }
});

module.exports = likeBlog;
