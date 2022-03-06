const express = require("express");
const path = require("path");
const session = require("express-session");
const csrf = require("csurf");

const db = require("./data/database");
const sessionConfig = require("./config/session");
const routeAuth = require("./routes/auth");
const routeUser = require("./routes/user");
const routeAdmin = require("./routes/admin");
const cartSessionMiddleware = require("./middleware/cartSession");
const protectRouteMiddleware = require("./middleware/protect-route");
const addCsrfAttackToken = require("./middleware/csrfAttackToken");
const errorHandler = require("./middleware/errorHandler");
const checkAuthStatus = require("./middleware/checkAuth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/images/assent", express.static("images"));

app.use(session(sessionConfig()));
app.use(csrf());
app.use(cartSessionMiddleware);
app.use(addCsrfAttackToken);
app.use(checkAuthStatus);

app.use(routeUser);
app.use(routeAuth);
app.use(protectRouteMiddleware);
app.use("/admin", routeAdmin);

app.use(errorHandler);
db.connection().then(function () {
  app.listen(2000);
});
