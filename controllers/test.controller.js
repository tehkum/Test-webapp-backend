const Test = require("../models/test.model");

const fetchTests = async (req, res) => {
  try {
    const test = await Test.find();
    if (!quiz) {
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

const addTest = async (req, res) => {
  try {
    const data = req.body;
    const newTest = new Test(data);
    const test = await newTest.save();
    return res.status(200).json({ message: "test added", success: true, test });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error fetching test", error: error });
  }
};

module.exports = { fetchTest, fetchUserTests, fetchTests, addTest };
