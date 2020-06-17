const express = require("express");
const path = require("path");
const dbLayer = require("./config/database");
const axios = require("axios");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const accountRouter = require("./routes/accountRoute");
const pageRoute = require("./routes/pageRoute");
const hbs = require("hbs");
const login = require("./middleware/login");

const app = express();
const port = 9000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

hbs.registerPartials(path.join(__dirname, "/views/partials"));
app.set("view engine", "hbs");

app.use(login);

app.use("/account", accountRouter);

app.use("/resourses", express.static(path.join(__dirname, "public")));

app.get("/geocoding/:pc", async (req, res) => {
  let pc = req.params.pc;
  let urlstring = "https://geocoder.ca/?locate=" + pc + "&geoit=XML&json=1";
  let userLocation = await axios.get(urlstring);
  res.json(userLocation.data);
});

app.use("/", pageRoute);

app.listen(port, () => {
  dbLayer.init();
  console.log(`listening on port: ${port}`);
});
