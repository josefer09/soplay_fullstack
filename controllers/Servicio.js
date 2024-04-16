import Servicio from "../models/Servicio.js";

const crearServicio = async (req, res) => {
    // Crear nuevo servicio
    const servicio = new Servicio(req.body);
    try {
        // Guardar en la db
        const servicioAlmacenado = await servicio.save();
        res.status(200).json(servicioAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerServicios = async (req, res) => {
    try {
        const listaServicios = await Servicio.find()
        .where("servicios")
        .equals(req.servicio);
        return res.status(200).json(listaServicios);
    } catch (error) {
        console.log(error);
        const e = new Erro('Error en el servidor');
        return res.status(404).json({msg: e.message});
    }
};

const obtenerServicio = async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findById(id);
 
 
      if (servicio) {
        return res.status(200).json(servicio);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const actualizarServicio = async (req, res) => {
   try {
     const { id } = req.params;
     const { nombre, descripcion, precioMin} = req.body;
 
     // Construccion del objeto
     const infoServicio = {
       nombre,
       descripcion,
       precioMin,
     };
     const servicio = await Servicio.findByIdAndUpdate(id, infoServicio, {new: true});
 
     if (!servicio) {
       return res.status(404).json({ msg: "Servicio no encontrado" });
     }
 
     const servicioActualizado = await servicio.save();
     res.status(200).json(servicioActualizado);
   } catch (error) {
     console.log(error);
   }
 };
 
  const eliminarServicio = async (req, res) => {
    try {
      const { id } = req.params;
 
      const servicio = await Servicio.findById(id);
 
      if (!servicio) {
        return res.status(404).json({ msg: "Servicio no encontrado" });
      }
 
 
      await servicio.deleteOne();
      return res.status(200).json({msg: "Servicio Eliminado"});
    } catch (error) {
      console.log(error);
    }
  };

  export {
    crearServicio,
    obtenerServicio,
    eliminarServicio,
    obtenerServicios,
    actualizarServicio,
  };
 