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
  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map((plist) => {
      return new Product(plist);
    });
  }

  async addProduct() {
    const addProduct = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    await db.getDb().collection("products").insertOne(addProduct);
  }
}

module.exports = Product;