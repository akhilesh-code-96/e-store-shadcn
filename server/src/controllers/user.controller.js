const UserModel = require("../models/user.model.js");

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
      }
    } catch (error) {
      res.json({ message: error });
    }
  }

  async getUsers(req, res) {
    console.log("User");
    try {
      const users = await UserModel.find();
      console.log(users);
      res.json({ users });
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
}

module.exports = UserController;
