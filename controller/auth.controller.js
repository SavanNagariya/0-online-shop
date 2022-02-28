const User = require("../models/authentication");
const authSession = require("../util/authentication");
const validation = require("../util/validation");

getLogin = (req, res) => {
  res.render("login");
};

postLogin = async (req, res, next) => {
  const user = new User(req.body);
  let existingUser;
  try {
    existingUser = await user.login();
  } catch (error) {
    console.log("postLogin");
    next(error);
    return;
  }

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
  if (
    !validation.userInputValid(
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.postalcode,
      req.body.street,
      req.body.city
    ) ||
    validation.confirmationEmail(req.body.email, req.body.emailConfirm)
  ) {
    res.redirect("/signup");
    return;
  }
  console.log(
    validation.confirmationEmail(req.body.email, req.body.emailConfirm)
  );

  const user = new User(req.body);

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      res.redirect("/signup");
      return;
    }

    await user.signup();
  } catch (error) {
    console.log("signup");
    next(error);
    return;
  }
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
