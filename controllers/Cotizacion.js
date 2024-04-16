import Cotizacion from '../models/Cotizacion.js';
import Servicio from '../models/Servicio.js';
import generarCotizacion from '../helpers/generarCotizacion.js';

const crearCotizacion = async (req, res) => {
  // Crear Nuevo Paciente
  const cotizacion = new Cotizacion(req.body);
  try {
    // Guardar en la db
    const cotizacionAlmacenada = await cotizacion.save();

    // Cambiar id por nombre:
    const servicio = await Servicio.findById(cotizacionAlmacenada.servicio);

    // Modificando la cotizacion para incluir el nombre
    const cotizacionConServicioNombre = {
        ...cotizacionAlmacenada.toObject(),
        servicio: servicio.nombre // Modifica el valor
    };

    // Enviar correo
    generarCotizacion(cotizacionConServicioNombre);

    res.status(200).json(cotizacionConServicioNombre);
  } catch (error) {
    console.log(error);
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
