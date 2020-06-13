const db = require("../config/database");
const crypto = require("crypto");

module.exports = {
  getUser: async function (userName, passWord) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "SELECT * FROM `users` WHERE `userName` = ? AND `passWord` = ? LIMIT 1",
      [userName, passWord]
    );
    if (rows.length > 0) {
      return { user: rows[0] };
    }
    return { user: null };
  },

  getAllUserInfo: async function () {
    let connection = await db.getConnection();
    const rows = await connection.query("SELECT * FROM `users`;");
    if (rows.length > 0) {
      return { users: rows };
    }
    return { users: null };
  },

  addUser: async function (username, password) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "INSERT INTO users (userName, passWord) VALUES (?,?)",
      [username, password]
    );
    if (rows.affectedRows > 0) {
      return { userId: rows.insertId };
    }
    return { userId: null };
  },

  updateUser: async function (
    first,
    last,
    address,
    city,
    province,
    postal,
    email,
    phone,
    userId
  ) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "UPDATE TABLE users (firstName, lastName, address, City, province, postCode, email, phone) VALUES (?,?,?,?,?,?,?,?) WHERE userId = ?",
      [first, last, address, city, province, postal, email, phone, userId]
    );
    if (rows.affectedRows > 0) {
      return { userId: rows.insertId };
    }
    return { userId: null };
  },

  setCookieHash: async function (user, chash) {
    let conn = await db.getConnection();
    const row = await conn.query(
      "UPDATE `users` SET `cookieHash`=? WHERE `username`=?",
      [chash, user]
    );
    conn.end();
    return true;
  },
  // authenticate user with a cookie hash
  getAuthorizedWithHash: async function (user, hash) {
    let conn = await db.getConnection();
    // run prepared query finding matching user
    const row = await conn.query("SELECT * FROM users WHERE username = ?", [
      user,
    ]);
    conn.end();

    // check if there are matching users
    if (row[0] !== undefined) {
      // check if hash matches
      if (row[0].cookieHash === hash) {
        return { auth: true, user: row[0] };
      }
    }
    return { auth: false };
  },
  getAuthorizedWithPassword: async function (user, pwd) {
    let conn = await db.getConnection();
    const row = await conn.query("SELECT * FROM users WHERE username = ?", [
      user,
    ]);
    conn.end();
    const hash = crypto.createHash("sha1").update(pwd).digest("base64");

    if (row[0] !== undefined) {
      if (hash === row[0].passHash) {
        // if the user is authenticated
        const chash = crypto.createHash("sha1").update(hash).digest("base64");
        this.setCookieHash(user, chash);
        return { auth: true, user: row[0], cookieHash: chash }; // this where the console.log comes from
      }
    }
    return { auth: false };
  },
};
