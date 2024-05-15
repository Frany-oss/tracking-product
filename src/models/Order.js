const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  orderDate: { type: Date, default: Date.now },
  receptionDate: { type: Date, nullable: true },
  dispatchDate: { type: Date, nullable: true },
  deliveryDate: { type: Date, nullable: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["Por atender", "En proceso", "En delivery", "Recibido"],
    default: "Por atender",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
