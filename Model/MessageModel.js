const db = require("../config/database");

module.exports = {
  getMessages: async function (userId) {
    let conn = await db.getConnection();
    const rows = await conn.query("SELECT * FROM message WHERE userId = ?", [
      userId,
    ]);
    conn.end();

    if (rows.length > 0) {
      let messages = [];
      for (let i = 0; i < rows.length; i++) {
        messages.push(rows[i]);
      }
      return messages;
    } else {
      return null;
    }
  },
};
