const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const db = require("./config/keys").mongURI;

app.use(express.json());

//ROUTES

app.get("/", (req, res, next) => {
  console.log(process.env.PORT);
  res.status(200).json("server routes work");
  return next();
});

app.use("/routes", require("./routes/routes"));

//connecting mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("mongodb running"))
  .catch((err) => console.log("the error is", err));

//starting the server
app.listen(PORT, () => {
  console.log("SERVER STARTED");
});
