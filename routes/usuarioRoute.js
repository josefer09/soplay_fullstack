import express from 'express';
import { autenticar, confirmar, olvidePassword, registrar, perfil } from '../controllers/Usuario.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/autenticar', autenticar);
router.post('/olvide-password', olvidePassword);

// Area privada
router.get('/perfil', checkAuth, perfil);

export default router;
