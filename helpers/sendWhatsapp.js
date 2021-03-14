// const client = require("twilio")(accountSid, authToken);
const dotenv = require("dotenv");
dotenv.config();

module.exports.sendWhatsapp = () => {
  const accountSid = "AC564ba6db4506581b6bbd04e98447e865";
  const authToken = "0ea919adaf5fcaa0802514012ee46f5e";
  const client = require("twilio")(accountSid, authToken);
  console.log(process.env.accountSid);
  console.log(process.env.authToken);

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
