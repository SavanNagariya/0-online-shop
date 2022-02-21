const db = require("../data/database");

getAdminProducts = (req, res) => {
  res.render("admin/products");
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
  const enteredTitle = req.body.title;
  const enteredSummary = req.body.summary;
  const enteredPrice = req.body.price;
  const enteredDescription = req.body.description;

  if (
    !enteredTitle ||
    !enteredSummary ||
    !enteredPrice ||
    !enteredDescription
  ) {
    res.redirect("/admin/products/new");
    return;
  }
  const file = req.file;
  if (!file || file.length === 0) {
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
