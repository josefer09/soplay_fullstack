import mongoose from 'mongoose';

const servicioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        required: true,
        trim: true,
    },
    precioMin: {
        type: Number,
        default: null,
        trim: true,
    },

});

const Servicio = mongoose.model("Servicio", servicioSchema);

export default Servicio;