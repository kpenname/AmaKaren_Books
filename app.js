const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 9000;
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

/** getting location data from the user's ip or from keycdn.com */
app.get("/geo/", async (req, res) => {
  let ip = req.ip;

  if (req.ip === "::1" || req.ip === "::ffff:127.0.0.1") {
    ip = "24.212.248.248";
  }

  let geocode = await axios.get("https://tools.keycdn.com/geo.json?host=" + ip);
  res.json(geocode.data.data.geo);
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
