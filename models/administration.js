const { ObjectId } = require("mongodb");
const db = require("../data/database");
class Product {
  constructor(requireData) {
    this.title = requireData.title;
    this.summary = requireData.summary;
    this.price = +requireData.price;
    this.description = requireData.description;
    this.image = requireData.image;
    if (requireData._id) {
      this.id = requireData._id.toString();
    }
  }
  static async findById(productId) {
    let prodId;
    try {
      prodId = ObjectId(productId);
    } catch (error) {
      error = "id is not found";
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });
    return new Product(product);
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map((plist) => {
      return new Product(plist);
    });
  }

  async save() {
    const addProduct = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    if (this.id) {
      const id = ObjectId(this.id);

      if (!this.image) {
        delete addProduct.image;
      }

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: id }, { $set: addProduct });
    } else {
      await db.getDb().collection("products").insertOne(addProduct);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
  }
}

module.exports = Product;
