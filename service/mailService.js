const nodemailer = require("nodemailer");


async function sendSuccessEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
      user: process.env.EMAIL_ID, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ID,
    to,
    subject,
    text,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("Success mail sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {sendSuccessEmail};
