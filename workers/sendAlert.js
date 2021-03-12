const CronJob = require("cron").CronJob;
var Queue = require("bull");

const alerts = require("../alerts");
const config = require("../config");

const currentPrice = require("../helpers/currentPrice");
const sendEmailNotification = require("../helpers/sendEmailNotification");

var alertQueue = new Queue("alerts", config.REDIS_URL); //Create a queue

alertQueue.process(async function (job, done) {
  //Consumer process
  const { recipient, title, message } = job.data;

  let sendEmailResponse = await sendEmailNotification(
    recipient,
    message,
    title
  );
  if (sendEmailResponse.error) {
    done(new Error("Error sending alert"));
  }
  done();
});

var sendAlert = new CronJob(
  "*/25 * * * * *", // Execute every 25 seconds
  async function () {
    const currentPrices = await currentPrice();
    if (currentPrices.error) return;

    let priceObj = {
      BTC: currentPrices.data.BTC,
      ETH: currentPrices.data.ETH,
    };

    alerts.forEach((alert, index) => {
      let message, title, recipient;
      if (
        alert.type == "above" &&
        parseFloat(alert.price) <= parseFloat(priceObj[alert.asset])
      ) {
        message = `Price of ${
          alert.asset
        } has just exceeded your alert price of ${alert.price} USD.
      Current price is ${priceObj[alert.asset]} USD.`;
        title = `${alert.asset} is up!`;
        recipient = alert.email;

        alertQueue.add(
          //Add to queue (Producer)
          { message, recipient, title },
          {
            attempts: 3, // Retry 3 times for every 3 seconds
            backoff: 3000,
          }
        );

        alerts.splice(index, 1); // remove the alert once pushed to the queue.
      } else if (
        alert.type == "below" &&
        parseFloat(alert.price) > parseFloat(priceObj[alert.asset])
      ) {
        message = `Price of ${alert.asset} fell below your alert price of ${
          alert.price
        }.
      Current price is ${priceObj[alert.asset]} USD.`;

        recipient = alert.email;
        title = `${alert.asset} is down!`;

        alertQueue.add(
          //Add to queue (Producer)
          { message, recipient, title },
          {
            attempts: 3,
            backoff: 3000,
          }
        );

        alerts.splice(index, 1); // remove the alert once pushed to the queue.
      }
    });
  }
);

sendAlert.start();
