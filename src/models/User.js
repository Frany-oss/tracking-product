const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  workerCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  position: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["Encargado", "Vendedor", "Delivery", "Repartidor"],
    default: "Vendedor",
  },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
