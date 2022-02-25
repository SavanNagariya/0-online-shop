const db = require("../data/database");
const { ObjectId } = require("mongodb");

getAdminProducts = async (req, res) => {
  const products = await db.getDb().collection("products").find().toArray();

  res.render("admin/products", { products: products });
};

getAdminProductUpdate = async (req, res) => {
  const id = req.params.id;
  const product = await db
    .getDb()
    .collection("products")
    .findOne({ _id: ObjectId(id) });

  res.render("admin/update-product", { product: product });
};

postAdminProductUpdate = async (req, res) => {
  // const updateData = Object.assign({});
  let file;
  if (req.file) {
    file = req.file.filename;
  }
  const productData = {
    title: req.body.title,
    summary: req.body.summary,
    price: req.body.price,
    description: req.body.description,
    filePath: file,
  };

  if (req.params.id) {
    const id = ObjectId(req.params.id);

    if (!productData.filePath) {
      delete productData.filePath;
    }

    await db
      .getDb()
      .collection("products")
      .updateOne({ _id: id }, { $set: productData });
  } else {
    await db.getDb().collection("products").insertOne(productData);
  }
  res.redirect("/admin/products");
};

getAdminOrders = (req, res) => {
  res.render("admin/orders");
};

getAdminAddProduct = (req, res) => {
  res.render("admin/new-product");
};

postAdminAddProduct = async (req, res) => {
  const file = req.file.filename;
  const enteredTitle = req.body.title;
  const enteredSummary = req.body.summary;
  const enteredPrice = +req.body.price;
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
    filePath: file,
  });
  res.redirect("/admin/products");
};

deleteProduct = async (req, res) => {
  if (req.params.id) {
    const id = ObjectId(req.params.id);
    console.log(id);
    await db.getDb().collection("products").deleteOne({ _id: id });
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
