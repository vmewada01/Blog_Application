require("dotenv").config();
const { Router } = require("express");


const UserModel = require("../models/User.model");
const BlogModel = require("../models/Blog.model");
const BlogLike = require("../models/BlogLike.model");

const likeBlog = Router();


likeBlog.post("/:blogId", async (req, res) => {
  const { blogId } = req.params;
  //console.log(blogId)
  // try {
    const user_Data = await BlogModel.findOne({ userId: blogId });
      //console.log(user_Data)
      let current_user = user_Data._id;
    if (!user_Data) {
      return res.status(404).send({ message: "Blog not found" });
    } else {
     
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
      
      const updatedBlog= await BlogModel.findOneAndUpdate(
          {
            userId: blogId,
          },
          {
            $push: { blog_likes: liked_blog._id }
          },
          {new: true}
          
          );
          if (!updatedBlog) {
            return res.status(404).send({ msg: "Blog  not found" });
          }
          
         // console.log(updatedBlog);
          res.status(200).send({ msg: "Block Liked successfully" });
        // console.log(new_Blog)
        // return res.status(200).send({ message: "Liked  successfully" });
      } 
      else {
        const likeData = await BlogLike.findOne({ _id: like_Data._id ,user_id:current_user  });
      console.log(likeData)
        if (!likeData) {
          return res.status(404).send({ msg: "Like not found" });
        }
          console.log(likeData.blog_id, current_user)
        const updatedBlog = await BlogModel.findOneAndUpdate(
          { _id: likeData.blog_id, user_id:current_user  },
          { $set: { blog_likes : [] } },
          { new: true }
        );
           console.log(updatedBlog)
         await BlogLike.findOneAndDelete({ _id: like_Data._id ,user_id:current_user  })

      // console.log(updatedBlog)
      //   if (!updatedBlog) {
      //     return res.status(404).send({ msg: "Blog not found" });
      //   }
      
         res.status(200).send({ msg: "like delted from like model successfully" });
      }
      


  //     else {
  //  await BlogLike.deleteOne({
  //     _id: like_Data._id,
  //       });

  //       const updated_Blog = await BlogModel.findByIdAndUpdate(
  //         {
  //           userId: like_Data.blog_id,
  //         },
  //         {
  //           $pull: { blog_likes: like_Data._id },
  //         },
  //         {new: true}
  //       );
  //       if (!updatedBlog) {
  //         return res.status(404).send({ msg: "Blog not found" });
  //       }
        
  //       console.log(updatedBlog);
  //       res.status(200).send({ msg: "Blog updated successfully" });
  //       return res
  //         .status(200)
  //         .send({ message: "Liked has been removed successfully" });
  //     }
    }
  // }
  
  // catch (error) {
  //   return res.status(404).send({ message: "something went wrong" });
  // }
 });

module.exports = likeBlog;
