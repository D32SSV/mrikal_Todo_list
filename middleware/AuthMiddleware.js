require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    const key = process.env.jwtSecret;
    const user = jwt.verify(token, key);
    User.findOne({ where: { id: user.userId } })
      .then((foundUser) => {
        if (foundUser) {
          req.user = user;
          next();
        } else {
          return res
            .status(401)
            .json({ success: false, message: "User not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error Occured",
        });
      });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Verification failed" });
  }
};

module.exports = { verify };
