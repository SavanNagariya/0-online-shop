getHome = (req, res) => {
  res.render("products");
};
getProductDetails = (req, res) => {
  res.render("product-details");
};
getMyOrders = (req, res) => {
  if (!req.session.isAuthentication) {
    res.status(404).render("404");
    return;
  }
  res.render("my-orders");
};
getShopCart = (req, res) => {
  res.render("shopping-cart");
};

module.exports = {
  getHome: getHome,
  getProductDetails: getProductDetails,
  getMyOrders: getMyOrders,
  getShopCart: getShopCart,
};
