
//path /todo/id


const { Router } = require('express');

const{getTodo, getColeccion}= require('../controlers/busquedas')

const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();
// path/ chequear token => llama a getUsuarios
router.get('/:busqueda',validarJWT, getTodo );

router.get('/coleccion/:tabla/:busqueda',validarJWT, getColeccion );


module.exports = router;