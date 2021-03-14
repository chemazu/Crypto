const CronJob = require("cron").CronJob;
const alerts = require("../models/alert.model");

const removeExpired = new CronJob("*/10 * * * * *", async () => {
  const allAlerts = await alerts.find();
  allAlerts.forEach(async (alert) => {
    if (
      new Date(alert.createdAt).getTime() + 10 * 10000 <
      new Date().getTime()
    ) {
      await alerts.deleteOne({ _id: alert._id });
    }
  });
});
removeExpired.start();
