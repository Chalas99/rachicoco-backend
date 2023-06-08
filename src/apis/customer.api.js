const express = require("express");
const router = express.Router();
const customerController = require('../controllers/customer.controller');

module.exports = function () {
  router.post("/signup", customerController.signUpCustomer);
  return router;
}