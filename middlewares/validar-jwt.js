// valaidar la pagina, leyendo token enviado en el header
//Los middlewares llevan next
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next)=>{

    //leer token
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg:'No hay token en la petision'
        })
    }

    //Existe token, ahora a verificar JWT
    try {
        //toma el token del heaser, atraves del verify, mas la palabra secreta chequea
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        // si esta ok imprime uid
        // le agrego a la request el uid me servira para compratir info de quien solicito
        req.uid = uid;
        

    next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg:'Token NO VALIDO'
        })
        
    }




}


module.exports ={
    validarJWT
}