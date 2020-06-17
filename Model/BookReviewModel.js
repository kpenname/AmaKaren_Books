const db = require("../config/database");

module.exports = {
  getReviews: async function (userId) {
    let conn = await db.getConnection();
    const rows = await conn.query(
      "SELECT reviewText, recommended, rating, title, author FROM bookreview JOIN books ON books.bookId = bookreview.bookId WHERE bookreview.userId =  ?",
      [userId]
    );
    conn.end();

    let reviews = [];
    for (let i = 0; i < rows.length; i++) {
      reviews.push(rows[i]);
    }
    console.log(reviews);
    return reviews;
  },
};
