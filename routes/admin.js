const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

const administration = require("../models/administration");

router.get("/admin/products", administration.getAdminProducts);
router.get("/admin/update-product/:id", administration.getAdminProductUpdate);
router.post(
  "/admin/update-product/:id",
  upload.single("image"),
  administration.postAdminProductUpdate
);
router.get("/admin/orders", administration.getAdminOrders);
router.get("/admin/products/new", administration.getAdminAddProduct);
router.post(
  "/admin/products/new",
  upload.single("image"),
  administration.postAdminAddProduct
);

module.exports = router;
