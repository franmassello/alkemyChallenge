require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "franmassello5@gmail.com",
  from: "franmassello1@gmail.com",
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