const router = require("express").Router();
const db = require("../config/database");
const User = require("../Model/UserModel");
const Book = require("../Model/BookModel");
const crypto = require("crypto");

router.post("/addUser", async (req, res, next) => {
  if (req.user !== undefined) {
    console.log(req.body.txtAddUsername);
    let user = req.body.txtAddUsername.trim().toLowerCase();
    let pwd = req.body.txtAddPassword;
    const hash = crypto.createHash("sha1").update(pwd).digest("base64");
    let conn = await db.getConnection();

    const row = await conn.query(
      "INSERT INTO users (userName, passHash) VALUES (?,?)",
      [user, hash]
    );
    conn.end();

    if (row.affectedRows === 1) {
      // hash of pwd hash
      const chash = crypto.createHash("sha1").update(hash).digest("base64");
      // store the cookie hash
      let cookieHash = await User.setCookieHash(user, chash);

      //console.log(row); // show the sql result data structure
      // eg. row = { affectedRows: 1, insertId: 18, warningStatus: 0 }

      // attach user info to the request object so we can use it later
      req.user = { auth: true, user: { userId: row.insertId, username: user } };

      // set cookies so user is "logged in" / remembered
      res.cookie("user", user, {
        maxAge: 1000 * 60 * 60 * 12,
      });
      res.cookie("chash", chash, {
        maxAge: 1000 * 60 * 60 * 12,
      });
      return res.redirect("/account");
    } else {
      next();
    }
  }
});

router.post("/update", async (req, res, next) => {
  if (req.user !== undefined) {
    let first = req.body.firstNameTxt.trim();
    let last = req.body.lastNameTxt.trim();
    let address = req.body.addressTxt.trim();
    let city = req.body.cityTxt.trim();
    let province = req.body.provinceTxt.trim();
    let postal = req.body.postalTxt.trim();
    let email = req.body.emailTxt.trim();
    let phone = req.body.phoneTxt.trim();

    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query(
      "UPDATE users SET firstName = ?, lastName = ?, address = ?, City = ?, province = ?, postCode = ?, email = ?, phone = ? WHERE userId = ?;",
      [first, last, address, city, province, postal, email, phone, userId]
    );
    conn.end();
    console.log(req.user.user);
    return res.redirect("/home");
  } else {
    next();
  }
});

router.get("/viewWishlist", async (req, res, next) => {
  if (req.user !== undefined) {
    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query("SELECT * FROM books WHERE userId = ?;", [
      userId,
    ]);
    conn.end();
    let bookList = await Book.getBooks(userId);
    return bookList;
  } else {
    next();
  }
});
router.post("/updateWishlist", async (req, res, next) => {
  if (req.user !== undefined) {
    let title = req.body.title.trim();
    let author = req.body.author.trim();
    let genre = req.body.genre.trim();
    let yearPub = req.body.yearPub.trim();
    let pages = req.body.pages.trim();
    let available = req.body.available.trim();
    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query(
      "UPDATE books SET title = ?, author = ?, genre = ?, yearPub = ?, pages = ?, available = ? WHERE userId = ?;",
      [title, author, genre, yearPub, pages, available, userId]
    );
    conn.end();
  } else {
    next();
  }
});

module.exports = router;
