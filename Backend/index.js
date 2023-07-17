require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./config/db")
const authentication = require("./middlewares/authentication")




const app = express();

app.use(cors());

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Welcome to Backend server api");
  });

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
  