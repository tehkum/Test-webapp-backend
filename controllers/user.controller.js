const User = require("../models/user.model");

const editUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOneAndUpdate({ email: data.email }, data, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(201)
      .json({ user, success: true, message: "user updated success" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(201)
      .json({ user, success: true, message: "user fetched success" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res
      .status(201)
      .json({ user, success: true, message: "user fetched success" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const user = await newUser.save();
    return res
      .status(201)
      .json({ user, success: true, message: "user updated success" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = { addUser, getUser, editUser, getUserByEmail };
