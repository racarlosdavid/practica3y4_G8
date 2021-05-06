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
app.use('/registrousuario', require('./routes/registrouser'));
app.use(require('./routes/historialCompra'));
app.use('/alquiler',require('./routes/alquiler'));
app.use('/obtenerusuarios', require('./routes/obtenerusuarios'));
app.use('/logusuario', require('./routes/logusuario'));
app.use('/logusuariomail', require('./routes/logusuariomail'));
app.use('/admincheck', require('./routes/admincheck'));
app.use('/crearAlquiler', require('./routes/crearAlquiler'));
app.use('/tablaTemporal', require('./routes/tablaTemporal'));
app.use('/crearPelicula', require('./routes/crearPelicula'));
app.use('/crearLenguaje', require('./routes/crearLenguaje'));
app.use('/crearPlan', require('./routes/crearPlan'));
app.use('/ultimaIteracion', require('./routes/ultimaIteracion'));
app.use('/editarPelicula', require('./routes/editarPelicula'));
app.use('/editarLenguaje', require('./routes/editarLenguaje'));
app.use('/editarPlan', require('./routes/editarPlan'));
app.use('/temporalLenguaje', require('./routes/temporalLenguaje'));
app.use('/temporalPlan', require('./routes/temporalPlan'));
app.use('/temporalPlan2', require('./routes/temporalPlan2'));
app.use('/ultimoLenguaje', require('./routes/ultimoLenguaje'));
app.use('/ultimoPlan', require('./routes/ultimoPlan'));


app.listen(port,()=>{
    console.log('Servidor en el puerto', port);
}); 