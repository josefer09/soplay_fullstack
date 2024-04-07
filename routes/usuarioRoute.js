import express from 'express';
import { autenticar, confirmar, olvidePassword, registrar } from '../controllers/Usuario.js';

const router = express.Router();

// Area publica
router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/autenticar', autenticar);
router.post('/olvide-password', olvidePassword);

export default router;
