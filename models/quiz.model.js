const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    quizName: { type: "string" },
    questions: [
      {
        statement: { type: String },
        options: [{ type: String }],
        correctAnswer: { type: String },
      },
    ],
    givenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "userPros" }],
    timer: { type: Number },
  },
  { timestamps: true, timeseries: true }
);

const Quiz = mongoose.model("quizes", quizSchema);

module.exports = Quiz;
