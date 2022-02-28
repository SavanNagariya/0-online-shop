const User = require("../models/authentication");
const authSession = require("../util/authentication");
const validation = require("../util/validation");
const flashSession = require("../util/sessionFlash");

getLogin = (req, res) => {
  const existingUser = flashSession.getFlashSession(req);

  if (!existingUser) {
    existingUser = {
      email: "",
      password: "",
    };
  }

  res.render("login", { existingUser: existingUser });
};

postLogin = async (req, res, next) => {
  const user = new User(req.body);
  let existingUser;
  try {
    existingUser = await user.login();
  } catch (error) {
    console.log("postLoginData");
    next(error);
    return;
  }

  if (!existingUser) {
    flashSession.errorFlashSessionData(
      req,
      {
        errorMessage: "Email is not exists, please try different email",
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect("/login");
      }
    );
    return;
  }

  const correctPassword = await user.comparePassword(existingUser.password);

  if (!correctPassword) {
    flashSession.errorFlashSessionData(
      req,
      {
        errorMessage: "Password is Wrong, Please enter valid password!",
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect("/login");
      }
    );
    return;
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
  const sessionData = flashSession.getFlashSession(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      emailConfirm: "",
      password: "",
      name: "",
      postalcode: "",
      street: "",
      city: "",
    };
  }

  res.render("signup", { errorMessage: sessionData });
};

postSignup = async (req, res, next) => {
  const enterData = {
    email: req.body.email,
    emailConfirm: req.body["confirm-email"],
    password: req.body.password,
    name: req.body.name,
    postalcode: req.body.postalcode,
    street: req.body.street,
    city: req.body.city,
  };
  console.log(enterData);
  if (
    !validation.userInputValid(
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.postalcode,
      req.body.street,
      req.body.city
    ) ||
    !validation.confirmationEmail(req.body.email, req.body["confirm-email"])
  ) {
    flashSession.errorFlashSessionData(
      req,
      {
        errorMessage:
          "Please check your input, password minimum 6 letters, postalCode minimum 5 letters",
        ...enterData,
      },
      () => {
        res.redirect("/signup");
      }
    );
    return;
  }

  const user = new User(req.body);

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      flashSession.errorFlashSessionData(
        req,
        {
          errorMessage: "User is Already exists!",
          ...enterData,
        },
        () => {
          res.redirect("/signup");
        }
      );
      return;
    }

    await user.signup();
  } catch (error) {
    console.log("signupData");
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
