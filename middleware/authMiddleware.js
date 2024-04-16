import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const checkAuth = async (req, res, next) => {
  let token;
  // Comprobamos que haya algun token con el Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Practicamente decimos que lo que obtengo lo va a dividir cuando haya un espacio, esto dara como resultado un arreglo, el Bearer en la posicion 0 y el token en la 1, por eso la sintaxis

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.usuario = await Usuario.findById(decode.id).select(
        "-password -token -confirmado"
      );

      return next();
    } catch (error) {
      const e = new Error("Token no valido");
      return res.status(403).json({ msg: e.message });
    }
  }

  if (!token) {
    const error = new Error("Token no valido o inexistente");
    return res.status(403).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
