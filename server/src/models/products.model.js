const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    category: { type: String, enum: ["beauty", "furniture", "fragrances"] },
    price: { type: Number },
    imageUrl: { type: String },
    discountPercentage: { type: Number },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    brand: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
