const db = require("../data/database");

getHome = async (req, res) => {
  const products = await db.getDb().collection("products").find().toArray();
  res.render("user/products", { products: products });
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
