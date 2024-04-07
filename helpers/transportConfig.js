import nodemailer from "nodemailer";

const configurarTransporte = async (datos) => {
    var transport = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });
    };

    export default configurarTransporte;