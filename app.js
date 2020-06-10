const express = require("express");
const path = require("path");
const dbLayer = require("./config/database");
const geocoder = require("node-geocoder-ca").Geocoder;
const app = express();
const port = 9000;
const axios = require("axios");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const User = require("./Model/User");
const Cookie = require("./Model/Cookie");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "amakaren_books",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

app.get("/geocoding", async (req, res) => {
  let postcode = req.param.postcode;
  let urlstring =
    "https://geocoder.ca/?locate=" + postcode + "&geoit=XML&json=1";
  let userLocation = await axios.get(urlstring);
  res.json(userLocation.data);
});

app.get("/getUsers/", async (req, res) => {
  let users = await User.getAllUserInfo();
  res.json(users);
});

app.post("/message/", async (req, res) => {
  let sql = "INSERT INTO message (message, email) VALUES (?,?)";
  con.query(sql, [req.body.msgText, req.body.emailText], function (
    err,
    result
  ) {
    if (err) throw err;
    return res.send(req.body.query);
  });
});

app.post("/addUser/", async (req, res) => {
  let result = await User.addUser(
    req.body.txtAddUsername,
    req.body.txtAddPassword
  );

  let cookie = await Cookie.setCookie("userId", result.userId, 30);
  console.log(result.userId);
  res.json(cookie);
});

app.post("/updateUser/", async (req, res) => {
  console.log(userId); //null
  let result = await User.updateUser(
    req.body.firstNameTxt,
    req.body.lastNameTxt,
    req.body.addressTxt,
    req.body.cityTxt,
    req.body.provinceTxt,
    req.body.postalTxt,
    req.body.updateEmailTxt,
    req.body.phoneTxt,
    userId
  );
  console.log(userId);
  res.json(result);
});

app.listen(port, () => {
  dbLayer.init();
  console.log(`listening on port: ${port}`);
});
