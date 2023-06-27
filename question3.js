
const mysql = require("mysql");
//local mysql db connection
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  database: "node_mysql",
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Database Connected!");
});

function insert(name, email) {
  dbConn.query(
    "Select name from employees where email = ? ",
    email,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
      } else {
        if (res.rowCount) {
          update(name, email);
        } else {
          dbConn.query(
            "Insert  into employees (name,email) values(?,?) ",
            [name, email],
            function (err, res) {
              if (err) {
                console.log("error: ", err);
              } else {
                console.log("Sucessfully Created Your Account!");
              }
            }
          );
        }
      }
    }
  );
}

function update(name, email) {
  dbConn.query(
    "UPDATE employees SET name=? WHERE email = ?",
    [name, email],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
      } else {
        console.log("Successfully updated!");
      }
    }
  );
}
