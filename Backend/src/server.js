const express = require('express');
const app = express();
var morgan = require('morgan');
var cors = require('cors');

//Settings
const port = 3000;

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes
app.use('/',require('./routes/index'))
app.use('/saludo',require('./routes/Saludo'));
app.use('/pagoDePeliculas',require('./routes/pagoDePeliculas'));
app.use('/inventarioDePeliculas',require('./routes/inventarioDePeliculas'));
app.use('/usuarios',require('./routes/listaUsuarios'));
app.use('/transferenciaDePeliculas',require('./routes/transferenciaDePeliculas'));

app.listen(port,()=>{
    console.log('Servidor en el puerto', port);
}); 