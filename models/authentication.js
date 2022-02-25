const db = require("../data/database");
const bcrypt = require("bcryptjs");

getLogin = (req, res) => {
  res.render("login");
};
postLogin = async (req, res) => {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });
  
  if (!user.email || !enteredPassword) {
    return res.redirect("/login");
  }

  const password = await bcrypt.compare(enteredPassword, user.password);

  req.session.user = { id: user._id, email: user.email };
  if (res.locals.isAdmin) {
    req.session.save(() => {
      res.redirect("/admin/products");
      return;
    });
  }
  res.locals.iaAuth;
  req.session.save(() => {
    res.redirect("/my-orders");
    return;
  });

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

  if (
    !enteredEmail ||
    !enteredPassword ||
    enteredPassword.trim().length < 6 ||
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
logout = (req, res) => {
  req.session.user = null;
  req.session.isAuthentication = false;
  res.redirect("/");
};

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  logout: logout,
};