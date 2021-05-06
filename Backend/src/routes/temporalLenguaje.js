//Requiere el modulo express y router
var express = require('express');
var router = express.Router();

//Se obtiene la conexión a MySQL
const mysqlConnection = require('../mysql_connection');

//Se configura la petición
router.post('/',  function(req, res) 
{
    //Mostramos en pantalla el cuerpo de la petición
    //console.log(req.body);

    //Realizamos la consulta de inserción
    mysqlConnection.query('INSERT INTO TemporalLenguaje (code,descripcion) VALUES ('
    +'\''+req.body.Code+'\''+
    ',\''+req.body.Description+'\')'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "Pelicula insertada en la base de datos" });
    });
});

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
