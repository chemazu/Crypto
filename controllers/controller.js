// const controller = module.exports;
const { nomicsKey } = require("../config/keys");
require("../workers/removedExpired");
const alerts = require("./alerts");
const axios = require("axios");
// require("../workers/removeExpired.js");
require("../workers/removedExpired");

module.exports.first = (req, res, next) => {
  res.status(200).json("First");
  return next();
};

module.exports.currentPrice = async (req, res, next) => {
  try {
    let url =
      "https://api.nomics.com/v1/currencies/ticker?key=db88f32f365b9d4caebcdcb42c0a6649&ids=BTC,ETH,XRP&interval=1d,30d&convert=USD&per-page=100&page=1";
    const resp = await axios.get(url);
    res.status(200).json(resp.data);
  } catch (error) {
    console.log(error);
  }
};
module.exports.createAlert = async (req, res, next) => {
  const { asset, price, type, email } = req.body;
  try {
    if (!asset || !price || !type || !email) {
      res.status(400).json({
        error: "true",
        message: "Please provide the required fields",
      });
    }
    if (asset.toLowerCase() != "btc" && asset.toLowerCase() != "eth")
      return res.status(400).json({
        error: true,
        message: "You can set alerts for BTC and ETH only.",
      });
    alerts.push({
      asset: asset,
      price: price,
      email: email,
      type: type.toLowerCase(),
      createdAt: new Date(),
    });

    return res.send({ success: true, message: "Alert created" }); //Send response
  } catch (error) {
    res.status(500).json(error);
  }
  return next();
};
exports.getAlerts = async (req, res) => {
  return res.send({ success: true, alerts: alerts });
};
