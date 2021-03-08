const express = require("express");
const router = express.Router();
const {
  first,
  currentPrice,
  getAlerts,
  createAlert,
} = require("../controllers/controller");
router.get("/first", first);
router.get("/prices", currentPrice);
router.get("/alerts", getAlerts);
router.post("/alert", createAlert);

module.exports = router;
