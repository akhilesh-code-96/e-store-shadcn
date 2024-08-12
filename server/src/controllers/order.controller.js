const OrderModel = require("../models/order.model.js");
const UserModel = require("../models/user.model.js");
const sendMail = require("../mail.js");

class OrderController {
  async addOrder(req, res) {
    const {
      userId,
      productIds,
      amount,
      deliveryDate,
      paymentMethod,
      address,
      quantities,
    } = req.query;
    const parsedAddress = JSON.parse(address);
    const parsedProductIds = JSON.parse(productIds);
    const parsedQuantities = quantities ? JSON.parse(quantities) : [];
    const stringAddress = `${parsedAddress.houseNo}, ${parsedAddress.streetAddress}, ${parsedAddress.city}, ${parsedAddress.state}, ${parsedAddress.country}, ${parsedAddress.pincode}`;
    const mobileNumber = parsedAddress.mobileNumber;

    try {
      const products = parsedProductIds.map((id, index) => ({
        productId: id,
        quantity: parsedQuantities[index] || 1, // Default quantity to 1 if not provided
      }));

      const record = new OrderModel({
        userId: userId,
        products: products,
        amount: Number(amount),
        paymentMethod: paymentMethod,
        address: stringAddress,
        deliveryDate: deliveryDate,
        mobileNumber: mobileNumber,
      });

      await record.save();

      const user = await UserModel.findOne({ _id: userId });
      const email = user.email;
      console.log("added!");

      sendMail(email);
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
