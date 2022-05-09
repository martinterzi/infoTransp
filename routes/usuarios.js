//Ruta : /api/usuarios


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controlers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();
// path/ chequear token => llama a getUsuarios
router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        //chequear(objeto, msg de error).validacion
        check('nombre', ' El nombre es obligatorio').not().isEmpty(),
        check('password', ' El password es obligatorio').not().isEmpty(),
        check('email', ' El email es obligatorio').isEmail(),
        validarCampos //chequea que no haya errores en la validaciones
    ]
    , crearUsuarios);


router.put('/:id',
    [    //cheque token
        validarJWT,
        //chequear(objeto, msg de error).validacion
        check('nombre', ' El nombre es obligatorio').not().isEmpty(),
        check('email', ' El emaiñ es obligatorio').isEmail(),
        check('role', ' El role es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , actualizarUsuarios);

router.delete('/:id', validarJWT, borrarUsuarios);





module.exports = router;