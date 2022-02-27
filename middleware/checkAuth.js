checkAuthStatus = (req, res, next) => {
  const uid = req.session.user;
  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
};

module.exports = checkAuthStatus;
