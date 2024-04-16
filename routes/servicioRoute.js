import express from 'express';
import { crearServicio, obtenerServicios, eliminarServicio, obtenerServicio, actualizarServicio } from '../controllers/Servicio.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route("/")
  .post(checkAuth, crearServicio)
  .get(checkAuth, obtenerServicios)

router
.route("/:id")
.delete(checkAuth, eliminarServicio)
.get(checkAuth, obtenerServicio)
.put(checkAuth, actualizarServicio)


export default router;
