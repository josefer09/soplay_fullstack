import express from 'express';
import { crearEmpleado, obtenerEmpleados, eliminarEmpleado } from '../controllers/Empleado.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route("/")
  .post(checkAuth, crearEmpleado)
  .get(checkAuth, obtenerEmpleados)

router
.route("/:id")
.delete(checkAuth, eliminarEmpleado)


export default router;
