const stripe = require("stripe")(
  "sk_test_51KbsIESHt8UxaQHlTLDhBHbZtDHICk0IbxCntt8wvtGut2m0CBeq0pgvVJlCfExuqlsZgoIF84qcQZ9hqPeQB1uA00drKHvKkD"
);

const Orders = require("../models/orders");
const User = require("../models/authentication");

getMyOrders = async (req, res, next) => {
  try {
    const orders = await Orders.findAllForUser(res.locals.uid);
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

  const session = await stripe.checkout.sessions.create({
    line_items: cart.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price * 100,
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `http://localhost:2000/success`,
    cancel_url: `http://localhost:2000/cancel`,
  });

  res.redirect(303, session.url);
};

getSuccess = (req, res) => {
  res.render("success");
};

getCancel = (req, res) => {
  res.render("cancel");
};

module.exports = {
  getMyOrders: getMyOrders,
  postMyOrders: postMyOrders,
  getSuccess: getSuccess,
  getCancel: getCancel,
};
