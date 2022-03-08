const Orders = require("../models/orders");
const User = require("../models/authentication");

getMyOrders = async (req, res, next) => {
  let orders;
  try {
    orders = await Orders.findAllForUser(res.locals.uid);
    res.render("orders/orders", { orders: orders });
  } catch (error) {
    console.log("find all orders error");
    next(error);
    return;
  }
};
postMyOrders = async (req, res, next) => {
  const cart = res.locals.cart;
  let userDoc;
  try {
    userDoc = await User.findById(res.locals.uid);
  } catch (error) {
    console.log("orders userDocument is not found");
    next(error);
    return;
  }
  const orders = new Orders(cart, userDoc);

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
