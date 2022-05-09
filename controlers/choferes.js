const {response}= require('express');

const Chofer = require('../models/chofer');


const getChoferes =async(req, res= response)=>{

    const choferes = await Chofer.find()
                    // populate relaciona con la tabla relacionada en este caso usuario
                        // populate('usuario') te trae todda la data
                        // populate ('usuario', 'nombre') solo el id y nombre
                    .populate('usuario', 'nombre')

    res. json({
        ok: true,
        msg:' getChoferes',
        choferes
    })
};

const crearChofer =async(req, res= response)=>{
    // El uid viene de la validadcion de token
    const uid = req.uid;
    console.log(req.body)
    // data enviada, ya validado, le agrego el valor a usuario
    const chofer = new Chofer ({usuario:uid, ...req.body});
    console.log(chofer)
    

    try {
        // enviar data para grabar
        await chofer.save();

        res. json({
            ok: true,
            msg:' creararUnidad',
            chofer
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
        
    }


};

const editarChofer =async(req, res= response)=>{
    
        // el id del chofer que viene como parametro
        const id = req.params.id;
        // viene el uid por el mid validar jwt uid del usuario
        const uid = req.uid;
    
        try {
            // busco el id en la tabla de unidad
            const chofer = await Chofer.findById(id);
    
            if (!chofer) {
                res.status(404).json({
                    ok: false,
                    msg: ' Id no encontrado en base de choferes',
                    
                })
            }
            
            //guardo en la constante los datos enviados, mas uid del usuario
            const cambiosChofer ={
                ...req.body,
                usuario:uid
            }
            // envio id de la unidad a actualizar, data , { me devuelve la info actualizada}
            const choferActualizado = await Chofer.findByIdAndUpdate(id, cambiosChofer, {new:true})
    
            res.json({
                ok: true,
                msg: ' Editar choferes',
                choferActualizado
            })
    
        } catch (error) {
    
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            })
    
        }
    
    
    
};

const borrarChofer =async(req, res= response)=>{
      // el id que viene como parametro
      const id = req.params.id;
      
  
      try {
          // busco el id en la tabla de unidad
          const chofer = await Chofer.findById(id);
  
          if (!chofer) {
              res.status(404).json({
                  ok: false,
                  msg: ' Id no encontrado en base de Choferes'
              })
          }
  
        
           await Chofer.findByIdAndDelete(id);
  
          res.json({
              ok: true,
              msg: ' Chofer Borrada'
              
          })
  
      } catch (error) {
  
          res.status(500).json({
              ok: false,
              msg: 'Hable con el administrador'
          })
  
      }
};


module.exports={
    getChoferes, borrarChofer, editarChofer, crearChofer
}