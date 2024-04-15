import Empleado from '../models/Empleado.js'

const crearEmpleado = async (req, res) => {
  // Crear Nuevo Paciente
  const empleado = new Empleado(req.body);
  try {
    // Guardar en la db
    const empleadoAlmacenado = await empleado.save();
    res.status(200).json(empleadoAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerEmpleados = async (req, res) => {
  try {
    const listaEmpleados = await Empleado.find()
      .where("empleados")
      .equals(req.empleado);
    return res.status(200).json(listaEmpleados);
  } catch (error) {
    console.log(error);
    const e = new Error("Error en el servidor");
    return res.status(404).json({ msg: e.message });
  }
};

 const obtenerEmpleado = async (req, res) => {
   try {
     const { id } = req.params;
     const empleado = await Empleado.findById(id);


     if (empleado) {
       return res.status(200).json(empleado);
     }
   } catch (error) {
     console.log(error);
   }
 };

 const acutalizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono, rol } =
      req.body;

    // Construccion del objeto
    const infoEmpleado = {
      nombre,
      apellido,
      correo,
      telefono,
      rol,
    };
    const empleado = await Empleado.findByIdAndUpdate(id, infoEmpleado, {new: true});

    if (!empleado) {
      return res.status(404).json({ msg: "Empleado no encontrado" });
    }

    const empleadoActualizado = await empleado.save();
    res.status(200).json(empleadoActualizado);
  } catch (error) {
    console.log(error);
  }
};

 const eliminarEmpleado = async (req, res) => {
   try {
     const { id } = req.params;

     const empleado = await Empleado.findById(id);

     if (!empleado) {
       return res.status(404).json({ msg: "Empleado no encontrado" });
     }


     await empleado.deleteOne();
     return res.status(200).json({msg: "Empleado Eliminado"});
   } catch (error) {
     console.log(error);
   }
 };

export {
  crearEmpleado,
  obtenerEmpleados,
  eliminarEmpleado,
  obtenerEmpleado,
  acutalizarEmpleado,
};
