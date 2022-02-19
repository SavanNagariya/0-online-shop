const express = require("express");
const router = express.Router();

router.get("/login");
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;    