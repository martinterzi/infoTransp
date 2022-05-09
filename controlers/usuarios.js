const {response}= require('express');
const bcrypt =require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

//importar el modelo Usuario
const Usuario = require('../models/usuario');






const getUsuarios = async (req, res)=>{
 
    //paginacion
    // tomo el query en caso de no tener || 0
    const desde = Number (req.query.desde) || 0;
    
    // encierro en la promesa la busqueda y el conteo

    //busca los usuarios del modelo, que a su vez se conecta con la tabla
                                // genero filto con las llaves, y solo me va a traer lo solicitado entre''
    const [usuarios, total] = await Promise.all([
        Usuario
                .find({}, 'nombre email role google img')
                .skip(desde)      //skip se salta usuarios segun desde
                .limit(5),         // limite por pag
        // cuenta la cantidad de usuarios de la tabla
        Usuario.countDocuments()

    ])
                           
    res.json({
        ok:true,
        usuarios,
        total
        
    });

}

const crearUsuarios = async (req, res=response)=>{
   // segrego la info para utilizar email y pass
    const { email, password} = req.body

    try {
        //busca email igual en tabla
    const existeEmail= await Usuario.findOne({email});

    if(existeEmail){
        return res.status(400).json({
            ok: false,
            msg: ' El correo ya esta registrado'
        })
    }

         //envio de datos
    const usuario = new Usuario(req.body);

    //encriptar pass
    //crea data de forma aleateoria
    const salt = bcrypt.genSaltSync();
    //cifrado 
    usuario.password= bcrypt.hashSync(password, salt)

    //grabar en base de datos
    await usuario.save();
    // crea el usuario, y seguido llamar a la funcion de helpers para generar jwt
    const token = await generarJWT ( usuario.id);

    res.json({
        ok:true,
        usuario,
        token
        
    });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:' Error inesperado'
        })
    }
   

}

const actualizarUsuarios  = async (req, res=response)=>{
    // el id que viene como parametro
    const uid = req.params.id;

    try {
       // encontrar usuario por id
        const usuarioDB = await Usuario.findById(uid);
        // sino existe usuario
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:' no existe usuario'
            })
        }
        //actualizar
        const {password, google, email,...campos} = req.body;
        // si al  email que estoy enviando, no es igual al que viene de la base
        if(usuarioDB.email !== email){
            
            //cheque que el email no exista
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg:"ya existe email"
                })
            }

        }


        
        
        campos.email= email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos)


        res.json({
            ok:true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            masg: 'error inesperado'
        })
        
    }




}

const borrarUsuarios = async (req, res=response)=>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        // sino existe usuario
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg:' no existe usuario'
            })
        }

        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg:"user eliminado"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            masg: 'error inesperado'
        })
        
    }
    
}

module.exports={
    getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuarios
}