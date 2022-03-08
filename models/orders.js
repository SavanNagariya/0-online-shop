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

  save() {
    if (this.id) {
      // updating orders
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
