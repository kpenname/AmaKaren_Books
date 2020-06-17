const db = require("../config/database");

module.exports = {
  getReviews: async function (userId) {
    let conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM bookreview WHERE userId = ?", [
      userId,
    ]);
    conn.end();
    let reviews = [];
    for (let i = 0; i < rows.length; i++) {
      reviews.push(rows[i]);
    }
    return reviews;
  },
};
