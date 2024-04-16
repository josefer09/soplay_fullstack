import emailRegistro from "../helpers/emailRegistro.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";


const registrar = async (req, res) => {
    const {email, nombre} = req.body; //Verificar si existe
    const usuarioExiste = await Usuario.findOne({email});

    if(usuarioExiste) {
        const error = new Error('Empleado ya registrado');
        return res.status(400).json({msg: error.message});
    }

    try {
        // Registrar Empleado
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        // Enviar el email
        emailRegistro({
            email,
            nombre,
            token: usuarioGuardado.token,
        });

        return res.json(usuarioGuardado);
        
    } catch (error) {
        console.log(error);
    };
};

const perfil = (req, res) => {
    const {usuario} = req;
    res.json(usuario);
};

const confirmar = async (req, res) => {
    console.log(req.params.token);

    const {token} = req.params;

    const confirmarUsuario = await Usuario.findOne({token});

    if(!confirmarUsuario) {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }

    try {
        // Cambiando los datos del usuario una vez que se confirme
        confirmarUsuario.token = null;
        confirmarUsuario.confirmado = true;
        await confirmarUsuario.save();

        res.json({msg: 'Cuenta Confirmada'});
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const {email, password} = req.body;

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({email});

    if(!usuario) {
        const error = new Error("El Usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    //Comprovar que el usuario a confirmado la cuenta
    if(!usuario.confirmado) {
        const error = new Error("Tu Cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message});
    }

    // Autentirar la contrasena
    if (await usuario.comprobarPassword(password)) {
        // Autenricar
        res.json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
            folio: usuario.folio,
        });
    } else {
        const error = new Error('La Password es incorrecta');
        return res.status(403).json({msg: error.message});
    }
};

const olvidePassword = async (req, res) => {
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(!existeUsuario) {
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        existeUsuario.token = generarId();
        existeUsuario.save();
        // Enviar email con las instrucciones
        emailOlvidePassword({
            email,
            nombre: existeUsuario.nombre,
            token: existeUsuario.token,
        });
        res.json({
            msg: "Hemos enviado un email a su correo con las instrucciones",
        });
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const tokenValido = await Usuario.findOne({token});

    if(tokenValido) {
        res.status(200).json({msg: "Token valido y el usuario existe"});
    } else {
        const error = new Error('Token Invalido');
        return res.statuts(400).json({msg: error.message});
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
      const listaUsuarios = await Usuario.find();
      return res.status(200).json(listaUsuarios);
    } catch (error) {
      console.log(error);
      const e = new Error("Error en el servidor");
      return res.status(404).json({ msg: e.message });
    }
  };
  
   const obtenerUsuario = async (req, res) => {
     try {
       const { id } = req.params;
       const usuario = await Usuario.findById(id);
  
  
       if (usuario) {
         return res.status(200).json(usuario);
       }
     } catch (error) {
       console.log(error);
     }
   };
  
   const actualizarPerfil = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      const error = new Error("Hubo un error");
      return res.status(404).json({ msg: error.message });
    }
  
    const { email } = req.body;
    // Veterinario intenta cambiar su email, validacion
    if (usuario.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        const error = new Error("Ese Email ya esta en uso");
        return res.status(400).json({ msg: error.message });
      }
    }
  
    try {
      usuario.nombre = req.body.nombre; // Si no esta presente el nombre, asignale el que ya esta en la db para no perder nada de campos
      usuario.email = req.body.email;
      usuario.folio = req.body.folio;
      usuario.telefono = req.body.telefono;
  
      const usuarioActualizado = await usuario.save();
      res.json(usuarioActualizado);
      return;
    } catch (error) {
      console.log(error);
    }
  };
  
   const eliminarUsuario = async (req, res) => {
     try {
       const { id } = req.params;
  
       const usuario = await Usuario.findById(id);
  
       if (!usuario) {
         return res.status(404).json({ msg: "Usuario no encontrado" });
       }
  
  
       await usuario.deleteOne();
       return res.status(200).json({msg: "Usuario Eliminado"});
     } catch (error) {
       console.log(error);
     }
   };

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    actualizarPerfil,
    eliminarUsuario,
    obtenerUsuario,
    obtenerUsuarios,
}