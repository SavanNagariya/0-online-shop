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

module.exports = {
  getAdminProducts: getAdminProducts,
  getAdminProductUpdate: getAdminProductUpdate,
  getAdminOrders: getAdminOrders,
  getAdminAddProduct: getAdminAddProduct,
};
