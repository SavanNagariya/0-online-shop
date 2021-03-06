const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;

const storage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(null, uuid() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

const administration = require("../controller/admin.controller");

router.get("/products", administration.getAdminProducts);

router.get("/update-product/:id", administration.getAdminProductUpdate);

router.post(
  "/update-product/:id",
  upload.single("image"),
  administration.postAdminProductUpdate
);

router.get("/products/new", administration.getAdminAddProduct);

router.post(
  "/products",
  upload.single("image"),
  administration.postAdminAddProduct
);

router.delete("/products/:id", administration.deleteProduct);
router.get("/orders", administration.getMyOrders);
router.patch("/orders/:id", administration.patchOrderUpdate);

module.exports = router;
