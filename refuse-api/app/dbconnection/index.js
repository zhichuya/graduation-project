let mysql = require('mysql');
let config = {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'refuse'
};

var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});
connection.connect();
module.exports = connection;
