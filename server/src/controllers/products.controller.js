const ProductModel = require("../models/products.model.js");
const uploadImageToCloudinary = require("../utils/cloudinary.js");
// const productJson = require("../../products.json");

class ProductController {
  // refractored the code in order save the order one by one now in the database.
  async addProducts(req, res) {
    const {
      title,
      description,
      category,
      price,
      discountPerctange,
      rating,
      stock,
      brand,
    } = req.body;

    const imagePath = req.file.path;

    // using try and catch as the operation is async.
    // this will save the record in the existing collection.
    try {
      const uploadResult = await uploadImageToCloudinary(imagePath);
      const photoUrl = uploadResult.secure_url;

      let record = new ProductModel({
        title: title,
        description: description,
        category: category,
        price: price,
        imageUrl: photoUrl,
        discountPercentage: discountPerctange,
        rating: rating,
        stock: stock,
        brand: brand,
      });
      // await ProductModel.create(productJson);
      await record.save(); // asynchronously saving the record in the database.
      console.log("added!");
      res.status(200).json({ message: "Successfully added all the products" });
    } catch (error) {
      res
        .status(401)
        .json({ message: "Failed to add the products with error", error }); // check for the error.
    }
  }

  async getAllProducts(req, res) {
    const {
      id,
      brand,
      category,
      range,
      title,
      sort,
      select,
      page = 1,
      limit = 10,
    } = req.query; // Default values for page and limit

    const queryObject = {};

    if (id) {
      queryObject._id = id;
    }

    if (brand && brand.trim() !== "") {
      queryObject.brand = { $regex: brand, $options: "i" };
    }

    if (title && title.trim() !== "") {
      queryObject.title = { $regex: title, $options: "i" };
    }

    if (category) {
      const categories = category.split(",");
      queryObject.category = { $in: categories };
    }

    if (range) {
      queryObject.price = { $lte: range };
    }

    try {
      let apiData = ProductModel.find(queryObject);

      if (sort) {
        const sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
      }

      if (select) {
        const selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
      }

      const pageNum = Number(page);
      const limitNum = Number(limit);
      const skip = (pageNum - 1) * limitNum;

      apiData = apiData.skip(skip).limit(limitNum);

      // Execute the query
      const products = await apiData;
      const totalProds = await ProductModel.countDocuments(queryObject);

      res.status(200).json({ products: products, total: totalProds });
    } catch (error) {
      res.status(500).json({ message: "Failed to get all products", error });
    }
  }

  async editProduct(req, res) {
    const { id, price, stock } = req.body;
    try {
      await ProductModel.updateOne(
        { _id: id },
        { $set: { price: price, stock: stock } }
      );
      res.status(200).json({ message: "Successfully updated the product." });
    } catch (error) {
      res.status(401).json({ message: "Failed to update the product." });
    }
  }

  async updateCartQuantity(req, res) {
    const { id, value } = req.query;

    const product = await ProductModel.findOne({ _id: id });

    if (value === "1") {
      try {
        const newStock = product.stock - 1;

        await ProductModel.updateOne(
          { _id: id },
          { $set: { stock: newStock } }
        );

        console.log("Stock updated successfully");

        // Fetch the updated product details if needed
        const updatedProduct = await ProductModel.findOne({ _id: id });
        res.json({ product: updatedProduct });
      } catch (error) {
        console.error("Failed to update the product", error);
        res
          .status(500)
          .json({ message: "Failed to update the product", error });
      }
    } else if (value === "-1") {
      const newStock = product.stock + 1;

      await ProductModel.updateOne({ _id: id }, { $set: { stock: newStock } });

      // Fetch the updated product details if needed
      const updatedProduct = await ProductModel.findOne({ _id: id });
      res.json({ product: updatedProduct });
    } else {
      res.status(400).json({ message: "Invalid quantity value provided" });
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    try {
      await ProductModel.deleteOne({ _id: id });
      res.status(200).json({ message: "Successfully deleted the product." });
    } catch (error) {
      res.status(401).json({ message: "Failed to delete the product." });
    }
  }
}

module.exports = ProductController;
