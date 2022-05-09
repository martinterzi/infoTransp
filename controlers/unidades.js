const { response } = require('express');

const Unidad = require('../models/unidad');


const getUnidades = async (req, res = response) => {
    // trae la info de la base unidad
    const unidades = await Unidad.find()
        // populate relaciona con la tabla relacionada en este caso usuario
        // populate('usuario') te trae todda la data
        // populate ('usuario', 'nombre') solo el id y nombre
        .populate('usuario', 'nombre')


    res.json({
        ok: true,
        msg: ' getUnidades',
        unidades
    })
};

const crearUnidad = async (req, res = response) => {
    // El uid viene de la validadcion de token
    const uid = req.uid;

    // data enviada, ya validado, le agrego el valor a usuario
    const unidad = new Unidad({ usuario: uid, ...req.body });


    try {
        // enviar data para grabar
        await unidad.save();

        res.json({
            ok: true,
            msg: ' creararUnidad',
            unidad
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })

    }



};

const editarUnidad = async (req, res = response) => {
    // el id que viene como parametro
    const id = req.params.id;
    // viene el uid por el mid validar jwt
    const uid = req.uid;

    try {
        // busco el id en la tabla de unidad
        const unidad = await Unidad.findById(id);

        if (!unidad) {
            res.status(404).json({
                ok: false,
                msg: ' Id no encontrado en base de Unidades'
            })
        }

        //guardo en la constante los datos enviados, mas uid del usuario
        const cambiosUnidad ={
            ...req.body,
            usuario:uid
        }
        // envio id de la unidad a actualizar, data , { me devuelve la info actualizada}
        const unidadActualizado = await Unidad.findByIdAndUpdate(id, cambiosUnidad, {new:true})

        res.json({
            ok: true,
            msg: ' editarUnidad',
            unidadActualizado
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }


};

const borrarUnidad = async(req, res = response) => {

      // el id que viene como parametro
      const id = req.params.id;
      
  
      try {
          // busco el id en la tabla de unidad
          const unidad = await Unidad.findById(id);
  
          if (!unidad) {
              res.status(404).json({
                  ok: false,
                  msg: ' Id no encontrado en base de Unidades'
              })
          }
  
        
           await Unidad.findByIdAndDelete(id);
  
          res.json({
              ok: true,
              msg: ' Unidad Borrada'
              
          })
  
      } catch (error) {
  
          res.status(500).json({
              ok: false,
              msg: 'Hable con el administrador'
          })
  
      }
    
};


module.exports = {
    getUnidades, borrarUnidad, editarUnidad, crearUnidad
}