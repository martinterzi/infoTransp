const {Schema, model} = require ('mongoose');

const UnidadSchema = Schema({

    patente: {
        type: String,
        required: true,
        
    },
    modelo: {
        type: String,
        
    },
    revtec:{
        type: String,
        
        
    },
    img:{
        type: String,
        
    },
    usuario:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }


});

// funcion para filtrar respuesta
UnidadSchema.method ('toJSON', function(){
    // separo version, passwoe y id, del resto del objeto
    const{__v,  ...object}= this.toObject();
    
    return object;
})

module.exports= model ('Unidad', UnidadSchema);// 'Chofer' le da nombre a la tabla