import mysql from "mysql2/promise";

let _dbConn = mysql.createPool({
  host: "34.64.61.16",
  user: "testuser",
  password: "test",
  database: "TESTDB",
});

export { _dbConn };
