// the sql statement can be changed depending on our needs
// but for now, if we can just retrieve the data, that will be good.

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
