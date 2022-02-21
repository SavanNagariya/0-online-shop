const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.fieldname);
  },
});

const upload = multer({});
const router = express.Router();

const administration = require("../models/administration");

router.get("/admin/products", administration.getAdminProducts);
router.get("/admin/products/new", administration.getAdminAddProduct);
router.get("/admin/update-product", administration.getAdminProductUpdate);
router.get("/admin/orders", administration.getAdminOrders);

module.exports = router;
