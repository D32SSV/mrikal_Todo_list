const UserService = require("../service/UserService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendSuccessEmail } = require("../service/MailService");

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await UserService.findAllUser();
      const filteredUsers = users.filter((user) => user.id !== req.user.userId);
      res.status(200).json({ users: filteredUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  static async signUpUser(req, res) {
    const { name, email, password } = req.body;
    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          error: "missing required fields",
        });
      }

      const existingUser = await UserService.findUser(email);

      if (existingUser) {
        return res.status(409).json({ message: "Email is already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = { name, email, hashedPassword };

      const newUser = await UserService.createNewUser(user);

      const token = jwt.sign({ userId: newUser.id }, process.env.jwtSecret);
      res.status(201).json({
        message:
          "registration successful. Check your email for a confirmation message",
        token: token,
      });
    } catch (error) {
      res.status(500).json({
        error: "an error occurred while registering the user",
      });
    }
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserService.findUser(email);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      const token = jwt.sign({ userId: user.id }, process.env.jwtSecret);

      if (passwordMatch) {
        // console.log("password match");
        res.status(200).json({ message: "login successfully", token });
      } else {
        // console.log("password not match");
        // Passwords don't match
        res.status(409).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the login" });
    }
  }
}

module.exports = UserController;
