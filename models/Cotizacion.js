import mongoose from 'mongoose';

const cotizacionSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    nombre_empresa: {
        type: String,
        required: true,
        trim: true,
    },
    correo: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: Number,
        required: true,
        trim: true,
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servicio', // Referencia al modelo Servicio
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    foto: {
        type: String,
        trim: true,
    },
    estado: {
        type: Boolean,
        default: false
    },
});

const Cotizacion = mongoose.model("Cotizacion", cotizacionSchema);

export default Cotizacion;