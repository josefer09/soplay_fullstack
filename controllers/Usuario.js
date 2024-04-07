import emailRegistro from "../helpers/emailRegistro";
import generarId from "../helpers/generarId";
import generarJWT from "../helpers/generarJWT";
import Usuario from "../models/Usuario";
import emailOlvidePassword from "../helpers/emailOlvidePassword";


const registrar = async (req, res) => {
    const {correo, nombre} = req.body; //Verificar si existe
    const usuarioExiste = await Usuario.findOne({correo});

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
        return res.tatus(403).json({msg: error.message});
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

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
}