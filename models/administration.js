const db = require("../data/database");
class Product {
  constructor(requireData) {
    this.title = requireData.title;
    this.summary = requireData.summary;
    this.price = +requireData.price;
    this.description = requireData.description;
    this.file = requireData.file;
  }

  async addProduct() {
    const addProduct = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      filePath: this.file,
    };

    await db.getDb().collection("products").insertOne(addProduct);
  }
}

module.exports = Product;