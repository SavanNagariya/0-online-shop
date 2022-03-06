const db = require("../data/database");
const { ObjectId } = require("mongodb");
const Product = require("../models/administration");

getAdminProducts = async (req, res) => {
  const products = await Product.findAll();
  res.render("admin/products", { products: products });
};

getAdminProductUpdate = async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.render("admin/update-product", { product: product });
};

postAdminProductUpdate = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    console.log("server update");
    next(error);
    return;
  }
  res.redirect("/admin/products");
};

getAdminOrders = (req, res) => {
  res.render("admin/orders");
};

getAdminAddProduct = (req, res) => {
  res.render("admin/new-product");
};

postAdminAddProduct = async (req, res, next) => {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
};

deleteProduct = async (req, res, next) => {
  let product;
  try {
    console.log(req.params.id);
    product = await Product.findById(req.params.id);
    await product.remove();
  } catch (error) {
    console.log("delete error");
    next(error);
    return;
  }

  res.json({ message: "Delete Product" });
};

module.exports = {
  getAdminProducts: getAdminProducts,
  getAdminProductUpdate: getAdminProductUpdate,
  postAdminProductUpdate: postAdminProductUpdate,
  getAdminOrders: getAdminOrders,
  getAdminAddProduct: getAdminAddProduct,
  postAdminAddProduct: postAdminAddProduct,
  deleteProduct: deleteProduct,
};
