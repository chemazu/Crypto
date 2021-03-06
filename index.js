const { json } = require("express");
const express = require("express");
const app = express();
PORT = process.env.PORT || 5000;

app.use(express.json());

//ROUTES

app.get("/", (req, res, next) => {
  res.status(200).json("server routes work");
  return next();
});

app.use("/routes", require("./routes/routes"));

app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
