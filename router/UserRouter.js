const express = require("express");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", UserController.signUpUser);
userRouter.post("/login", UserController.loginUser);
userRouter.get("/allusers", AuthMiddleware.verify, UserController.getUsers);

module.exports = userRouter;
