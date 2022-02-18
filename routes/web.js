const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("products");
});
router.get("/product-details", (req, res) => {
  res.render("product-details");
});
router.get("/my-orders", (req, res) => {
  res.render("my-orders");
});
router.get("/shopping-cart", (req, res) => {
  res.render("shopping-cart");
});
