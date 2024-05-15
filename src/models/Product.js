const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  labels: [{ type: String }],
  price: { type: Number, required: true },
  unitOfMeasure: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
