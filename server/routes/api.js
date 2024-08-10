const express = require("express");
const ProductController = require("../src/controllers/products.controller.js");
const uploadFile = require("../src/middlewares/file-upload.middleware.js");
const UserController = require("../src/controllers/user.controller.js");
const AddressController = require("../src/controllers/address.controller.js");
const CartController = require("../src/controllers/cart.controller.js");
const router = express.Router();

const productController = new ProductController();
const userController = new UserController();
const addressController = new AddressController();
const cartController = new CartController();

//create your api routes here.
router.get("/", (req, res) => {
  res.send("We are live.");
});

router.post(
  "/add-products/",
  uploadFile.single("photo"),
  productController.addProducts
);

// product routes
router.get("/get-products/", productController.getAllProducts);
router.put("/edit-product/", productController.editProduct);
router.delete("/delete-product/:id", productController.deleteProduct);
router.put("/update-quantity/", productController.updateCartQuantity);

// user routes
router.post("/register/", userController.addUser);
router.get("/get-user/", userController.getUser);

// address routes
router.post("/add-address/", addressController.addAddress);
router.get("/get-addresses", addressController.getAddresses);

// cart routes
router.post("/add-to-cart", cartController.addToCart);
router.get("/get-cart-products", cartController.getCartProducts);

module.exports = router;
