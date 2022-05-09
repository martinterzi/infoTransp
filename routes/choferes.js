//Ruta : /api/choferes


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const{getChoferes, editarChofer, crearChofer, borrarChofer}= require('../controlers/choferes')

const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();
// path/ chequear token => llama a getUsuarios
router.get('/', getChoferes );

router.post('/',
    [ validarJWT,
        check('nombre', 'Nombre es obiligatorio').not().isEmpty(),
        check('dni', 'DNI es obiligatorio').not().isEmpty(),
        //cheque si el id corresponde a la base mongo
        check('unidad', 'Unidad id no valida').isMongoId(),
        validarCampos

    ]
    , crearChofer);


router.put('/:id',
    [    validarJWT,
        check('nombre', 'Nombre es obiligatorio').not().isEmpty(),
        check('dni', 'DNI es obiligatorio').not().isEmpty(),
        //cheque si el id corresponde a la base mongo
        check('unidad', 'Unidad id no valida').isMongoId(),
        validarCampos
    ]
    , editarChofer);

router.delete('/:id', validarJWT,borrarChofer);





module.exports = router;