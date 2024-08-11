const OrderModel = require("../models/order.model.js");

class OrderController {
  async addOrder(req, res) {
    const { userId, productId, amount, deliveryDate, paymentMethod, address } =
      req.query;
    console.log(req.query);
    try {
      const record = new OrderModel({
        userId: userId,
        productId: productId,
        amount: Number(amount),
        paymentMethod: paymentMethod,
        address: address,
        deliveryDate: deliveryDate,
      });
      await record.save();
      console.log("added!");
      res.json({ message: "Order successully placed." });
    } catch (error) {
      res.json({
        message: "Failed to place the order with the error: ",
        error,
      });
    }
  }
}

module.exports = OrderController;
