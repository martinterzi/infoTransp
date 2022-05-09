//path /upload/usuario/id


const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const{fileUpload, retornarImagen}= require('../controlers/uploads')

const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();
// path/ chequear token => llama a getUsuarios
// para cargar archivos
router.use(expressfileUpload());

router.put('/:tipo/:id',validarJWT, fileUpload );

router.get('/:tipo/:foto', retornarImagen );


module.exports = router;