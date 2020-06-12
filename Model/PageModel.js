const db = require("../config/database");

module.exports = {
  getPage: async function (key) {
    let conn = await db.getConnection();
    const row = await conn.query(
      "SELECT pageKey, title,content, shownInMenu, menuOrder FROM pages WHERE pageKey = ?",
      [key]
    );
    conn.end();
    return row;
  },
  getMenu: async function () {
    let conn = await db.getConnection();
    const rows = await conn.query(
      "SELECT pageKey, title FROM pages WHERE shownInMenu = 1 ORDER BY menuOrder"
    );
    conn.end();
    return rows;
  },
};
