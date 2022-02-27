errorHandler = (error, req, res, next) => {
  res.status(500).render("500");
};
module.exports = errorHandler;
