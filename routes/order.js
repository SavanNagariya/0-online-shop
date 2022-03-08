const express = require("express");
const router = express.Router();

const orders = require("../controller/orders.controller");

router.get("/my-orders", orders.getMyOrders);
router.post("/my-orders", orders.postMyOrders);

module.exports = router;
