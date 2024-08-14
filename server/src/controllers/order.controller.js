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
    const { userId, sort = "-createdAt", page = 1, limit = 10 } = req.query;

    const queryObject = {};

    // Add userId to queryObject if it exists
    if (userId) {
      queryObject.userId = userId;
    }

    // Fetch the total count of documents that match the query
    const totalCount = await OrderModel.countDocuments(queryObject);

    // Define the query and populate the necessary fields
    let apiData = OrderModel.find(queryObject);

    apiData = apiData.sort(sort);

    if (userId) {
      apiData = apiData.populate({
        path: "products.productId",
        select: "title price imageUrl", // Select only the fields you need
      });
    } else {
      apiData = apiData.populate({
        path: "userId",
        select: "firstname lastname email",
      });
    }

    // Convert page and limit to numbers and calculate skip
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    try {
      const orders = await apiData.skip(skip).limit(limitNum).exec();

      res.json({
        orders: orders,
        count: totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to fetch the orders with error: ", error });
    }
  }
}

module.exports = OrderController;
