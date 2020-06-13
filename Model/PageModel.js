const db = require("../config/database");

module.exports = {
  getPage: async function (key) {
    console.log(key);
    // no matter what is put in
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT pageKey, title, showInMenu, menuOrder FROM pages WHERE pageKey = ?",
      [key]
    );
    conn.end();
    return row;
  },
  getMenu: async function () {
    let conn = await db.getConnection();
    const rows = await conn.query(
      "SELECT pageKey, title FROM pages WHERE showInMenu = 1 ORDER BY menuOrder"
    );
    conn.end();
    return rows;
  },
};
