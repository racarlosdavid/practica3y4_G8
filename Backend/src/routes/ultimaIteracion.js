//Requiere el modulo express y router
var express = require('express');
var router = express.Router();

//Se obtiene la conexión a MySQL
const mysqlConnection = require('../mysql_connection');

//Se configura la petición
router.get('/',  function(req, res) 
{
    //Mostramos en pantalla el cuerpo de la petición
    console.log(req.body);

    //Realizamos la consulta de inserción
    mysqlConnection.query('select idpelicula,name,image,chargerate,active from TemporalPelicula where idpelicula in( select id from ( select max(t.idpelicula) as id, name from TemporalPelicula t group by name )as idMaximos )'
    , function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});


//El módulo se exporta para poder ser llamado por el router
module.exports = router;
