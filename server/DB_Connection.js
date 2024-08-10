var mysql = require("mysql");
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
});

conn.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log("Connected");
});
