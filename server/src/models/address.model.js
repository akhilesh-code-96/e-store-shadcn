const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    country: { type: String, required: true },
    name: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    pincode: { type: Number, required: true },
    houseNo: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
