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
    const { brand, title, sort, select, page = 1, limit = 10 } = req.query; // Default values for page and limit
    const queryObject = {};

    if (brand && brand.trim() !== "") {
      queryObject.brand = { $regex: brand, $options: "i" };
    }

    if (title && title.trim() !== "") {
      queryObject.title = { $regex: title, $options: "i" }; // Add title to the query object
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

      const products = await apiData;
      const totalProds = await ProductModel.countDocuments();
      res.status(200).json({ products: products, total: totalProds });
    } catch (error) {
      res.status(500).json({ message: "Failed to get all products", error });
    }
  }

  async getSpecificProduct(req, res) {
    const id = req.params.id; // fetching the id from the url.
    try {
      const product = await ProductModel.findById(id); // getting the products by id.
      res.send(product); // sending the response.
    } catch (error) {
      res.json({ message: "failed to fetch the product with error: ", error }); // throwing the error.
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

  async deleteProduct(req, res) {
    const id = req.params.id;
    console.log(id);
    try {
      await ProductModel.deleteOne({ _id: id });
      res.status(200).json({ message: "Successfully deleted the product." });
    } catch (error) {
      res.status(401).json({ message: "Failed to delete the product." });
    }
  }
}

module.exports = ProductController;
