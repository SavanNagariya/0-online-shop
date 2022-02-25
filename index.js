const express = require("express");
const path = require("path");
const db = require("./data/database");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

const routeAuth = require("./routes/auth");
const routeUser = require("./routes/user");
const routeAdmin = require("./routes/admin");

const storeDb = new MongoDBStore({
  url: "mongodb://localhost:27017",
  databaseName: "shop",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "online-shopping",
    store: storeDb,
    resave: false,
    saveUninitialized: false,
  })
);


app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/images/assent", express.static("images"));

app.use(async function (req, res, next) {
  const isAuth = req.session.authentication;
  const user = req.session.user;

  if (!isAuth || !user) {
    return next();
  }

  const userDoc = await db
    .getDb()
    .collection("users")
    .findOne({ _id: user.id });

  const isAdmin = userDoc.isAdmin;
  res.locals.isAdmin = isAdmin;
  res.locals.isAuth = isAuth;
  next();
});

app.use(routeUser);
app.use(routeAuth);
app.use(routeAdmin);

db.connection().then(function () {
  app.listen(2000);
});
