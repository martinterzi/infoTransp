const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4 : uuidv4 } = require ('uuid');
const {actualizarImagen}= require ('../helpers/actualizar-imagen');
const { fstat } = require('fs');




const fileUpload = async (req, res = response) => {
    // recibo nombre de tabla y id 
    const tipo = req.params.tipo;
    const id = req.params.id;

    // validad tipo, es decir si coincide con algunas de las tablas existentes
    // creo arreglo con las tablas
    const tiposValidos = ['choferes', 'unidades', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: ' El tipo no es chofer, usuario o unidad'
        })
    }
    // sino existe ningun archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: ' No hay ningun archivo'
        });
    }

    //procesar img
    //accedo al files gracias expressfileup cargado en la ruta
    // imagen es el nombre que le doy en la key 
    const file = req.files.imagen;

    //conseguir el tipo de extencion del archivo
    // primero lo separo por el .
    const nombreCortado = file.name.split('.');
    //separo el archivo en 2, con el length -1 elijo del punto en adelante
    const extensionArchivo = nombreCortado [nombreCortado.length - 1];


    //validar extencion
    const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extencionesValidas.includes(extensionArchivo)) {
        res.status(400).json({
            ok: false,
            msg: ' El tipo de imagen tiene que ser png, jpg,jpeg, gif '
        })
    }

    //generar nombre archivo
    // atraves de uuid genera un nombre de archivo aleatoreo y le agrego la extension
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })

            actualizarImagen(tipo, id, nombreArchivo);


        res.json({
            ok: true,
            msg: ' fileupload',
            nombreArchivo
        })


    });


};


const retornarImagen = (req, res = response)=>{
    // recibo nombre de foto y tipo 
    const foto = req.params.foto;
    const tipo = req.params.tipo;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }
    else {
        const pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
        res.sendFile(pathImg);
    }

    
}


module.exports = {
    fileUpload, retornarImagen
}