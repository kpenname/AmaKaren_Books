const db = require("../config/database");

module.exports = class {
    static async sendMessage(message, email) {
        let sql = "INSERT INTO message (message, email) VALUES (?,?)";
        con.query(sql, [req.body.msgText, req.body.emailText], function (
            err,
            result
        ) {
            if (err) throw err;
            return res.send(req.body.query);
        });
    }
};


if (rows.affectedRows > 0) {
    return { userId: rows.insertId };
  }
  return { userId: null };