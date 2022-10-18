import mysql from "mysql2";

const pool = mysql.createPool({
  host: "34.64.61.16",
  user: "testuser",
  password: "test",
  database: "TESTDB",
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
});
const promisePool = pool.promise();

export { pool, promisePool };
