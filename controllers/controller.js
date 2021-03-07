// const controller = module.exports;
const { nomicsKey } = require("../config/keys");
const axios = require("axios");

module.exports.first = (req, res, next) => {
  res.status(200).json("First");
  return next();
};

// module.exports = {
//   first: (req, res, next) => {
//     res.status(200).json("First");
//     return next();
//   },
// };
module.exports.currentPrice = async (req, res, next) => {
  try {
    let url =
      "https://api.nomics.com/v1/currencies/ticker?key=db88f32f365b9d4caebcdcb42c0a6649&ids=BTC,ETH,XRP&interval=1d,30d&convert=EUR&per-page=100&page=1";
    const resp = await axios.get(url);
    res.status(200).json(resp.data);
  } catch (error) {
    console.log(error);
  }
};
