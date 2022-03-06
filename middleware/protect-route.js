protectRoute = (req, res, next) => {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.status(403).render("403");
  }
  next();
};

module.exports = protectRoute;
