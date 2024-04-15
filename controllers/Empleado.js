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

//  const actualizarPaciente = async (req, res) => {
//    try {
//      const { id } = req.params;
//      const { veterinario, nombre, propietario, email, fecha, sintomas } =
//        req.body;

//     // Construccion del objeto
//     const infoPaciente = {
//       nombre,
//       propietario,
//       email,
//       fecha,
//       sintomas,
//       veterinario,
//     };
//     const paciente = await Paciente.findByIdAndUpdate(id, infoPaciente, {new: true});

//     if (!paciente) {
//       return res.status(404).json({ msg: "Paciente no encontrado" });
//     }

//     if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
//       const e = new Error("Acción no valida");
//       return res.status(403).json({ msg: e.message });
//     }

//     const pacienteActualizado = await paciente.save();
//     res.status(200).json(pacienteActualizado);
//   } catch (error) {
//     console.log(error);
//   }
// };

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
};
