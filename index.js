import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usuarioRouter from './routes/usuarioRoute.js';
import empleadoRouter from './routes/empleadoRoute.js';
import servicioRouter from './routes/servicioRoute.js';
import cotizacionRouter from './routes/cotizacion.js';
import fileUpload from 'express-fileupload';

const app = express();

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

dotenv.config();

conectarDB();

//const dominiosPermitidos = [process.env.FRONTEND_URL];
/**
 * function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) !== -1) {

            callback(null, true)
        } else {
            callback(new Error('No esta permitido por CORS'));
        }
    }
 */

const dominiosPermitidos = ['*'];
const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use('/api/usuarios', usuarioRouter);
app.use('/api/empleados', empleadoRouter);
app.use('/api/servicios', servicioRouter);
app.use('/api/cotizaciones', cotizacionRouter);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Express conectado desde el puerto: ${PORT}`);
})