const UserModel = require("../models/user.model.js");
const OrderModel = require("../models/order.model.js");
const CartModel = require("../models/cart.model.js");
const AddressModel = require("../models/address.model.js");
const QueryModel = require("../models/query.model.js");

class UserController {
  async addUser(req, res) {
    const { firstname, lastname, email, password } = req.body;
    try {
      const record = await new UserModel({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      await record.save();
      res.status(200).json({ message: "Successfully added the user" });
    } catch (error) {
      res.json({ message: "Failed to add the user with error", error });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.query;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        const userPassword = user.password;
        if (password === userPassword) {
          req.session.userEmail = email;
          res.status(200).json({ user });
        } else {
          throw new Error("User not found.");
        }
      } else {
        throw new Error("User doesn't exist.");
      }
    } catch (error) {
      res.json({ message: error });
    }
  }

  async getUsers(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    try {
      // Apply skip and limit on the query before executing it
      const users = await UserModel.find().skip(skip).limit(limitNum);

      // Get the total count of documents
      const totalCount = await UserModel.countDocuments({});

      res.json({
        users: users,
        count: totalCount,
        totalPages: Math.ceil(totalCount / limitNum),
      });
    } catch (error) {
      res.json({
        message: "Failed to fetch the users with the error: ",
        error,
      });
    }
  }

  async logoutUser(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "User succesfully logged out." });
      }
    });
  }

  async deleteUser(req, res) {
    const { id } = req.query;

    try {
      await UserModel.deleteOne({ _id: id });

      // delete all the documents related to this user.
      await AddressModel.deleteMany({ userId: id });
      await CartModel.deleteMany({ userId: id });
      await OrderModel.deleteMany({ userId: id });
      res.json({ message: "User successfully deleted." });
    } catch (error) {
      res.json({
        message: "Failed to delete the user with the error: ",
        error,
      });
    }
  }

  async storeUserQuery(req, res) {
    const { email } = req.body;
    try {
      const record = await QueryModel({
        email: email,
      });

      record.save();
      res.json({ message: "Successfully stored the email." });
    } catch (error) {
      res.json({
        message: "Failed to the store the user email with the error: ",
        error,
      });
    }
  }
}

module.exports = UserController;
