// Path: /api/login


const {Router} = require('express');
const {login, googleSignIn, renewToken, recPass}= require ('../controlers/auth')
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT}=require('../middlewares/validar-jwt');


const router = Router();



router.post('/', 
[
    //chequear(objeto, msg de error).validacion
    check('email', ' Email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos //se fija si surgen errores del chek
],
login
);

router.put('/recpass', 
[    /*
    //chequear(objeto, msg de error).validacion
    check('email', ' Email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos //se fija si surgen errores del chek*/
],
recPass
);


router.post('/google', 
[
    //chequear(objeto, msg de error).validacion
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos //se fija si surgen errores del chek
],
googleSignIn
)




router.get('/renew', 
validarJWT,
renewToken
)












module.exports= router;