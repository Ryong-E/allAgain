import mysql from "mysql2";
import { Campaign } from "./model/Campaign";
import { User } from "./model/User";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  enableKeepAlive: true,
});
const promisePool = pool.promise();

export { pool, promisePool, Campaign, User };
