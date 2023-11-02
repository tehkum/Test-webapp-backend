const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "quizes" },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: "userPros" },
  test: [
    {
      statement: { type: String, required: true },
      options: [{ type: String }],
      correctAnswer: { type: String, required: true },
      givenAnwer: { type: String },
    },
  ],
});

const Test = mongoose.model("tests", testSchema);

module.exports = Test;
