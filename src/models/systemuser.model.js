const mongoose = require("mongoose");

const SystemUserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  userRole: { type: String, required: true },
  password: { type: String, required: true }
});

const SystemUser = mongoose.model("Systemusers", SystemUserSchema);

module.exports = SystemUser;