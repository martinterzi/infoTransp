const express = require ('express');
require('dotenv').config();
var cors = require('cors');

const {dbConnection} = require ('./database/config');

// Crear el servidor de express
const app = express();

//Configuracion cors
app.use(cors());

//lectura del body
app.use(express.json());

//Base de datos
dbConnection();

app.use(express.static('public'));



//umx5VgIrUMLetWAq
//acqua_user


//Rutas
// le inidico ante ese llamado, requiera dicho router
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/choferes', require('./routes/choferes'));
app.use('/api/unidades', require('./routes/unidades'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT ||4000, ()=>{
    console.log('Corriendo servidor en puerto ' + process.env.PORT)
})