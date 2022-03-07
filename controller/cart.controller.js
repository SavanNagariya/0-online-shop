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
updateCart = (req, res) => {
  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
    req.body.productId,
    req.body.quantity
  );
  req.session.cart = cart;

  res.json({
    message: "item updated",
    updateCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
};

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCart: updateCart,
};
