/** path */
const express = require("express");
const router = express.Router();
const customerController = require('../controllers/customer.controller');

module.exports = function () {
  router.post("/signup",(req, res) =>  customerController.signUpCustomer(req, res));
  router.post("/signin",(req, res) => customerController.signIncustomer(req, res));
  return router;
}
