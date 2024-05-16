import Cotizacion from '../models/Cotizacion.js';
import Servicio from '../models/Servicio.js';
import generarCotizacion from '../helpers/generarCotizacion.js';
import fileUpload from 'express-fileupload';
import {  uploadSingle } from './FileUpload.js';

const crearCotizacion = async (req, res) => {
  try {
    // Crear una nueva instancia de Cotizacion
    const cotizacion = new Cotizacion(req.body);
    
    // Guardar la cotizacion en la base de datos
    const cotizacionAlmacenada = await cotizacion.save();

    // Obtener el nombre del servicio
    const servicio = await Servicio.findById(cotizacionAlmacenada.servicio);

    // Modificar la cotizacion para incluir el nombre del servicio
    const cotizacionConServicioNombre = {
      ...cotizacionAlmacenada.toObject(),
      servicio: servicio.nombre // Modifica el valor
    };

    // Almacenar la foto
    if (req.files && req.files.fotoFile) {
      const file = req.files.fotoFile;
      const uploadPath = `uploads/${file.name}`;
      
      // Mover el archivo al directorio de uploads
      file.mv(uploadPath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error al subir la foto' });
        }
        
        // Enviar correo
        generarCotizacion(cotizacionConServicioNombre, file.name);

        // Enviar respuesta al cliente
        return res.status(200).json({
          cotizacion: cotizacionConServicioNombre,
          foto: uploadPath
        });
      });
    } else {
      return res.status(400).json({ error: 'No se proporcionó ninguna foto' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

const obtenerCotizaciones = async (req, res) => {
  try {
    const listaCotizaciones = await Cotizacion.find()
      .where("cotizacions")
      .equals(req.cotizacion);
    return res.status(200).json(listaCotizaciones);
  } catch (error) {
    console.log(error);
    const e = new Error("Error en el servidor");
    return res.status(404).json({ msg: e.message });
  }
};

 const obtenerCotizacion = async (req, res) => {
   try {
     const { id } = req.params;
     const cotizacion = await Cotizacion.findById(id);


     if (cotizacion) {
       return res.status(200).json(cotizacion);
     }
   } catch (error) {
     console.log(error);
   }
 };

 const actualizarCotizacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, nombre_empresa, correo, telefono, servicio, descripcion,} =
      req.body;

    // Construccion del objeto
    const infoCotizacion = {
      nombre,
      nombre_empresa,
      correo,
      telefono,
      servicio,
      descripcion,
    };
    const cotizacion = await Cotizacion.findByIdAndUpdate(id, infoCotizacion, {new: true});

    if (!cotizacion) {
      return res.status(404).json({ msg: "Cotizacion no encontrado" });
    }

    const cotizacionActualizado = await cotizacion.save();
    res.status(200).json(cotizacionActualizado);
  } catch (error) {
    console.log(error);
  }
};

 const eliminarCotizacion = async (req, res) => {
   try {
     const { id } = req.params;

     const cotizacion = await Cotizacion.findById(id);

     if (!cotizacion) {
       return res.status(404).json({ msg: "Cotizacion no encontrado" });
     }


     const cotizacionEliminada = await cotizacion.deleteOne();
     return res.status(200).json({msg: "Cotizacion Eliminado", res: cotizacionEliminada});
   } catch (error) {
     console.log(error);
   }
 };

export {
    crearCotizacion,
    obtenerCotizaciones,
    obtenerCotizacion,
    actualizarCotizacion,
    eliminarCotizacion,
};
