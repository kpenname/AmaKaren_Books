const userModel = require("../Model/UserModel");

module.exports = async (req, res, next) => {
  req.user = { auth: false };
  if (req.query.logout !== undefined) {
    res.clearCookie("user");
    res.clearCookie("chash");
    res.user = { auth: false };
    res.redirect("/home");
    /** this redirect was added because I didn't want the url
     * to be /?logout=1 which is what is set as the action when
     * the user clicks logout on the login.hbs partial
     * However, it currently throws an error in the console
     * "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
     * I don't know how to rectify this.  Maybe someday...
     * */
  } else {
    if (req.body.username !== undefined && req.body.password !== undefined) {
      let user = req.body.username.trim().toLowerCase();
      let pwd = req.body.password;

      const userStatus = await userModel.getAuthorizedWithPassword(user, pwd);
      req.user = userStatus;
      if (userStatus.auth) {
        res.cookie("user", userStatus.user.userName, {
          maxAge: 1000 * 60 * 60 * 12,
        });
        res.cookie("chash", userStatus.cookieHash, {
          maxAge: 1000 * 60 * 60 * 12,
        });
      }
    } else if (
      req.cookies.user !== undefined &&
      req.cookies.chash !== undefined
    ) {
      req.user = await userModel.getAuthorizedWithHash(
        req.cookies.user,
        req.cookies.chash
      );
    }
  }
  next();
};
