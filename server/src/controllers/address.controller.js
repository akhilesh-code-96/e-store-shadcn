const AddressModel = require("../models/address.model.js");

class AddressController {
  async addAddress(req, res) {
    const { id } = req.query;
    const {
      country,
      fullName,
      mobileNumber,
      pincode,
      houseNo,
      streetAddress,
      city,
      state,
    } = req.body;
    console.log(req.body);
    try {
      const record = new AddressModel({
        userId: id,
        country: country,
        name: fullName,
        mobileNumber: Number(mobileNumber),
        pincode: Number(pincode),
        houseNo: houseNo,
        streetAddress: streetAddress,
        city: city,
        state: state,
      });

      await record.save();
      res.json({ message: "Sucessfully added the address." });
    } catch (error) {
      res.json({
        message: "Failed to add the address in the database with error",
        error,
      });
    }
  }

  async getAddresses(req, res) {
    const { id } = req.query;
    try {
      const addresses = await AddressModel.find({ userId: id });
      res.json({ addresses });
    } catch (error) {
      res.json({ message: "Failed to fetch the address with error", error });
    }
  }
}

module.exports = AddressController;
