const Usuario = require('../models/usuario');
const Chofer = require('../models/chofer');
const Unidad = require('../models/unidad');
const fs = require('fs');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

}


const actualizarImagen = async (tipo, id, nombreArchivo) => {

    switch (tipo) {
        case 'choferes':
            const chofer = await Chofer.findById(id);
            if (!chofer) {
                return false;
            }
            // si el chofer existe, traigo la ruta de la imagen
            const pathViejo = `./uploads/choferes/${chofer.img}`;
            //si existe, con fs.unlink borro, para que en la memoria no queden imagenes inecesarias y cargo la nueva imagen
            borrarImagen(pathViejo);
            // le agrego la nueva imagen
            chofer.img = nombreArchivo;
            //guardo los cambios
            await chofer.save();

            return true;

            break;


        case 'unidades':
            const unidad = await Unidad.findById(id);
            if (!unidad) {
                return false;
            }
            // si el chofer existe, traigo la ruta de la imagen
            const pathVie = `./uploads/unidades/${unidad.img}`;
            //si existe, con fs.unlink borro, para que en la memoria no queden imagenes inecesarias y cargo la nueva imagen
            borrarImagen(pathVie);
            // le agrego la nueva imagen
            unidad.img = nombreArchivo;
            //guardo los cambios
            await unidad.save();

            return true;
            break;


        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            // si el chofer existe, traigo la ruta de la imagen
            const pathViej = `./uploads/usuarios/${usuario.img}`;
            //si existe, con fs.unlink borro, para que en la memoria no queden imagenes inecesarias y cargo la nueva imagen
            borrarImagen(pathViej);
            // le agrego la nueva imagen
            usuario.img = nombreArchivo;
            //guardo los cambios
            await usuario.save();

            return true;

        
            break;


    }


}




module.exports = {
    actualizarImagen
}