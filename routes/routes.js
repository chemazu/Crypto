const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { sendWhatsapp } = require("../helpers/sendWhatsapp");
dotenv.config();
const {
  first,
  currentPrice,
  getAlerts,
  createAlert,
} = require("../controllers/controller");
const { sendMail } = require("../helpers/sendEmailNotification");
router.get("/first", first);
router.get("/prices", currentPrice);
router.get("/alerts", getAlerts);
router.get("/eggs", sendMail);
router.get("/whatsapp", sendWhatsapp);

router.post("/alert", createAlert);

module.exports = router;
