const Cart = require("../models/cart");

cartSession = (req, res, next) => {
  let cart;
  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const cartItem = req.session.cart;
    cart = new Cart(
      cartItem.items,
      cartItem.totalQuantity,
      cartItem.totalPrice
    );
  }

  res.locals.cart = cart;
  next();
};

module.exports = cartSession;
