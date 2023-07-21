require("dotenv").config();
const jwt =require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET_KEY;
const authentication = (req, res, next) => {
  //console.log(req.body.headers.authorization)
  if (!req.body?.headers?.authorization)
    return res
      .status(401)
      .send({ message: "You're not Logged in, Please login to our site" });
  const token = req.body?.headers?.authorization?.split(" ")[1];
   console.log(token)
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ message: "Please login again", error: err });
    }
    next();
  });
};

module.exports = authentication;
