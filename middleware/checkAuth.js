checkAuthStatus = (req, res, next) => {
  const uid = req.session.user;
  const isAdmin = req.session.isAdmin;
  if (!uid) {
    return next();
  }

  res.locals.isAdmin = isAdmin;
  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
};

module.exports = checkAuthStatus;
