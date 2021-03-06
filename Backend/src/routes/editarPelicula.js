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
    mysqlConnection.query('UPDATE Pelicula set image ='
    +'\''+req.body.image+'\', chargerate='+
    +req.body.chargerate+', active='+
    +req.body.active+
    ' WHERE name = '+
    '\''+req.body.name+'\''
    , function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "Datos de peliculas actualizados" });
    });
});

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
