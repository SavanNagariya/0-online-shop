getHome = (req, res) => {
  res.render("user/products");
};
getProductDetails = (req, res) => {
  res.render("user/product-details");
};
getMyOrders = (req, res) => {
  if (!req.session.isAuthentication) {
    res.status(404).render("404");
    return;
  }
  res.render("user/my-orders");
};
getShopCart = (req, res) => {
  res.render("user/shopping-cart");
};

module.exports = {
  getHome: getHome,
  getProductDetails: getProductDetails,
  getMyOrders: getMyOrders,
  getShopCart: getShopCart,
};
