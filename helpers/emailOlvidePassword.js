import nodemailer from "nodemailer";
import configurarTransporte from "./transportConfig.js";
const emailOlvidePassword = async (datos) => {
    const transport = configurarTransporte();


  const {email, nombre, token} = datos;

  // Enviar el email

  const info = await transport.sendMail({
    from: '"APV - Administrador de Pacientes de Veterinaria" <apv@correo.com>',
    to: email,
    subject: "Restablezca su contraseña",
    text: 'Restablezca su contraseña',
    html: `<p>Hola: ${nombre}, haz solicitado restablecer su contraseña.</p>
    <P>Sigue el siguiente enlace para generar su nueva contraseña:
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Comprobar Cuenta</a></P>

    <p>Si tu no creaste esta cuenta, ignora este mensaje</p>
    `,
  });

  console.log("Mensaje enviado: %S", info.messageId);
};

export default emailOlvidePassword;
