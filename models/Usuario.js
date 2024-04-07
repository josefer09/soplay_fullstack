import mongoose from "mongoose";
import bycript from "bcrypt";
import generarId from "../helpers/generarId.js";

const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  folio: {
    type: String,
    default: null,
    trim: true,
  },
  token: {
    type: String,
    default: function () {
      return generarId();
    },
  },
  confirmado: {
    type: Boolean,
    default: null,
  },
});

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bycript.genSalt(10);
  this.password = await bycript.hash(this.password, salt);
});

UsuarioSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await bycript.compare(passwordFormulario, this.password); // el compare retorna true o false
};

const Usuario = mongoose.model("Usuario", UsuarioSchema);
export default Usuario;
  