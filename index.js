const express = require("express");
const cors = require("cors");
const quiz = require("./routes/quiz.route");
const test = require("./routes/test.route");
const user = require("./routes/user.route");
require("dotenv").config();

require("./config/dbConfig");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/quiz", quiz);
app.use("/test", test);
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Hello Express app!");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(port, () => {
  console.log("server started");
});
