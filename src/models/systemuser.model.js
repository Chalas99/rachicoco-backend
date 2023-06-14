/** database schema */
const mongoose = require("mongoose");

const SystemUserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  userRole: { type: String, required: true }
});

const SystemUser = mongoose.model("Systemusers", SystemUserSchema);

module.exports = SystemUser;