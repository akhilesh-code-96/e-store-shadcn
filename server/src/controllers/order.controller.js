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

      // Populate product details
      const populatedRecord = await record.populate({
        path: "products.productId",
        select: "title price imageUrl",
      });

      const user = await UserModel.findOne({ _id: userId });
      const email = user.email;
      console.log("added!");

      sendMail(email, populatedRecord);

      res.json({ message: "Order successully placed." });
    } catch (error) {
      res.json({
        message: "Failed to place the order with the error: ",
        error,
      });
    }
  }

  async getOrders(req, res) {
    const { userId } = req.query;

    const queryObject = {};

    const totalCount = await OrderModel.countDocuments(queryObject);
    let apiData;

    if (userId) {
      queryObject.userId = userId;
      apiData = await OrderModel.find(queryObject).populate({
        path: "products.productId",
        select: "title price imageUrl", // Select only the fields you need
      });
    }

    if (!userId) {
      apiData = await OrderModel.find(queryObject).populate({
        path: "userId",
        select: "firstname lastname email",
      });
    }

    try {
      // Fetch orders and populate product details
      const orders = apiData;

      res.json({ orders: orders, count: totalCount });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch the orders with error: ", error });
    }
  }
}

module.exports = OrderController;