const db = require("../config/database");

module.exports = class {
  static async getUser(userName, passWord) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "SELECT userID, userName FROM `users` WHERE `userName` = ? AND `passWord` = ? LIMIT 1",
      [userName, passWord]
    );
    if (rows.length > 0) {
      return { user: rows[0] };
    }

    return { user: null };
  }
};
