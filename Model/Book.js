const db = require("../config/database");

module.exports = class {
  static async getBooks(userId) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "SELECT * FROM `books` WHERE `userId` = ? ",
      [userId]
    );
    if (rows.length > 0) {
      return { user: rows[0] };
    }

    return { user: null };
  }
};
