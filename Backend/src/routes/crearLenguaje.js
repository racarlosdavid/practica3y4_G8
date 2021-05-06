//Requiere el modulo express y router
var express = require('express');
var router = express.Router();

//Se obtiene la conexión a MySQL
const mysqlConnection = require('../mysql_connection');

//Se configura la petición
router.post('/',  function(req, res) 
{
    //Mostramos en pantalla el cuerpo de la petición
    console.log(req.body);

    //Realizamos la consulta de inserción
    mysqlConnection.query('insert into Lenguaje (code,descripcion) select distinct code,descripcion from TemporalLenguaje where not exists ( select * from Lenguaje where (TemporalLenguaje.code = Lenguaje.code) )'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "Lenguaje insertado en la base de datos" });
    });
});

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
