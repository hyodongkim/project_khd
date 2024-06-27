const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const mysql = require("mysql2");
dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  // host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

connection.connect();

app.use(express.static(path.join(__dirname, "client/src")));

app.get("/api/customers", function (req, res) {
  // res.sendFile(path.join(__dirname + "/data.json"));
  connection.query("SELECT * FROM test", (err, rows, field) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
