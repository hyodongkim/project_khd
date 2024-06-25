import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/customers", (req, res) => {
  res.send([
    {
      id: 1,
      image: "aaa.png",
      name: "김효동1",
      birthday: "960120",
      gender: "남자",
      job: "대학생",
    },
    {
      id: 2,
      image: "aaa.jpg",
      name: "김효동2",
      birthday: "960120",
      gender: "여자",
      job: "직장인",
    },
    {
      id: 3,
      image: "ccc.jpg",
      name: "김효동3",
      birthday: "960120",
      gender: "여자",
      job: "직장인",
    },
    {
      id: 4,
      image: "ddd.jpg",
      name: "김효동4",
      birthday: "960120",
      gender: "남자",
      job: "직장인",
    },
  ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
