const db = require("../data/database");

getAdminProducts = async (req, res) => {
  const products = await db.getDb().collection("products").find().toArray();
  res.render("admin/products", { products: products });
};
getAdminProductUpdate = (req, res) => {
  res.render("admin/update-product");
};
getAdminOrders = (req, res) => {
  res.render("admin/orders");
};
getAdminAddProduct = (req, res) => {
  res.render("admin/new-product");
};
postAdminAddProduct = async (req, res) => {
  const file = req.file;
  const enteredTitle = req.body.title;
  const enteredSummary = req.body.summary;
  const enteredPrice = req.body.price;
  const enteredDescription = req.body.description;

  if (
    !file ||
    !enteredTitle ||
    !enteredSummary ||
    !enteredPrice ||
    !enteredDescription
  ) {
    res.redirect("/admin/products/new");
    return;
  }

  await db.getDb().collection("products").insertOne({
    title: enteredTitle,
    summary: enteredSummary,
    price: enteredPrice,
    description: enteredDescription,
    filePath: file.path,
  });
  res.redirect("/admin/products");
};

module.exports = {
  getAdminProducts: getAdminProducts,
  getAdminProductUpdate: getAdminProductUpdate,
  getAdminOrders: getAdminOrders,
  getAdminAddProduct: getAdminAddProduct,
  postAdminAddProduct: postAdminAddProduct,
};
