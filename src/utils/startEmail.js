require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: process.env.EMAIL_SENDER_SENDGRID,
  from: process.env.EMAIL_SENDER_SENDGRID,
  subject: "Test sendgrid",
  text: "API Iniciada! ",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Start email sent");
  })
  .catch((error) => {
    console.log(error.response.body);
  });


module.exports = sgMail;