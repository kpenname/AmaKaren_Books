const db = require("../config/database");

module.exports = class {
  static async getReview(bookId) {
    let connection = await db.getConnection();
    const rows = await connection.query(
      "SELECT * FROM `bookReview` WHERE `bookId` = ? ",
      [bookId]
    );
    if (rows.length > 0) {
      return { review: rows[0] };
    }

    return { review: null };
  }
};
