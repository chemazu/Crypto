const currentPrice = require("../helpers/currentPrice");
const alerts = require("./alerts");
const axios = require("axios");
require("../workers/removedExpired");
require("../workers/sendAlert");
module.exports.first = (req, res, next) => {
  res.status(200).json("First");
  return next();
};

module.exports.getCurrentPrice = async (req, res, next) => {
  try {
    let prices = await currentPrice();
    if (prices.error) return res.status(500).json(prices);
    return res.status(200).json({
      success: true,
      price_data: prices.data,
    });
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
