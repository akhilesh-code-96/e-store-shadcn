const AddressModel = require("../models/address.model.js");

class AddressController {
  async addAddress(req, res) {
    const { userId } = req.query;
    const {
      country,
      name,
      mobileNumber,
      pincode,
      houseNo,
      landMark,
      city,
      state,
    } = req.body;

    try {
      const record = new AddressModel({
        addressId: userId,
        country: country,
        name: name,
        mobileNumber: mobileNumber,
        pincode: pincode,
        houseNo: houseNo,
        landMark: landMark,
        city: city,
        state: state,
      });

      const saveAddress = await record.save();
    } catch (error) {
      res.json({
        message: "Failed to add the address in the database with error",
        error,
      });
    }
  }
}

module.exports = AddressController;
