require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db");
const router = require("./router/MainRouter");
const User = require("./model/User");
const List = require("./model/ToDoList");
const SharedList = require("./model/SharedList");


const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

//relation between user & list
User.hasMany(List, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
List.belongsTo(User, {
  foreginKey: "userId",
  onDelete: "CASCADE",
});
User.hasMany(SharedList, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
SharedList.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});



const port = process.env.PORT || 8080;

async function initiate() {
  try {
    await sequelize.sync();
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Server: http://localhost/${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
initiate();
