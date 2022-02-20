const express = require("express");
const router = express.Router();

const administration = require("../models/administration");

router.get("/admin/products", administration.getAdminProducts);
router.get("/admin/products/new", administration.getAdminAddProduct);
router.get("/admin/update-product", administration.getAdminProductUpdate);
router.get("/admin/orders", administration.getAdminOrders);

module.exports = router;
