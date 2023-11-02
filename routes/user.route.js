const {
  addUser,
  getUser,
  editUser,
  getUserByEmail,
} = require("../controllers/user.controller");
const express = require("express");
const user = express.Router();

user.route("/").post(addUser);

user.route("/email").post(getUserByEmail);

user.route("/:id").put(editUser).get(getUser);

module.exports = user;
