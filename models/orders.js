const { ObjectId } = require("mongodb");
const db = require("../data/database");

class Orders {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    this.id = orderId;
  }
  static formateDocumentOrder(ordersDoc) {
    return new Orders(
      ordersDoc.productData,
      ordersDoc.userData,
      ordersDoc.status,
      ordersDoc.date,
      ordersDoc._id
    );
  }

  static formateDocumentOrders(ordersDoc) {
    return ordersDoc.map(this.formateDocumentOrder);
  }

  static async findAll() {
    const orders = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();
    return this.formateDocumentOrders(orders);
  }

  static async findAllForUser(userId) {
    const id = ObjectId(userId);
    const orders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": id })
      .sort({ _id: -1 })
      .toArray();
    return this.formateDocumentOrders(orders);
  }

  static async findById(userId) {
    const id = ObjectId(userId);
    const orders = await db.getDb().collection("orders").findOne({ _id: id });
    return this.formateDocumentOrder(orders);
  }

  save() {
    if (this.id) {
      const id = ObjectId(this.id);
      return db
        .getDb()
        .collection("orders")
        .updateOne({ _id: id }, { $set: { status: this.status } });
    } else {
      const orderDoc = {
        productData: this.productData,
        userData: this.userData,
        status: this.status,
        date: new Date(),
      };
      return db.getDb().collection("orders").insertOne(orderDoc);
    }
  }
}

module.exports = Orders;
