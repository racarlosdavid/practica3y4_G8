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
    mysqlConnection.query('INSERT INTO Alquiler (llave,fecha,dpi,Id_transaccion,idpelicula) VALUES ('
    +'\''+req.body.llave+'\''+
    ',\''+req.body.fecha+'\''+
    ','+req.body.Usuario_dpi+
    ','+req.body.Pago_Id_transaccion+
    ','+req.body.Pelicula_idpelicula+')'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "ALQUILER insertado en la base de datos" });
    });
});

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
