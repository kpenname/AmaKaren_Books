const db = require("../config/database");

module.exports = {
  getBooks: async function (userId) {
    let userId = req.body.userId;
    let conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM books WHERE userId = ?", [
      userId,
    ]);
    conn.end();

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        return { books: rows[i] };
      }
    } else {
      return null;
    }
  },
};
