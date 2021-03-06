const router = require("express").Router();
const db = require("../config/database");
const User = require("../Model/UserModel");
const Book = require("../Model/BookModel");
const crypto = require("crypto");

/* This is called when forms are submitted and the specific routes
are called.  Because we have saved the userId from each time a page
is loaded, we have access to it here as req.user.user.

The return res.redirect("/available"); reloads the page we're on
so that the new information can be displayed
 */

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
      const chash = crypto.createHash("sha1").update(hash).digest("base64");
      let cookieHash = await User.setCookieHash(user, chash);
      req.user = { auth: true, user: { userId: row.insertId, username: user } };
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
    return res.redirect("/account");
  } else {
    next();
  }
});

router.post("/addReview", async (req, res, next) => {
  if (req.user !== undefined) {
    let title = req.body.txtReviewTitle.trim();
    let author = req.body.txtReviewAuthor.trim();
    let reviewText = req.body.txtReviewText.trim();
    let ratingText = req.body.txtReviewRating.trim();
    let rating = parseInt(ratingText);

    if (rating <= 0) {
      rating = "1";
    } else if (rating > 5) {
      rating = "5";
    }

    let rateText = rating.toString();

    let recommend = req.body.txtReviewCheck;
    if (recommend === undefined) {
      recommend = "";
    }

    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query(
      "INSERT INTO bookreview (userId, title, author, reviewText, rating, recommended) VALUES (?, ?, ?, ?, ?, ?);",
      [userId, title, author, reviewText, rateText, recommend]
    );
    conn.end();
    return res.redirect("/review");
  } else {
    next();
  }
});

router.get("/viewAvailable", async (req, res, next) => {
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

router.post("/addAvailable", async (req, res, next) => {
  if (req.user !== undefined) {
    let title = req.body.txtAvailableTitle.trim();
    let author = req.body.txtAvailableAuthor.trim();
    let yearPub = req.body.txtYearPub.trim();
    let pages = req.body.txtPages.trim();
    let isAvailable = req.body.checkAvailable;

    if (isAvailable === undefined) {
      isAvailable = "off";
    }

    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query(
      "INSERT INTO books (userId, title, author, yearPub, pages, available) VALUES (?, ?, ?, ?, ?, ?);",
      [userId, title, author, yearPub, pages, isAvailable]
    );
    conn.end();
    return res.redirect("/available");
  } else {
    next();
  }
});

router.post("/addWishlist", async (req, res, next) => {
  if (req.user !== undefined) {
    let title = req.body.txtWishlistTitle.trim();
    let author = req.body.txtWishlistAuthor.trim();
    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query(
      "INSERT INTO wishlist (userId, title, author) VALUES (?, ?, ?);",
      [userId, title, author]
    );
    conn.end();
    return res.redirect("/wishlist");
  } else {
    next();
  }
});

router.get("/getPostalCode", async (req, res, next) => {
  if (req.user !== undefined) {
    let conn = await db.getConnection();
    let userId = req.user.user.userId;
    const code = await conn.query(
      "SELECT postCode FROM users WHERE userId = ?;",
      [userId]
    );
    conn.end();

    res.json(code);
  } else {
    next();
  }
});

router.post("/sendMessage", async (req, res, next) => {
  if (req.user !== undefined) {
    let messageText = req.body.messageText.trim();
    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query(
      "INSERT INTO message (messageText, userId) VALUES (?, ?);",
      [messageText, userId]
    );
    conn.end();
    return res.redirect("/message");
  } else {
    next();
  }
});

module.exports = router;
