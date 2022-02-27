const db = require("../data/database");
const { ObjectId } = require("mongodb");

getHome = async (req, res) => {
  const products = await db.getDb().collection("products").find().toArray();
  res.render("user/products", { products: products });
};
getProductDetails = async (req, res) => {
  const id = req.params.id;

  const product = await db
    .getDb()
    .collection("products")
    .findOne({ _id: ObjectId(id) });
  res.render("user/product-details", { product: product });
};
getMyOrders = (req, res) => {
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
