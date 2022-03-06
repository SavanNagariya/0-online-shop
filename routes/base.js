const express = require("express");
const router = express.Router();

router.get("/404", (req, res) => {
  res.status(404).render("404");
});
router.get("/403", (req, res) => {
  res.status(403).render("403");
});
router.get("/401", (req, res) => {
  res.status(401).render("401");
});

module.exports = router;
