const User = require("../model/User");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    let fail = {
      user: null,
      auth: false,
      error: "missing authentication",
    };
    req.auth = fail;
    return res.status(403).json(fail);
  }

  let encodeData = req.headers.authorization.split(" ")[1];
  let data = Buffer.from(encodeData, "base64").toString();
  data = data.split(":");
  let userName = data[0];
  let passWord = data[1];

  let user = await User.getUser(userName, passWord);
  if (user.user == null) {
    req.auth = { auth: false, user: null };
  } else {
    req.auth = { auth: true, user: user.user };
  }

  next();
};
