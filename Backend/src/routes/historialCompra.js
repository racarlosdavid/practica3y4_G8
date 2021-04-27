var express = require('express');
var router = express.Router();

const mysqlConnection = require('../mysql_connection');

router.post('/historialcompra',  function(req, res) {
    mysqlConnection.query('SELECT * FROM Pago WHERE dpi = '+
    +req.body.id+';'
    , function(err, rows, fields) {
        if (err) throw err;
        res.json( rows );
    });
});

module.exports = router;
