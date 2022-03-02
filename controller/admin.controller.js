const db = require("../data/database");
const { ObjectId } = require("mongodb");
const Product = require("../models/administration");

getAdminProducts = async (req, res) => {
  const products = await Product.findAll();

  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }
  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  res.render("admin/products", { products: products });
};

getAdminProductUpdate = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }
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
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }
  res.render("admin/orders");
};

getAdminAddProduct = (req, res) => {
  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }
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

deleteProduct = async (req, res) => {
  if (req.params.id) {
    const id = ObjectId(req.params.id);
    await db.getDb().collection("products").deleteOne({ _id: id });
  }

  if (!res.locals.isAuth) {
    return res.status(401).render("401");
  }

  if (!res.locals.isAdmin) {
    return res.status(403).render("403");
  }

  res.redirect("/admin/products");
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
