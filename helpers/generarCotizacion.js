import nodemailer from "nodemailer";
import configurarTransporte from "./transportConfig.js";

const generarCotizacion = async (datos, nombreFoto) => {
  var transport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
  });

 


  const {email, nombre, token, nombre_empresa, correo, telefono, servicio, descripcion, foto} = datos;

  // Enviar el email

  try {
    const info = await transport.sendMail({
      from: '"CSY - Aplicación de Cotizacion SOPLAY" <CSY@correo.com>',
      to: process.env.EMAIL_TO,
      subject: "Nueva Cotizacion",
      text: 'Se ha realizado una cotizacion',
      html: `<p>El cliente: ${nombre}, ha solicitado la siguiente cotizacion.</p>
      <p>Nombre de la empresa: ${nombre_empresa}</p>
      <p>Correo del cliente: ${correo}</p>
      <p>Telefono del cliente: ${telefono}</p>
      <p>Servicio que solicita el cliente: ${servicio}</p>
      <p>El cliente comenta que: ${descripcion}</p>
      <img src="cid:imagen" />
      `,
       attachments: [
         {
           filename: 'imagen.jpg',
           path: `./uploads/${nombreFoto}`,
           cid: 'imagen'
         }
       ],
    });
  
    console.log("Mensaje enviado: %S", info.messageId);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default generarCotizacion;
