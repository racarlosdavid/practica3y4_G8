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
    mysqlConnection.query('INSERT INTO Usuario set ?', [req.body], function (err, rows, fields) {
        if (err)
            throw err;
        res.json({ message: "Usuario insertado exitosamente" });
    });
});

/* Usuario - Json   
{
    "usuario": "Admin",
    "correo": "theadmin@gmail.com",
    "contrasenia":"1234",
    "nombre": "John",
    "apellido": "Cena",
    "edad": 44
}
*/

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
