require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function registerInitialEmail(email, username) {
  const msg = {
    to: email,
    from: process.env.EMAIL_SENDER_SENDGRID,
    subject: "Registro de usuario en API Disney FranMassello",
    text: `Hola, ${username}! Gracias por registrarte en la API de Disney. Recuerda que para usar la API tienes que agregar un Header en cada request que hagas, key: x-access-token  value: JWT token generado con login o registro`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Register email sent to:" + email);
    })
    .catch((error) => {
      console.log(error.response.body);
    });
}

function loginEmail(email, username) {
  const msg = {
    to: email,
    from: process.env.EMAIL_SENDER_SENDGRID,
    subject: "Login de usuario en API Disney FranMassello",
    text: `Hola, ${username}!, Gracias por usar la API de Disney. Recuerda que para usar la API tienes que agregar un Header en cada request que hagas, key: x-access-token  value: JWT token generado con login o registro. `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Login email sent to " + email);
    })
    .catch((error) => {
      console.log(error.response.body);
    });
}

module.exports = {
  registerInitialEmail,
  loginEmail,
};
