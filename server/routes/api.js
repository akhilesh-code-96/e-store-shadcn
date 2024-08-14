const express = require("express");
const ProductController = require("../src/controllers/products.controller.js");
const uploadFile = require("../src/middlewares/file-upload.middleware.js");
const UserController = require("../src/controllers/user.controller.js");
const AddressController = require("../src/controllers/address.controller.js");
const CartController = require("../src/controllers/cart.controller.js");
const auth = require("../src/middlewares/auth.middleware.js");
const OrderController = require("../src/controllers/order.controller.js");
const router = express.Router();

const productController = new ProductController();
const userController = new UserController();
const addressController = new AddressController();
const cartController = new CartController();
const orderController = new OrderController();

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

// user routes
router.post("/register/", userController.addUser);
router.get("/login-user/", userController.loginUser);
router.post("/logout/", userController.logoutUser);
router.get("/get-users/", userController.getUsers);
router.delete("/delete-account/", userController.deleteUser);

// address routes
router.post("/add-address/", addressController.addAddress);
router.get("/get-addresses/", addressController.getAddresses);

// cart routes
router.post("/add-to-cart/", cartController.addToCart);
router.get("/get-cart-products/", auth, cartController.getCartProducts);
router.put("/update-quantity/", auth, cartController.updateProductQuantity);
router.delete("/delete-cart-product/", auth, cartController.deleteCartProduct);
router.delete("/empty-cart/", auth, cartController.emptyCart);

// order routes
router.post("/place-order/", orderController.addOrder);
router.get("/get-orders/", orderController.getOrders);

module.exports = router;
