const Test = require("../models/test.model");
const User = require("../models/user.model");
const Quiz = require("../models/quiz.model");
const mongoose = require("mongoose");

const fetchTests = async (req, res) => {
  try {
    const test = await Test.find();
    if (!test) {
      return res.status(404).json({ message: "No test found" });
    }
    return res
      .status(200)
      .json({ message: "test fetched", success: true, test });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching test", error: error });
  }
};

const fetchUserTests = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.find({ candidate: id }).populate("quiz");
    if (!test) {
      return res.status(404).json({ message: "No test found" });
    }
    return res
      .status(200)
      .json({ message: "test fetched", success: true, test });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching test", error: error });
  }
};

const fetchTest = async (req, res) => {
  try {
    const { id } = req.params;
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({ message: "No test found" });
    }
    return res
      .status(200)
      .json({ message: "test fetched", success: true, test });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching test", error: error });
  }
};

// const addTest = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const data = req.body;
//     const newTest = new Test(data);
//     const test = await newTest.save();
//     //user section
//     const user = await User.findByIdAndUpdate(
//       data.candidate,
//       {
//         testGiven: test._id,
//       },
//       { new: true }
//     );
//     //quiz section
//     const quiz = await Quiz.findByIdAndUpdate(
//       data.quiz,
//       {
//         givenBy: data.candidate,
//       },
//       { new: true }
//     );
//     await session.commitTransaction();
//     session.endSession();
//     return res
//       .status(200)
//       .json({ message: "test added", user, candidate, success: true, test });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     return res
//       .status(500)
//       .json({ message: "error fetching test", error: error });
//   }
// };

const addTest = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let isTransactionCommitted = false; // Add this flag
  try {
    const data = req.body;
    console.log(data);
    const newTest = new Test(data);
    const test = await newTest.save();
    // user section
    const userEdit = await User.findById(data.candidate);
    userEdit.testGiven.push(test._id);
    const user = await userEdit.save();
    // res.redirect(`/user/${data.candidate}`);

    // quiz section
    const quizEdit = await Quiz.findById(data.quiz);
    quizEdit.givenBy.push(data.candidate);
    const quiz = await quizEdit.save();

    await session.commitTransaction();
    isTransactionCommitted = true; // Set the flag to true after committing the transaction
    session.endSession();
    return res
      .status(200)
      .json({ message: "Test added", user, quiz, success: true, test });
  } catch (error) {
    if (!isTransactionCommitted) { // Only abort the transaction if it hasn't been committed
      await session.abortTransaction();
    }
    session.endSession();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error fetching test", error: error });
  }
};


module.exports = { fetchTest, fetchUserTests, fetchTests, addTest };
