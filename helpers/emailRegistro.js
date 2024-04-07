import nodemailer from "nodemailer";
import configurarTransporte from "./transportConfig";

const emailRegistro = async (datos) => {
    const transport = configurarTransporte();


  const {email, nombre, token} = datos;

  // Enviar el email

  const info = await transport.sendMail({
    from: '"SCY - Sistema de Cotizacion SOPLAY" <SCY@correo.com>',
    to: email,
    subject: "Comprueba tu cuenta en CSY",
    text: 'Comprueba tu cuenta en CSY',
    html: `<p>Hola: ${nombre}, comprueba tu cuenta en APV.</p>
    <P>Tu cuenta ya casi esta lista, solo debes comprobarla en el siguiente enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></P>

    <p>Si tu no creaste esta cuenta, ignora este mensaje</p>
    `,
  });

  console.log("Mensaje enviado: %S", info.messageId);
};

export default emailRegistro;
