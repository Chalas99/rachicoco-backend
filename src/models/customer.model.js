/** database schema */
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  contactNum: { type: String, required: true },
  password: { type: String, required: true }
});

const Customer = mongoose.model("Customers", customerSchema);

module.exports = Customer;