const CronJob = require("cron").CronJob;
var Queue = require("bull");

const alerts = require("../models/alert.model");
const currentPrice = require("../helpers/currentPrice");
const sendEmailNotification = require("../helpers/sendEmailNotification");
const { sendWhatsapp } = require("../helpers/sendWhatsapp");

var alertQueue = new Queue("alerts", "redis://127.0.0.1:6379"); // create queue

alertQueue.process(async function (job, done) {
  try {
    const { recipient, title, message } = job.data;

    let sendEmailResponse = await sendEmailNotification(
      "chukwuemekachemazu@gmail.com",
      message,
      title
    );
    // let sendEmailResponse = await sendEmailNotification(
    //   recipient,
    //   message,
    //   title
    // );

    if (sendEmailResponse.error) {
      done(new Error("Error sending alert"));
    }
    console.log("email works");
    done();
  } catch (error) {
    console.log(error);
  }
});

var sendAlert = new CronJob("*/25 * * * * *", async function () {
  try {
    const currentPrices = await currentPrice();
    console.log("current prices", currentPrices);
    if (currentPrices.error) {
      console.log("error in fetching prices");
    }
    let priceObj = {
      BTC: currentPrices.data.BTC,
      ETH: currentPrices.data.ETH,
    };
    const allAlerts = await alerts.find();
    console.log(allAlerts);
    allAlerts.forEach((singleAlert) => {
      if (
        singleAlert.type == "above" &&
        parseFloat(singleAlert.price) <= parseFloat(priceObj[singleAlert.asset])
      ) {
        console.log("fire");
        // sendWhatsapp();
        sendEmailNotification.sendMail();
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// var sendAlert = new CronJob("*/25 * * * * *", async function () {
//   const currentPrices = await currentPrice();
//   console.log("current prices", currentPrices);
//   if (currentPrices.error) {
//     console.log("error in fetching prices");
//   }
//   let priceObj = {
//     BTC: currentPrices.data.BTC,
//     ETH: currentPrices.data.ETH,
//   };
//   alerts.forEach((singleAlert) => {
//     if (singleAlert=="above"&& parseFloat(singleAlert.price)<= parseFloat(priceObj[singleAlert.asset])){
//       console.log('iriri')
//     }
//     console.log(singleAlert);
//   });
//   if

//   // alerts.forEach((alert, index) => {
//   //   let message, title, recipient;
//   //   if (
//   //     alert.type == "above" &&
//   //     parseFloat(alert.price) <= parseFloat(priceObj[alert.asset])
//   //   ) {
//   //     console.log("i can compare above");
//   //     message = `Price of ${
//   //       alert.asset
//   //     } has just exceeded your alert price of ${alert.price} USD.
//   //     Current price is ${priceObj[alert.asset]} USD.`;
//   //     title = `${alert.asset} is up!`;
//   //     recipient = alert.email;
//   //     alertQueue.add(
//   //       //Add to queue (Producer)
//   //       { message, recipient, title },
//   //       {
//   //         attempts: 3, // Retry 3 times for every 3 seconds
//   //         backoff: 3000,
//   //       }
//   //     );
//   //     alerts.splice(index, 1); // remove the alert once pushed to the queue.
//   //   } else if (
//   //     alert.type == "below" &&
//   //     parseFloat(alert.price) > parseFloat(priceObj[alert.asset])
//   //   ) {
//   //     console.log("i can compare below");
//   //     message = `Price of ${alert.asset} fell below your alert price of ${
//   //       alert.price
//   //     }.
//   //     Current price is ${priceObj[alert.asset]} USD.`;

//   //     recipient = alert.email;
//   //     title = `${alert.asset} is down!`;

//   //     alertQueue.add(
//   //       //Add to queue (Producer)
//   //       { message, recipient, title },
//   //       {
//   //         attempts: 3,
//   //         backoff: 3000,
//   //       }
//   //     );

//   //     alerts.splice(index, 1); // remove the alert once pushed to the queue.
//   //   }
//   // });
// });

sendAlert.start();
