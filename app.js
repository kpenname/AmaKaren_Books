const express = require("express");
const path = require("path");
const dbLayer = require("./config/database");
const geocoder = require("node-geocoder-ca").Geocoder;
const axios = require("axios");
const login = require("./middleware/login");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const accountRouter = require("./routes/accountRoute");
const pageRoute = require("./routes/pageRoute");
const hbs = require("hbs");

const app = express();
const port = 9000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); // urlencoded just means that the information in the "body" (page)
// is sent back as a string to the url

app.use(cookieParser());

hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.set("view engine", "hbs");
// hbs files that are parts of the main page
// these are called from layout by using {{> partialName}} and then hbs looks in
// the Views / partials folder for that name

// middleware
app.use(login);

app.use("/account", accountRouter);
app.use("/", pageRoute);

app.use("/resourses", express.static(path.join(__dirname, "public")));
// this isn't a folder called resourses.
// It is just a way to access other resources by calling the endpoint "/resourses/something"
// this is used in layout.hbs when calling style.css, images, and main.js

app.get("/geocoding", async (req, res) => {
  let postcode = req.param.postcode;
  let urlstring =
    "https://geocoder.ca/?locate=" + postcode + "&geoit=XML&json=1";
  let userLocation = await axios.get(urlstring);
  res.json(userLocation.data);
});

app.get("/getUsers/", async (req, res) => {
  // this endpoint now calls the user model
  let users = await User.getAllUserInfo(); // User is like an object with methods
  // I am calling getAllUserInfo from the model.  That is where the sql is.
  res.json(users);
});

app.post("/message/", async (req, res) => {
  let message = await Message.sendMessage();
  res.json(message);
});

app.post("/updateUser/", async (req, res) => {
  //can't do this until I have access to the user's information
  // then this will be moved to the User model
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
