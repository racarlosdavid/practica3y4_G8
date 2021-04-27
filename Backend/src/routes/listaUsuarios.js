var express = require('express');
var router = express.Router();

const mysqlConnection = require('../mysql_connection');

router.get('/',  function(req, res, next) {
    //console.log(req.body)
    mysqlConnection.query('SELECT U.dpi, U.usuario, U.nombre, U.apellido FROM Usuario U;', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
    
});

module.exports = router;