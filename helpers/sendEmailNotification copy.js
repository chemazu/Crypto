const nodemailer = require("nodemailer");
const keys = require("../config/keys");
// const config = require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();

module.exports.eggs = async (req, res, next) => {
  try {
    console.log(process.env.PASSWORD);
    const smtpEndpoint = "smtp.sendgrid.net";
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.sendgrid.net",
    //   port: 465,
    //   secure: true, // use SSL
    //   auth: {
    //     user: "",
    //     pass: "",
    //   },
    //   authentication: "PLAIN",
    // });
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,

      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: "ratface3",
      },
      authentication: "PLAIN",
    });
    // const transporter = nodemailer.createTransport({
    //   service: "SendinBlue", // no need to set host or port etc.
    //   auth: {
    //     user: "chisomchemazu3@gmail.com",
    //     pass: "Edr3vwsLBSjNYbFM",
    //   },
    // });
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "chukwuemekachemazu@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ status: true, info });
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    return { error: false };
  } catch (error) {
    console.log("error is ", error);
  }
  return next();
};
