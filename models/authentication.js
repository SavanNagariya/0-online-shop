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
async function postSignup(req, res) {
  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body.confirmEmail;
  const enteredPassword = req.body.password;
  const enteredName = req.body.name;
  const enteredStreet = req.body.street;
  const enteredPostalcode = req.body.postalcode;
  const enteredCity = req.body.city;

  if (
    !enteredEmail ||
    !enteredPassword ||
    !enteredConfirmEmail ||
    !enteredName ||
    !enteredPostalcode ||
    !enteredStreet ||
    !enteredCity ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    return res.redirect("/signup");
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  await db.getDb().collection("users").insertOne({
    email: enteredEmail,
    password: hashedPassword,
    name: enteredName,
    street: enteredStreet,
    postalcode: enteredPostalcode,
    city: enteredCity,
  });
  res.redirect("/login");
};

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
};