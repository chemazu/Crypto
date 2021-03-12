const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

module.exports.sendMail = async (email, message, title) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: "ratface3",
      },
    });
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "chukwuemekachemazu@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html:
        "<b>Good Morning Chukwuemeka , How is today going to be here are Stock,mantra,schedule,word for the day</b>", // html body
    });
    message.status(200).json({ status: true, info });
  } catch (error) {
    console.log(error);
    console.log(process.env.PASSWORD);
  }
};