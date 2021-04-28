//Requiere el modulo express y router
var express = require('express');
var router = express.Router();

//Se obtiene la conexión a MySQL
const mysqlConnection = require('../mysql_connection');

//Se configura la petición
router.post('/',  function(req, res) 
{
    //Variable de almacenamiento
    var usuario;

    //Se utilizan para el select, usuario y contraseña
    console.log(req.body.user);
    console.log(req.body.contra);

    //Realizamos la consulta de selección
    mysqlConnection.query('SELECT dpi FROM Usuario WHERE correo = ? AND contrasenia = ?', [req.body.user, req.body.contra], function (err, rows, fields) {
        if (err)
            throw err;

        //Si no hay error, el resultado se almacena en la variable
        usuario = rows;

        //Si objeto tiene un largo mayor que 0 es porque el registro si existe
        if(usuario.length > 0)
        {
            //Se retorna el objeto en el índice seleccionado
            return res.json(rows[0])
        }
        
        //Si el if no aplica se retorna un estatus de error
        res.status(404).json({text: 'Usuario no encontrado'});
    });
});

//El módulo se exporta para poder ser llamado por el router
module.exports = router;
