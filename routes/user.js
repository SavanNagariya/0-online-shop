const express = require("express");
const router = express.Router();

const webPages = require("../controller/user.controller");

router.get("/", webPages.getHome);
router.get("/product-detail/:id", webPages.getProductDetails);
router.get("/my-orders", webPages.getMyOrders);
router.get("/shopping-cart", webPages.getShopCart);

module.exports = router;
