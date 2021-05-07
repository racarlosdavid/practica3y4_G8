var express = require('express');
var router = express.Router();

const mysqlConnection = require('../mysql_connection');

router.post('/',  function(req, res, next) {
    console.log(req.body)
    mysqlConnection.query('SELECT P.idpelicula, P.name, P.image, A.llave, A.fecha FROM Pelicula P INNER JOIN Alquiler A ON A.idpelicula = P.idpelicula WHERE A.dpi = ' + req.body.dpi + ';', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
    
});

module.exports = router;