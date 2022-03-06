const Product = require("../models/administration");

getHome = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("admin/products", { products: products });
  } catch (error) {
    console.log(error + "find all products");
    next(error);
    return;
  }
};
getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/update-product", { product: product });
  } catch (error) {
    console.log(error + "find product");
    next(error);
    return;
  }
};
getMyOrders = (req, res) => {
  if (!req.session.user) {
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
