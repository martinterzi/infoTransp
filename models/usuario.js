const {Schema, model} = require ('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        
    },
    img:{
        type: String,
        
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
        
    }


});

// funcion para filtrar respuesta
UsuarioSchema.method ('toJSON', function(){
    // separo version, password y id, del resto del objeto
    const{__v, _id, ...object}= this.toObject();
    // le sumo el id, pero con el nombre uid
    object.uid= _id;
    // retorno el objeto, sin la version, y el uid (id)
    return object;
})

module.exports= model ('Usuario', UsuarioSchema);// 'Usuario' le da nombre a la tabla