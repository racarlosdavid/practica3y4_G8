var mysql      = require('mysql');
var mysqlConnection = mysql.createConnection({
  host     : '40.124.122.8',
  user     : 'root',
  password : 'Tit@nium123_Us@c',
  database : 'ayd1'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(' Error al conectarse a la base de datos ',err);
    } else {
        console.log(' Conexión a la base de datos exitosa ');
    }
});


module.exports = mysqlConnection;
