const accountSid = "AC564ba6db4506581b6bbd04e98447e865";
const authToken = "[AuthToken]";
const client = require("twilio")(accountSid, authToken);

module.exports.sendWhatsapp = (req, res, next) => {
  const accountSid = ""; //id deleted because of security
  const authToken = ""; //deleted cus of security
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "it works son",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+2348171481096",
    })
    .then((message) => console.log(message.sid))
    .done();
  return next();
};
