import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/usuarioRoute.js';

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

app.use('/api/usuarios', usuarioRouter)


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Express conectado desde el puerto: ${PORT}`);
})