const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//ROUTES

app.get("/", (req, res, next) => {
  console.log(process.env.PORT);
  res.status(200).json("server routes work");
  return next();
});

app.use("/routes", require("./routes/routes"));

//starting the server
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
