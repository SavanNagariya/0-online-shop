const db = require("../data/database");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
class User {
  constructor(userData) {
    this.email = userData.email;
    this.password = userData.password;
    this.name = userData.name;
    this.street = userData.street;
    this.postalcode = userData.postalcode;
    this.city = userData.city;
  }

  static findById(userId) {
    const uid = new ObjectId(userId);
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }
  login() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }
  async existsAlready() {
    const exists = await this.login();
    if (exists) {
      return true;
    }
    return false;
  }
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    const users = {
      email: this.email,
      password: hashedPassword,
      name: this.name,
      street: this.street,
      postalcode: this.postalcode,
      city: this.city,
    };
    await db.getDb().collection("users").insertOne(users);
  }

  comparePassword(userPassword) {
    return bcrypt.compare(this.password, userPassword);
  }
}

module.exports = User;
