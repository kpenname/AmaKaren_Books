const router = require("express").Router();
const db = require("../config/database");
const User = require("../Model/UserModel");
const crypto = require("crypto");

router.post("/addUser", async (req, res, next) => {
  if (req.user !== undefined) {
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

      // render the page view
      res.render("home", {
        page: "home",
        user: req.user,
      });
    }
  } else {
    next();
  }
});

router.post("/update", async (req, res, next) => {
  if (req.user !== undefined) {
    // if they are logged in

    let first = req.body.firstName.trim();
    // firstname is the name of the form field
    // to update an account, we can use the form
    // in the account template - but... I don't know about
    // using javascript inside templates that load after
    // the page loads.
    // will probably have to put the <Script> in the template itself

    let userId = req.user.user.userId;
    let conn = await db.getConnection();
    const row = await conn.query(
      "UPDATE users SET first = ? WHERE userId = ?;",
      [first, userId]
    );
    conn.end();
    // render the page view
    res.render("home", {
      pageKey: "home",
      user: req.user,
    });
  } else {
    next();
  }
});

module.exports = router;
