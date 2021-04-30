var express = require('express');
var router = express.Router();

const mysqlConnection = require('../mysql_connection');

router.post('/',  function(req, res) {
    console.log(req.body);
    mysqlConnection.query('INSERT INTO Pago (Id_transaccion,Num_tarjeta,Nombre_tarjeta,Fecha_vencimiento,CVV,Total,dpi) VALUES ('+
    req.body.Id_transaccion+
    ',\''+req.body.Num_tarjeta+'\''+       
    ',\''+req.body.Nombre_tarjeta+'\''+
    ',\''+req.body.Fecha_vencimiento+'\''+
    ','+req.body.CVV+
    ','+req.body.Total+
    ','+req.body.dpi+')'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json({ message: "Pago insertado en la base de datos" });
    });
});

/* Ejemplo json 
{
    "Num_tarjeta": "5678XXXXXXXX5678",
    "Nombre_tarjeta": "Carlos David",
    "Fecha_vencimiento":"12/22",
    "cvv": 456,
    "Total": 250,
    "Id_usuario": 1
}
*/


module.exports = router;
