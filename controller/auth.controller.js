const User = require("../models/authentication");
const authSession = require("../util/authentication");


getLogin = (req, res) => {
  res.render("login");
};

postLogin = async (req, res) => {
  const user = new User(req.body);

  const existingUser = await user.login();

  if (!existingUser) {
    return res.redirect("/login");
  }

  const correctPassword = await user.comparePassword(existingUser.password);

  if (!correctPassword) {
    return res.redirect("/login");
  }
  if (req.session.isAdmin) {
    authSession.createAuthSession(req, existingUser, () => {
      res.redirect("/admin/products");
    });
  } else {
    authSession.createAuthSession(req, existingUser, () => {
      res.redirect("/");
    });
  }
};

getSignup = (req, res) => {
  res.render("signup");
};

postSignup = async (req, res, next) => {
  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body.confirmEmail;
  const enteredPassword = req.body.password;
  const enteredName = req.body.name;
  const enteredStreet = req.body.street;
  const enteredPostalcode = req.body.postalcode;
  const enteredCity = req.body.city;

  const user = new User(req.body);
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

  await user.signup();

  res.redirect("/login");
};
logout = (req, res) => {
  authSession.authLogout(req);
  res.redirect("/login");
};

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  logout: logout,
};
