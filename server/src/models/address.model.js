const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  country: { type: String, required: true },
  name: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  pincode: { type: Number, required: true },
  houseNo: { type: String, required: true },
  landMark: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
