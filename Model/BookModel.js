const db = require("../config/database");

module.exports = {
  getBooks: async function (userId) {
    let conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM books WHERE userId = ?", [
      userId,
    ]);
    conn.end();

    if (rows.length > 0) {
      let books = [];
      for (let i = 0; i < rows.length; i++) {
        books.push(rows[i]);
      }
      return books;
    } else {
      return null;
    }
  },
};
