const db = require("../config/database");

module.exports = class {
  static async getUser(userName, passWord) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "SELECT * FROM `users` WHERE `userName` = ? AND `passWord` = ? LIMIT 1",
      [userName, passWord]
    );
    if (rows.length > 0) {
      return { user: rows[0] };
    }
    return { user: null };
  }

  static async getAllUserInfo() {
    let connection = await db.getConnection();
    const rows = await connection.query("SELECT * FROM `users`;");
    if (rows.length > 0) {
      return { users: rows };
    }
    return { users: null };
  }

  static async addUser(username, password) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "INSERT INTO users (userName, passWord) VALUES (?,?)",
      [username, password]
    );
    if (rows.affectedRows > 0) {
      return { userId: rows.insertId };
    }
    return { userId: null };
  }

  static async updateUser(
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
  }
};
