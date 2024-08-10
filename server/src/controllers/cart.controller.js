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
      console.log(products);
      res.json({ products });
    } catch (error) {
      res.json({ message: "Failed to fetch the products with error: ", error });
    }
  }
}

module.exports = CartController;
