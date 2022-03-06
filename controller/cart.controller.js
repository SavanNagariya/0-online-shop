const Product = require("../models/administration");

addCartItem = async (req, res) => {
  let product = await Product.findById(productId);
  res.locals.cart.addItem(product);
};

module.exports = {
  addCartItem: addCartItem,
};
