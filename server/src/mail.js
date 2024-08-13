const nodemailer = require("nodemailer");
const generateOrderHTML = require("./orderTemplate.js");

async function sendMail(email, order) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ak.sender19@gmail.com",
      pass: "glkw wwkd nqrp izhz",
    },
  });

  const mailOptions = {
    from: "ak.sender19@gmail.com",
    to: `${email}`,
    subject: "Your order has been placed successfully",
    html: generateOrderHTML(order),
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Successfully sent the email.");
  } catch (error) {
    console.error("Email send failed with error: ", error);
  }
}

module.exports = sendMail;
