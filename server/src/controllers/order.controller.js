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

    console.log(req.query);
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
    const { userId, sort = "-createdAt", page = 1, limit = 10, id } = req.query;

    const queryObject = {};

    // Add userId to queryObject if it exists
    if (userId) {
      queryObject.userId = userId;
    }

    if (id) {
      queryObject._id = id;
    }

    // Fetch the total count of documents that match the query
    const totalCount = await OrderModel.countDocuments(queryObject);

    // Define the query and populate the necessary fields
    let apiData = OrderModel.find(queryObject);

    apiData = apiData.sort(sort);

    if (userId || id) {
      apiData = apiData.populate({
        path: "products.productId",
        select: "title price imageUrl discountPercentage", // Select only the fields you need
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

  // Aggregation function to sum sales by day
  async dailyAggregration(req, res) {
    try {
      const dailySales = await OrderModel.aggregate([
        {
          // Project the createdAt field to extract the date only
          $project: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            amount: 1, // Keep the amount field for summing
          },
        },
        {
          // Group by the date and sum the amount
          $group: {
            _id: "$date",
            totalSales: { $sum: "$amount" },
          },
        },
        {
          // Sort by date in descending order
          $sort: { _id: 1 },
        },
      ]);

      // console.log("Daily Sales:", dailySales);
      res.json({ dailySales });
    } catch (error) {
      res.json({ message: "Error aggregating daily sales:", error });
    }
  }

  async categoryAggregation(req, res) {
    try {
      const conversionRate = 84;

      const categorySales = await OrderModel.aggregate([
        // Step 1: Unwind the products array
        { $unwind: "$products" },

        // Step 2: Populate the productId with the price and category fields
        {
          $lookup: {
            from: "products", // Assuming your product collection is named "products"
            localField: "products.productId",
            foreignField: "_id",
            as: "productDetails",
          },
        },

        // Step 3: Unwind the populated productDetails array (as lookup returns an array)
        { $unwind: "$productDetails" },

        // Step 4: Calculate the amount considering discount
        {
          $addFields: {
            salesAmount: {
              $multiply: [
                {
                  $subtract: [
                    "$productDetails.price",
                    {
                      $multiply: [
                        "$productDetails.price",
                        {
                          $divide: ["$productDetails.discountPercentage", 100],
                        },
                      ],
                    },
                  ],
                },
                "$products.quantity",
              ],
            },
          },
        },

        // Step 5: Group by category and sum the total sales for each category
        {
          $group: {
            _id: "$productDetails.category",
            totalSales: { $sum: "$salesAmount" },
          },
        },

        // Step 6: Apply the conversion rate at the end
        {
          $addFields: {
            totalSales: { $multiply: ["$totalSales", conversionRate] },
          },
        },
      ]);

      res.json({ categorySales });
    } catch (error) {
      res.json({ message: "Failed to fetch the data with the error: ", error });
    }
  }
}

module.exports = OrderController;
