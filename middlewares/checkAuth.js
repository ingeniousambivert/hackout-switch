const session = require("express-session");

module.exports = checkAuth = (req, res, next) => {
  if (req.session.user && req.cookies.user_key) {
    //res.redirect("/");
    next();
  } else {
    res.render("/", {
      succ: false,
      err: true
    });
  }
};
