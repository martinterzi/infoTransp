// Path : '/api/unidades'



const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const{getUnidades, borrarUnidad, editarUnidad, crearUnidad}= require('../controlers/unidades')

const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/', getUnidades );

router.post('/',
    [
        validarJWT,
        check('patente', 'Patente es necesario').not().isEmpty(),
        validarCampos
    ]
    , crearUnidad);


router.put('/:id',
    [   
        validarJWT ,
        check('patente', 'Patente es necesario').not().isEmpty(),
        validarCampos
    ]
    ,editarUnidad );

router.delete('/:id',validarJWT, borrarUnidad );





module.exports = router;