const db = require("../data/database");
const bcrypt = require("bcryptjs");

getLogin = (req, res) => {
  res.render("login");
};
postLogin = (req, res) => {
  res.render("login");
};
getSignup = (req, res) => {
  res.render("signup");
};
postSignup = async (req, res) => {
  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body.confirmEmail;
  const enteredPassword = req.body.password;
  const enteredName = req.body.name;
  const enteredStreet = req.body.street;
  const enteredPostalcode = req.body.postalcode;
  const enteredCity = req.body.city;

  await db.getDb().collection("signup").insertOne();
  res.redirect("/login");
};

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
};