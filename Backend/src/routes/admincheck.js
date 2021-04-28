//Requiere el modulo express y router
var express = require('express');
var router = express.Router();

//Se obtiene la conexión a MySQL
const mysqlConnection = require('../mysql_connection');

//Se configura la petición
router.get('/',  function(req, res) 
{
    //Realizamos la consulta de selección
    mysqlConnection.query('SELECT * FROM Usuario WHERE usuario = "Admin"', function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
