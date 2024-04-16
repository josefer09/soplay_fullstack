import express from 'express';
import { crearCotizacion, obtenerCotizaciones, obtenerCotizacion, actualizarCotizacion, eliminarCotizacion, } from '../controllers/Cotizacion.js'
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route("/")
  .post(crearCotizacion)
  .get(checkAuth, obtenerCotizaciones)

router
.route("/:id")
.delete(checkAuth, eliminarCotizacion)
.get(checkAuth, obtenerCotizacion)
.put(checkAuth, actualizarCotizacion)


export default router;