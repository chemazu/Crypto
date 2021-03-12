const express = require("express");
const router = express.Router();
const { sendWhatsapp } = require("../helpers/sendWhatsapp");
const {
  first,
  getCurrentPrice,
  getAlerts,
  createAlert,
} = require("../controllers/controller");
const { sendMail } = require("../helpers/sendEmailNotification");
router.get("/first", first);
router.get("/prices", getCurrentPrice);
router.get("/alerts", getAlerts);
router.get("/send", sendMail);
router.get("/whatsapp", sendWhatsapp);
router.post("/alert", createAlert);

module.exports = router;
