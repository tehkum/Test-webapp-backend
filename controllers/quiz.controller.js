const Quiz = require("../models/quiz.model");

const fetchQuizes = async (req, res) => {
  try {
    const quiz = await Quiz.find();
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }
    return res
      .status(200)
      .json({ message: "quiz fetched", success: true, quiz });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching quiz", error: error });
  }
};

const fetchQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }
    return res
      .status(201)
      .json({ message: "quiz fetched", success: true, quiz });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching quiz", error: error });
  }
};

const addQuiz = async (req, res) => {
  try {
    const data = req.body;
    const newData = new Quiz(data);
    const quiz = await newData.save();
    return res.status(201).json({ message: "quiz added", success: true, quiz });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching quiz", error: error });
  }
};

const editQuiz = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(id, data, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }
    return res
      .status(201)
      .json({ message: "quiz updated", success: true, quiz });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching quiz", error: error });
  }
};

const removeQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }
    return res
      .status(201)
      .json({ message: "quiz Deleted", success: true, quiz });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching quiz", error: error });
  }
};

module.exports = { fetchQuizes, fetchQuiz, addQuiz, editQuiz, removeQuiz };
