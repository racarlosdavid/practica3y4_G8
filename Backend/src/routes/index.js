var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send("API PRACTICA 3 & 4 - AYD1");
});

module.exports = router;
