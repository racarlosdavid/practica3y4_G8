var express = require('express');
var router = express.Router();

const mysqlConnection = require('../mysql_connection');

router.post('/historialcompra',  function(req, res) {
    mysqlConnection.query('select PA.Id_transaccion,PA.Num_tarjeta,PA.Nombre_tarjeta,PA.Fecha_vencimiento,PA.CVV,PA.Total,JSON_ARRAYAGG(Pelicula.name)AS attributes From Alquiler,Pelicula, (select * From Pago where dpi = '+
    +req.body.id+ ') as PA where Alquiler.Id_transaccion = PA.Id_transaccion and Alquiler.idpelicula = Pelicula.idpelicula group by PA.Id_transaccion;'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json( rows );
    });
});

module.exports = router;
