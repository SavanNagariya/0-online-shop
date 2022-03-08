const Product = require("../models/administration");

getHome = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.render("user/products", { products: products });
  } catch (error) {
    console.log(error + "find all products");
    next(error);
    return;
  }
};
getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("user/product-details", { product: product });
  } catch (error) {
    console.log(error + "find product");
    next(error);
    return;
  }
};

getShopCart = (req, res) => {
  res.render("user/shopping-cart");
};

module.exports = {
  getHome: getHome,
  getProductDetails: getProductDetails,
  getShopCart: getShopCart,
};
