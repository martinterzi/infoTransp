//crear token
const jwt = require('jsonwebtoken');
// le paso la data con la que genero el token, en este caso el id del usuario(ouede ser mas de una data)
const generarJWT = async (uid)=>{

    return new Promise ((resolve, reject)=>{

        
    const payload = {
        uid
    };
     //sign genera la firma, con la data pasada(uid), la plabra secreta
    jwt.sign(payload, process.env.JWT_SECRET,{
        //expira en 12 horas
        expiresIn:'12H'
    }, (err, token)=>{
        //si hay error reject y sino devuelve token
        if(err){
            console.log(err);
            reject('No se pudo generar JWT')
        } else {
            resolve (token)
        }

    }

    )

    });


}


module.exports={
    generarJWT
}
