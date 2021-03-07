const express = require("express");
const router = express.Router();
const { first, currentPrice } = require("../controllers/controller");

router.get("/first", first);
router.get("/prices", currentPrice);

module.exports = router;
