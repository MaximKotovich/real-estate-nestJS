import * as nodemailer from "nodemailer";

export const sendMailerService = async (toMail: string, confirmKey: string) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FOR_SEND_MAIL,
      pass: process.env.PASS_FOR_SEND_MAIL
    }
  });

  const confirmLink = `${process.env.URL}user/confirm/${confirmKey}`;
  await transporter.sendMail({
    from: process.env.EMAIL_FOR_SEND_MAIL,
    to: toMail,
    subject: "Confirm Email ✔",
    text: "For confirm your email, you need click on link under",
    html: `<a href=${confirmLink}>Confirm link</a>`
  });

};
