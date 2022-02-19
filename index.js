const express = require("express");
const path = require("path");
const db = require("./data/database");

const app = express();

const routeAuth = require("./routes/auth");
const routeWebPage = require("./routes/webpage");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(routeWebPage);
app.use(routeAuth);

db.connection().then(function () {
  app.listen(2000);
});
