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

app.get("/test_list", function (req, res) {
  // res.sendFile(path.join(__dirname + "/data.json"));
  connection.query("SELECT * FROM test", (err, rows, field) => {
    res.send(rows);
  });
});

app.get("/test_insert", function (req, res) {
  connection.query("SELECT * From test", (err, rows, field) => {
    res.send(rows);
    console.log("get성공");
  });
});

//get 방식은 req.query.parameter_name
//post 방식은 req.body.parameter_name

app.post("/test_insert", function (req, res) {
  // let id = req.body.id;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let values = [name, birthday, gender, job];

  connection.query(
    "INSERT INTO test(name, birthday, gender, job) Values(?,?,?,?)",
    values,
    function (err, rows, fields) {
      if (err) console.log(err);
      console.log(rows);
    }
  );
});
// 절대로 :id 붙이지 말것 !!!!
app.post("/test_update", function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let values = [name, birthday, gender, job, id];

  connection.query(
    "UPDATE test SET name=?, birthday=?, gender=?, job=? WHERE id=?",
    values,
    function (err, rows, fields) {
      if (err) console.log(err);
      console.log(rows);
    }
  );
});

app.get("/test_list", function (req, res) {
  // res.sendFile(path.join(__dirname + "/data.json"));
  connection.query("SELECT * FROM test", (err, rows, field) => {
    res.send(rows);
  });
});

app.post(`/test_delete/:id`, function (req, res) {
  let id = req.body.id;

  let values = [id];

  connection.query(
    "DELETE FROM test WHERE id=?",
    values,
    function (err, rows, fields) {
      if (err) console.log(err);
      console.log(rows);
      console.log("삭제완료(서버)");
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
