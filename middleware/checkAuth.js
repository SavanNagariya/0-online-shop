checkAuthStatus = (req, res, next) => {
  const uid = req.session.user;
  const isAdmin = req.session.isAdmin;
  const isAuth = req.session.isAuth;

  if (!uid) {
    return next();
  }

  res.locals.isAdmin = isAdmin;
  res.locals.uid = uid;
  res.locals.isAuth = isAuth;
  next();
};

module.exports = checkAuthStatus;
