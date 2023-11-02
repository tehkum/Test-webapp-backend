const express = require("express");
const test = express.Router();
const {
  fetchTest,
  fetchUserTests,
  fetchTests,
  addTest,
} = require("../controllers/test.controller");

test.route("/").get(fetchTests).post(addTest);

test.route("/:id").get(fetchTest);

test.route("/user/:id").get(fetchUserTests);

module.exports = test;
