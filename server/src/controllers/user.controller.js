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

  async getUser(req, res) {
    const { email, password } = req.query;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        const userPassword = user.password;
        if (password === userPassword) {
          res.status(200).json({ user });
        } else {
          throw new Error("User not found.");
        }
      }
    } catch (error) {
      res.json({ message: error });
    }
  }
}

module.exports = UserController;
