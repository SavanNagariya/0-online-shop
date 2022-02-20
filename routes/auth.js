const express = require("express");
const router = express.Router();
const authentication = require("../models/authentication");

router.get("/login", authentication.getLogin);
router.post("/login", authentication.postLogin);
router.get("/signup", authentication.getSignup);
router.post("/signup", authentication.postSignup);
router.post("/logout", authentication.logout);

module.exports = router;    