import express from 'express';
import { autenticar, confirmar, olvidePassword, registrar, perfil, actualizarPerfil, eliminarUsuario, obtenerUsuario, obtenerUsuarios } from '../controllers/Usuario.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/autenticar', autenticar);
router.post('/olvide-password', olvidePassword);

// Area privada
router.get('/perfil', checkAuth, perfil);
router.get('/perfil/:id', checkAuth, obtenerUsuario);
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.delete('/perfil/:id', checkAuth, eliminarUsuario);


export default router;
