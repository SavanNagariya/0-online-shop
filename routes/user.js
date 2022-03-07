const express = require("express");
const router = express.Router();

const webPages = require("../controller/user.controller");
const cart = require("../controller/cart.controller");

router.get("/", webPages.getHome);
router.get("/product-detail/:id", webPages.getProductDetails);
router.get("/my-orders", webPages.getMyOrders);
router.get("/shopping-cart", cart.getCart);
router.post("/shopping-cart", cart.addCartItem);
router.patch("/shopping-cart", cart.updateCart);

module.exports = router;

