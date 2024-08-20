const CartModel = require("../models/cart.model.js");
const ProductModel = require("../models/products.model.js");

class CartController {
  async addToCart(req, res) {
    const { userId, productId } = req.query;

    try {
      const product = await ProductModel.findOne({ _id: productId });
      // console.log(product);
      const record = new CartModel({
        userId: userId,
        productId: product._id,
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        discountPercentage: product.discountPercentage,
      });
      await record.save();
      res.json({ message: "Successfully added to the cart." });
    } catch (error) {
      res.json({
        message: "Failed to add to the cart with the error: ",
        error,
      });
    }
  }

  async getCartProducts(req, res) {
    const { userId } = req.query;

    try {
      const products = await CartModel.find({ userId: userId });
      res.json({ products });
    } catch (error) {
      res.json({ message: "Failed to fetch the products with error: ", error });
    }
  }

  async updateProductQuantity(req, res) {
    const { userId, productId, value } = req.query;

    const product = await ProductModel.findOne({ _id: productId });
    const cartProduct = await CartModel.findOne({
      $and: [{ userId: userId }, { productId: productId }],
    });

    let newQuantity;
    let newStock;

    console.log(cartProduct);

    try {
      if (value === "1") {
        if (product.stock >= cartProduct.quantity) {
          newQuantity = cartProduct.quantity + 1;
          console.log(newQuantity);
          newStock = product.stock - 1;
        }
      }

      if (value === "-1") {
        if (cartProduct.quantity > 1) {
          newQuantity = cartProduct.quantity - 1;
          newStock = product.stock + 1;
        }
      }

      await CartModel.updateOne(
        { $and: [{ userId: userId }, { productId: productId }] },
        { $set: { quantity: newQuantity } }
      );
      await ProductModel.updateOne(
        { _id: productId },
        { $set: { stock: newStock } }
      );

      const updatedCartProduct = await CartModel.find({ userId: userId });
      res.json({ products: updatedCartProduct });
    } catch (error) {
      res.json({
        message: "Failed to update the quantity with the error: ",
        error,
      });
    }
  }

  async deleteCartProduct(req, res) {
    const { productId } = req.query;

    try {
      await CartModel.deleteOne({ _id: productId });
      res.json({ message: "Successfully deleted cart item." });
    } catch (error) {
      res.json({ message: "Failed to delete the item with error", error });
    }
  }

  async emptyCart(req, res) {
    const { userId } = req.query;
    console.log(req.query);
    try {
      await CartModel.deleteMany({ userId });
      console.log("deleted all!");
      res
        .status(200)
        .json({ message: "Successfully deleted all items from the cart." });
    } catch (error) {
      res.json({
        message: "Failed the empty the cart with the error: ",
        error,
      });
    }
  }
}

module.exports = CartController;
