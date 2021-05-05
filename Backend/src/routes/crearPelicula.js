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
    mysqlConnection.query('insert into Pelicula (name,image,chargerate,active) select distinct name,image,chargerate,active from TemporalPelicula where not exists ( select * from Pelicula where (TemporalPelicula.name = Pelicula.name) )'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "Pelicula insertada en la base de datos" });
    });
});

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
