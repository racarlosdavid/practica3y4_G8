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
router.get('/historialcompra',  function(req, res) {
    mysqlConnection.query('select PA.dpi,PA.apellido,PA.nombre, PA.Id_transaccion,PA.Num_tarjeta,PA.Nombre_tarjeta,PA.Fecha_vencimiento,PA.CVV,PA.Total,JSON_ARRAYAGG(Pelicula.name)AS Detalle From Alquiler,Pelicula,(select Pago.Id_transaccion,Pago.Num_tarjeta,Pago.Nombre_tarjeta,Pago.Fecha_vencimiento,Pago.CVV,Pago.Total,Usuario.nombre,Usuario.apellido,Usuario.dpi From Pago,Usuario where Pago.dpi = Usuario.dpi ) as PA where Alquiler.Id_transaccion = PA.Id_transaccion and Alquiler.idpelicula = Pelicula.idpelicula group by PA.Id_transaccion;'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json( rows );
    });
});

module.exports = router;
