const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: "string" },
    displayName: { type: "string" },
    isAdmin: { type: "boolean", default: false },
    testGiven: [{ type: mongoose.Schema.Types.ObjectId, ref: "tests" }],
  },
  { timestamps: true }
);

const User = mongoose.model("userPros", userSchema);

module.exports = User;
