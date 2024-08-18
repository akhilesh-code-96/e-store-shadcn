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
    const { id, addId } = req.query;

    let queryObject = {};
    let apiData;

    if (id) {
      queryObject.userId = id;
      apiData = await AddressModel.find(queryObject);
    }

    if (addId) {
      queryObject._id = addId;
      apiData = await AddressModel.findOne(queryObject);
    }

    try {
      const addresses = apiData;
      res.json({ addresses });
    } catch (error) {
      res.json({ message: "Failed to fetch the address with error", error });
    }
  }

  async updateAddress(req, res) {
    const { id, userId } = req.query;
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

    const newDocument = {
      userId: userId,
      country: country,
      name: fullName,
      mobileNumber: Number(mobileNumber),
      pincode: Number(pincode),
      houseNo: houseNo,
      streetAddress: streetAddress,
      city: city,
      state: state,
    };
    try {
      await AddressModel.replaceOne({ _id: id }, newDocument);
      res.json({ message: "Successfuly updated the address" });
    } catch (error) {
      res.json({
        message: "Failed to update the address with the error",
        error,
      });
    }
  }

  async deleteAddress(req, res) {
    const { id } = req.query;

    try {
      await AddressModel.deleteOne({ _id: id });
      res.json({ message: "Successfully deleted the address" });
    } catch (error) {
      res.json({
        message: "Failed to delete the address with the error: ",
        error,
      });
    }
  }
}

module.exports = AddressController;
