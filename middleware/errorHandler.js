errorHandler = (error, req, res, next) => {
  res.status(500).render("user/500");
};
module.exports = errorHandler;
