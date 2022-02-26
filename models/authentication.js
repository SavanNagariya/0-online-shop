const db = require("../data/database");
const bcrypt = require("bcryptjs");
class User {
  constructor(userData) {
    this.email = userData.email;
    this.password = userData.password;
    this.name = userData.name;
    this.street = userData.street;
    this.postalcode = userData.postalcode;
    this.city = userData.city;
  }

  login() {
    return db.getDb().collection("users").findOne({ email: this.email });
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
