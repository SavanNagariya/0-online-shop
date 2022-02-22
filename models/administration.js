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
  const id = ObjectId(req.params.id);
  const title = req.body.title;
  const summary = req.body.summary;
  const price = req.body.price;
  const description = req.body.description;
  const file = req.file;

  const productUpdate = await db
    .getDb()
    .collection("products")
    .updateOne(
      { _id: id },
      {
        $set: {
          title: title,
          summary: summary,
          price: price,
          description: description,
        },
      }
    );

  res.redirect("/admin/products");
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
  postAdminProductUpdate: postAdminProductUpdate,
  getAdminOrders: getAdminOrders,
  getAdminAddProduct: getAdminAddProduct,
  postAdminAddProduct: postAdminAddProduct,
};
