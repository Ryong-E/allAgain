import express from "express";
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  console.log("Hello");
  res.send("hello world");
});

export { app };
