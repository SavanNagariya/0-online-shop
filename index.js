const express = require("express");
const path = require("path");

const app = express();

const routeAuth = require("./routes/auth");
const routeWebPage = require("./routes/webpage");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(routeWebPage);
app.use(routeAuth);

app.listen(2000);
