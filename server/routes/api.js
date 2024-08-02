const express = require("express");
const ProductController = require("../src/controllers/products.controller.js");
const uploadFile = require("../src/middlewares/file-upload.middleware.js");
const router = express.Router();

const productController = new ProductController();

//create your api routes here.
router.get("/", (req, res) => {
  res.send("We are live.");
});

router.post(
  "/add-products/",
  uploadFile.single("photo"),
  productController.addProducts
);
// router.get("/get-products/:id", productController.getSpecificProduct);
router.get("/get-products/", productController.getAllProducts);
router.put("/edit-product/", productController.editProduct);
router.delete("/delete-product/:id", productController.deleteProduct);

module.exports = router;
