require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./config/db")
const authentication = require("./middlewares/authentication")
const profileRouter = require("./routes/userProfile");
const appRouter = require("./routes/blog");
const blogsRouter = require("./routes/blogs");
const userBlog = require("./routes/userBlog");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth");



const app = express();

app.use(cors());

app.use(express.json());

app.use(
    fileUpload({
      useTempFiles: true,
    })
  );

app.get("/", (req, res) => {
    res.send("Welcome to Backend server api");
  });


  app.use("/auth", authRouter);

  app.use("/blogs", blogsRouter);

  app.use("/blog", userBlog);

  app.use(authentication);






const PORT= process.env.PORT || 8080

  app.listen(PORT, async () => {
    try {
      await connection;
      console.log("connected to DataBase");
      console.log(`Server running at ${PORT}`);
    } catch (error) {
      console.log("Something went wrong" + "\n" + error);
    }
  });
  