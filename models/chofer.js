const {Schema, model} = require ('mongoose');

const ChoferSchema = Schema({

    nombre: {
        type: String,
        required: true,
        
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    linti:{
        type: Date,
        
        
    },
    img:{
        type: String,
        
    },
    usuario:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    unidad:{
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Unidad'
    }


});

// funcion para filtrar respuesta
ChoferSchema.method ('toJSON', function(){
    // separo version, passwoe y id, del resto del objeto
    const{__v,  ...object}= this.toObject();
    
    return object;
})

module.exports= model ('Chofer', ChoferSchema);// 'Chofer' le da nombre a la tabla