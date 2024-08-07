const fs = require("fs");
const express = require("express");
const session = require("express-session");
const router = express.Router();
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const multer = require("multer");

dotenv.config();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage });
app.use("/image", express.static("upload"));

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

app.post("/test_login", (req, res) => {
  let sendData = [];
  let id = req.body.id;
  let pw = req.body.pw;

  const sqlQuery =
    "select count(*) as cnt from testLogin where username =? and password =?";
  connection.query(sqlQuery, [id, pw], function (err, rows, fields) {
    console.log(err);
    console.log(rows);
    console.log(rows[0].cnt);
    console.log(req.session.id);
    if (id == "" || id == "undefined" || id == null) {
      console.log("아이디를 입력해주세요");
      sendData.push({ isLogin: "False" });
      console.log(sendData);
      return res.status(200).send(sendData);
    }
    if (pw == "" || pw == "undefined" || pw == null) {
      console.log("비밀번호를 입력해주세요");
      sendData.push({ isLogin: "False" });
      console.log(sendData);
      return res.status(200).send(sendData);
    } else if (rows[0].cnt < 1) {
      console.log("가입된 계정이 아닙니다");
      sendData.push({ isLogin: "False" });
      console.log(sendData);
      return res.status(200).send(sendData);
    } else {
      console.log("성공이당");
      sendData.push({ isLogin: "True" });
      console.log(sendData);
      return res.status(200).send(sendData);
      // return res.send(sendData[0].isLogin);
    }
  });
});

app.post("/test_signin", (req, res) => {
  let sendData = [];
  let username = req.body.username;
  let password = req.body.password;

  let password2 = req.body.password2;

  let values = [username, password];

  console.log(username);
  console.log(password);
  console.log(password2);

  const sqlQuery =
    "select count(*) as cnt from testLogin where username =? and password =?";
  connection.query(
    sqlQuery,
    [username, password],
    function (err, rows, fields) {
      if (username == null || username == "undefined" || username == "") {
        console.log("아이디 입력을 해주세요");
        sendData.push({ isSignin: "False" });
        res.send(sendData);
      } else if (
        password == null ||
        password == "undefined" ||
        password == ""
      ) {
        console.log("비밀번호 입력을 해주세요");
        sendData.push({ isSignin: "False" });
        res.send(sendData);
      } else if (
        password2 == null ||
        password2 == "undefined" ||
        password2 == ""
      ) {
        console.log("재확인 비밀번호 입력을 해주세요");
        sendData.push({ isSignin: "False" });
        res.send(sendData);
      } else if (password != password2) {
        console.log("비밀번호와 재확인 비밀번호가 일치하지 않습니다");
        sendData.push({ isSignin: "False" });
        res.send(sendData);
      } else if (rows[0].cnt >= 1) {
        console.log(rows[0].cnt);
        console.log("이미 존재하는 회원정보입니다.");
        sendData.push({ isSignin: "False" });
        res.send(sendData);
      } else {
        sendData.push({ isSignin: "True" });
        res.send(sendData);
      }
    }
  );
});

////////////////////////////////////////////////////////////////////////////////// 위에는 로그인과 회원가입, 아래는 url간의 데이터 전송

app.post("/api/text", async (req, res) => {
  console.log("으아아아!");

  const file = req.body;
  console.log(file);
  res.send(file);
});

app.post("/api/text/send", async (req, res) => {
  console.log("req!!");
  console.log(req.body);
  let filePath = req.body;
  let fileURL = filePath;
  let file = fileURL;
  console.log("으쌰");
  console.log(file);
  res.send(file);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

////////////////////////////////////////////////////////////////////////////////// 위에는 url간의 데이터 전송, 아래는 이미지 업로드
