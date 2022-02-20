const express = require("express");
const router = express.Router();

const webPages = require("../models/users");

router.get("/", webPages.getHome);
router.get("/product-details", webPages.getProductDetails);
router.get("/my-orders", webPages.getMyOrders);
router.get("/shopping-cart", webPages.getShopCart);

module.exports = router;
