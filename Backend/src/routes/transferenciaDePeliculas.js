var express = require('express');
var router = express.Router();

const mysqlConnection = require('../mysql_connection');

router.post('/',  function(req, res, next) {
    console.log(req.body)
    mysqlConnection.query('UPDATE Alquiler SET dpi = ' + req.body.dpi +
    ' WHERE  idpelicula = ' + req.body.idpelicula +
    ' AND llave = \''+ req.body.llave +
    '\' AND dpi = '+ req.body.dpiOwner +
    ';', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
    
});

module.exports = router;