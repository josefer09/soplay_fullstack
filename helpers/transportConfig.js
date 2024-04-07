import nodemailer from "nodemailer";

const configurarTransporte = () => {
    return nodemailer.createTransport({
        service: process.env.MAILER_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });
    };

    export default configurarTransporte;