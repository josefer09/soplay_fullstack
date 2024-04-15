import express from 'express';
import { crearEmpleado, obtenerEmpleados } from '../controllers/Empleado.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route("/")
  .post(checkAuth, crearEmpleado)
  .get(checkAuth, obtenerEmpleados)


export default router;
