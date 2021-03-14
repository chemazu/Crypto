const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const alertSchema = new Schema(
  {
    email: { type: String, required: true },
    price: { type: Number, required: true },
    asset: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const mAlert = mongoose.model("alerts", alertSchema);

module.exports = mAlert;
