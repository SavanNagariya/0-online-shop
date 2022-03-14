const express = require("express");
const router = express.Router();

const orders = require("../controller/orders.controller");

router.get("/orders", orders.getMyOrders);
router.post("/orders", orders.postMyOrders);
router.get("/success", orders.getSuccess);
router.get("/cancel", orders.getCancel);

module.exports = router;
