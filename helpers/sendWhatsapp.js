// const client = require("twilio")(accountSid, authToken);
const dotenv = require("dotenv");
dotenv.config();

module.exports.sendWhatsapp = () => {
  const accountSid = " ";
  const authToken = " ";
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "BITCOIN IS UP",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+2348171481096",
    })
    .then((message) => console.log(message.sid))
    .done();
  // return next();
};
