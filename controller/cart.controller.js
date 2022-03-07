const Product = require("../models/administration");
getCart = (req, res, next) => {
  res.render("user/shopping-cart");
};

addCartItem = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    console.log("cart item id not found");
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "updated cart",
    newTotalItem: cart.totalQuantity,
  });
};

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
};
