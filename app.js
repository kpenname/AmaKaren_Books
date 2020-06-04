const express = require("express");
const path = require("path");
const dbLayer = require("./config/database");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/authorization.js");
const app = express();
const port = 9000;

const User = require("./Model/User");
const Book = require("./Model/Book");
const BookReview = require("./Model/BookReview");

app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

app.get("/headers", auth, async (req, res) => {
  if (req.auth.auth) {
    res.json({ user: req.auth.user });
  } else {
    res.json({ user: null });
  }
});

app.listen(port, () => {
  dbLayer.init();
  console.log(`listening on port: ${port}`);
});
