const express = require("express");
const quiz = express.Router();
const {
  fetchQuizes,
  fetchQuiz,
  addQuiz,
  editQuiz,
  removeQuiz,
} = require("../controllers/quiz.controller");

quiz.route("/").get(fetchQuizes).post(addQuiz);

quiz.route("/:id").get(fetchQuiz).put(editQuiz).delete(removeQuiz);

module.exports = quiz;
