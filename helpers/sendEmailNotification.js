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
        pass: "", //removed password so i can commit
      },
    });
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      text: message, // plain text body
      html:
        "<b>Good Morning Chukwuemeka , How is today going to be here are Stock,mantra,schedule,word for the day</b>", // html body
    });
    return { status: true, info };
  } catch (error) {
    console.log(error);
    console.log(process.env.PASSWORD);
  }
};
