const fs = require("fs");
const express = require("express");
const session = require("express-session");
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

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

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

/////////////////////////////////////////////////////////////////// 위에는 CRUD테스트, 아래는 로그인테스트

app.get("/test_authCheck", (req, res) => {
  const sendData = { isLogin: "" };
  if (req.session.is_logined) {
    sendData.isLogin = "True";
  } else {
    sendData.isLogin = "False";
  }
  res.send(sendData);
});

app.post("/test_login", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;

  const sqlQuery =
    "select count(*) as cnt from testLogin where username =? and password =?";
  connection.query(sqlQuery, [id, pw], function (err, rows, fields) {
    console.log(err);
    console.log(rows);
    console.log(rows[0].cnt);
    console.log(req.session.id);
    if (rows[0].cnt == 1) {
      console.log("성공");
    } else {
      console.log("실패");
    }
  });
});

app.post("/test_signin", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  let password2 = req.body.password2;

  let values = [username, password];

  console.log(username);
  console.log(password);
  console.log(password2);

  if (password == password2) {
    connection.query(
      "Insert into testLogin(username, password) values(?,?)",
      values,
      function (err, rows, fields) {
        if (err) {
          console.log(err);
          console.log(rows);
        }
      }
    );
  } else {
    console.log("비번 불일치");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
