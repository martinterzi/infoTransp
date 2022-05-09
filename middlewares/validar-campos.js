const {response} = require('express');
const {validationResult}= require('express-validator');

//Los middlewares llevan next
const validarCampos = (req, res= response, next) =>{

    // atraves de validationresult veo los errores
    const errores = validationResult(req);
    // si hay error en validarcion
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        })
    }
    // si esta todo ok next
    next();

}


module.exports={ validarCampos}