const CronJob = require("cron").CronJob;

const alerts = require("../controllers/alerts");
const removeExpired = new CronJob(
  "*/10 * * * * *", // Run every 10 secs
  async function () {
    alerts.forEach((alert, index) => {
      // iterate through all the alerts
      if (
        new Date(alert.createdAt).getTime() + 5 * 10000 <
        new Date().getTime()
      )
        //Convert to ms and compare
        alerts.splice(index, 1); // If the alert created time + 5mins is greater than current time, remove from array
    });
  }
);

removeExpired.start();
