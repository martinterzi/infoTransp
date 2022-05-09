const { response } = require('express');
const nodemailer = require('nodemailer');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res) => {
    // req.body es la data que viene de los datos ingresados, ya pasa por la validacion
    const { email, password } = req.body;


    try {
        //cheque email de la bd de tabla Usuario, atraves de la coneccion models.Usuario
        const usuariosDB = await Usuario.findOne({ email });

        if (!usuariosDB) {
            return res.status(404).json({
                ok: false,
                msg: ' Contraseña o email no encontrados'
            })
        }
        // si existe email, usuarioDB tare toda la data
        //chequear contraseña, compara password del req.body, con la de la tabla
        const validarContraseña = bcrypt.compareSync(password, usuariosDB.password);

        if (!validarContraseña) {
            return res.status(400).json({
                ok: false,
                msg: ' Contraseña o email no encontrados'
            })
        }
        // Login ok
        //Generar token
        // llamo ala promesa de helpers generarjwt enviandole el id
        const token = await generarJWT(usuariosDB.id);

        res.json({
            ok: true,
            token

        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }



}

const recPass = async (req, res) => {
    // req.body es la data que viene de los datos ingresados, ya pasa por la validacion
    const { email } = req.body;

    try {
        //busca email igual en tabla
        const usuarioPorEmail = await Usuario.findOne({ email });
        const { _id, password } = usuarioPorEmail;
        const uid =  JSON.stringify(_id)


        var min = 100000;
        var max = 999999;

        var x =  Math.floor(Math.random() * (max - min + 1) + min);
        let xstri = x.toString();

        console.log(x);
        console.log(_id)
        console.log(uid)
        console.log(xstri)
        console.log(usuarioPorEmail)
        console.log(password)
         

        var transporte = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "recuperopassacqua@gmail.com",
                pass: "rivv tjjl cnlg uwvj"
            },

            tls: {
                rejectUnauthorized: false
            }

        });



        const info = await transporte.sendMail({
            from: "recuperopassacqua@gmail.com",
            to: `${email}`,
            subject: "CONSULTA",
            text: `Nuevo password ${x}`
        })

        console.log(info.messageId)
        
        //encriptar pass
        //crea data de forma aleateoria
        const salt = bcrypt.genSaltSync();
        //cifrado 
        usuarioPorEmail.password = bcrypt.hashSync(xstri, salt)
        console.log(usuarioPorEmail)
        //grabar en base de datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(_id, usuarioPorEmail)
        
        
        if (!usuarioPorEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no valido'
            })
        }


        res.json({
            ok: true,
            email,
            msg: 'notificacion de pass por email exitosa',
            usuarioActualizado

        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: ' Error inesperado'
        })
    }





}


const googleSignIn = async (req, res = response) => {
    // recibo token de google atraves del body
    const googleToken = req.body.token;



    try {
        //ataves de de la funcion del helpers chequeo que el token sea valido , atraves de la destructuracion traigo name, email, pic
        const { name, email, picture } = await googleVerify(googleToken);
        // chequea si ya existe el email
        const usuarioDb = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDb) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })

        } else {
            //si existe usuario
            usuario = usuarioDb;
            usuario.google = true;


        }

        //guarda usuario
        await usuario.save();

        //Generar token
        // llamo ala promesa de helpers generarjwt enviandole el id
        const token = await generarJWT(usuarioDb.id);

        res.json({
            ok: true,
            msg: ' Google auth',
            token
        })

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: " Token google no valido"
        })

    }




}

const renewToken = async (req, res = response) => {
    // atraves del mid validar token viene por la req el uid;
    const uid = req.uid;

    const token = await generarJWT(uid);

    res.json({
        ok: true,
        token
    })





}

module.exports = {
    login, googleSignIn, renewToken, recPass
}