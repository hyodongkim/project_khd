const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "client/src")));

app.get("/api/customers", function (req, res) {
  res.sendFile(path.join(__dirname + "/data.json"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
