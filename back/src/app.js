import express from "express";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { userRouter } from "./routers/userRouter";
import { campaignRouter } from "./routers/campaignRouter";
import cors from "cors";
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "34.64.61.16",
  user: "testuser",
  password: "test",
  database: "TESTDB",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

const app = express();

app.use(express.static(__dirname + "/images"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("team02 project");
});

app.use("/users", userRouter);
app.use("/campaigns", campaignRouter);

app.use(errorMiddleware);

export { app, connection };
