import mongoose from 'mongoose';
import bycript from 'bcrypt';
import generarId from '../helpers/generarId';

const empleadoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    telefono: {
        type: Number,
        default: null,
        trim: true,
    },
    rol: {
        type: String,
        required: true,
        trim: true,
    },

});

const Empleado = mongoose.model("Empleado", empleadoSchema);

export default Empleado;