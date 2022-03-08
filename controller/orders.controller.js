const Orders = require("../models/orders");
const Product = require("../models/authentication");

getMyOrders = (req, res) => {
  res.render("orders/orders");
};
postMyOrders = async (req, res, next) => {
  const cart = res.locals.cart;
  let productDoc;
  try {
    productDoc = await Product.findById(res.locals.uid);
  } catch (error) {
    console.log("orders productDocument is not found");
    next(error);
    return;
  }
  const orders = new Orders(cart, productDoc);

  try {
    await orders.save();
  } catch (error) {
    console.log("order save");
    next(error);
    return;
  }

  req.session.cart = null;
  res.redirect("/orders");
};

module.exports = {
  getMyOrders: getMyOrders,
  postMyOrders: postMyOrders,
};
