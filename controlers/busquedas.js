const { response } = require('express');
const Usuario = require('../models/usuario');
const Chofer = require('../models/chofer');
const Unidad = require('../models/unidad');

const getTodo = async (req, res = response) => {

    const todo = req.params.busqueda;
    // hago la busqueda 'i' = incensible, busqueda parcial
    const regEx = new RegExp(todo, 'i')
    // busco en tabla usuario donde nombre sea igual a parametro o busqueda incensible



    const [usuarios, unidades, choferes] = await Promise.all([
        Usuario
            .find({ nombre: regEx }),

        // cuenta la cantidad de usuarios de la tabla
        Chofer
            .find({ nombre: regEx }),

        Unidad
            .find({ patente: regEx }),

    ])






    res.json({
        ok: true,
        msg: ' getBusqueda',
        todo,
        usuarios,
        choferes,
        unidades
    })
};

const getColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;

    const busqueda = req.params.busqueda;
    // hago la busqueda 'i' = incensible, busqueda parcial
    const regEx = new RegExp(busqueda, 'i')
    // busco en tabla usuario donde nombre sea igual a parametro o busqueda incensible
    let data = [];
    // depende valor busca en determinada tabla
    switch (tabla) {
        case 'choferes':
            data = await Chofer.find({ nombre: regEx });
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regEx });
            break;
        case 'unidades':
            data = await Unidad.find({ patente: regEx });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: ' La tabla tiene que ser de usuarios/choferes/unidades'
            });

    }

    res.json({
        ok: true,
        msg: ' ok',
        data

    });


};

module.exports = {
    getTodo, getColeccion
}